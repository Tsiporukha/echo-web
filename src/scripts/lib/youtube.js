import luch, {getJson} from 'luch';

import {YOUTUBE_API_KEY} from '../constants/skeys';

const BASE_URL = 'https://www.googleapis.com/youtube/v3';


export const getSuggestions = term =>
  fetch(`https://api.echoapplication.com/v1/songs/get_yt_suggestions?read_token=ecd61b6de296c006e273a2906dd80357&term=${term}`).then(resp => resp.json());

const addYTDuration = items => {
  const idsStr = items.map(item => item.id.videoId).join(', ');

  const findById = (itms, item) => itms.find(itm => itm.id === item.id.videoId);
  const getByVideoId = (itms, item, itemIndx) =>
    itms[itemIndx].id === item.id.videoId ? itms[itemIndx] : findById(itms, item);
  const addDuration = itemsDetails => (item, index) =>
    ({...item, snippet: {...item.snippet, duration: getByVideoId(itemsDetails, item, index) || 0}});

  return luch.get(`${BASE_URL}/videos`, {part: 'contentDetails', id: idsStr, key: YOUTUBE_API_KEY})
    .then(getJson)
    .then(json => items.map(addDuration(json.items)));
};

const ytDurationToSeconds = ytDuration => {
  const match = ytDuration.match(/PT(\d+H)?(\d+M)?(\d+S)?/);
  return ((parseInt(match[1]) || 0) * 3600) + ((parseInt(match[2]) || 0) * 60) + (parseInt(match[3]) || 0);
};

function parseYoutubeItem(item) {
  const [artist, title] = item.snippet.title.split(/\s[–-]\s/);
  return {
    uid: `youtube/${item.id.videoId}`,
    source: 'youtube',
    artwork_url: item.snippet.thumbnails.high.url,
    data_url: `https://www.youtube.com/watch?v=${item.id.videoId}`,
    export_data_url: `https://www.youtube.com/watch?v=${item.id.videoId}`,
    artist,
    title,
    duration: ytDurationToSeconds(item.snippet.duration),
  };
}

export const searchOnYoutube = ({term, limit}) =>
  luch.get(`${BASE_URL}/search`, {part: 'snippet', type: 'video', videoCategoryId: 10, maxResults: limit, q: term, key: YOUTUBE_API_KEY})
    .then(getJson)
    .then(json => addYTDuration(json.items))
    .then(items => items.map(item => parseYoutubeItem(item)));

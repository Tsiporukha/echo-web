import luch, {getJson} from 'luch';

import {SOUNDCLOUD_CLIENT_ID} from '../constants/skeys';

const BASE_URL = 'https://api.soundcloud.com';


const parseSong = song => {
  const [artist, title] = song.title.split(/\s[–-]\s/);
  return {
    uid: song.uri,
    source: 'soundcloud',
    artwork_url: song.artwork_url || song.user.avatar_url,
    data_url: song.permalink_url,
    export_data_url: `${song.stream_url}?client_id=${SOUNDCLOUD_CLIENT_ID}`,
    artist,
    title,
    duration: Math.round(song.duration / 1000),
  };
};

export const search = ({term, offset, limit}) => luch.get(
  `${BASE_URL}/tracks`,
  {client_id: SOUNDCLOUD_CLIENT_ID, q: term, limit, offset}
).then(getJson).then(songs => songs.map(parseSong));

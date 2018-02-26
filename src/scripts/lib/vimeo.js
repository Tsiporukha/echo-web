import luch, {getAbsoluteUrl, getJson} from 'luch';

import {VIMEO_TOKEN} from '../constants/skeys';

const withApiUrl = getAbsoluteUrl('https://api.vimeo.com');

const getAuthHeader = token => ({Authorization: `Bearer ${token}`});


const parseSong = song => {
  const [artist, title] = song.name.split(/\s[–-]\s/);
  return {
    uid: song.uri,
    source: 'vimeo',
    artwork_url: song.pictures.sizes.filter(size => size.width < 1000).slice(-1)[0].link,
    data_url: song.link,
    export_data_url: song.link,
    artist,
    title,
    duration: song.duration,
  };
};


export const search = ({term, limit, offset}) => luch.get(
  withApiUrl('/videos'),
  {
    query: term || 'music',
    per_page: limit,
    page: parseInt(offset / limit) + 1,
    fields: 'uri,name,pictures.sizes,link,duration',
    filter: 'categories',
    categories: 'music',
  },
  {headers: getAuthHeader(VIMEO_TOKEN)}
).then(getJson).then(({data}) => data.map(parseSong));

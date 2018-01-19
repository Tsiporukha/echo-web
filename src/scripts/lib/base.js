import v4 from 'uuid/v4';

export const addId = item => ({...item, id: v4()});
export const addIds = items => items.map(addId);

export const createIdKeyHash = item => ({[item.id]: item});

export const reduceToObject = items => items.reduce((itms, itm) => ({...itms, ...createIdKeyHash(itm)}), {});
export const addIdsAndReduceToObject = items => reduceToObject(addIds(items));

// inQueue :: String a, Number a => (String, Object, a) -> Boolean
 export const inQueue = (type, state, id) =>
  state.playlists[state[type][id].playlist].songs.some(songId => state.songs[songId].uid === state.player.currentSong.uid);


export const getCollectionName = type => `${type}s`;

export const getIndexById = (collection, item) => collection.findIndex(itm => itm.id === item.id);


export const isProduction = process.env.NODE_ENV === 'production';

const createArgs = arg => ({
  [arg]: arg,
  [arg.toUpperCase()]: arg.toUpperCase()
});

//entities
export const {User, USER} = createArgs('User');
export const {Stream, STREAM} = createArgs('Stream');
export const {Playlist, PLAYLIST} = createArgs('Playlist');
export const {Song, SONG} = createArgs('Song');

//subFeeds
export const {Latest, LATEST} = createArgs('Latest');
export const {Popular, POPULAR} = createArgs('Popular');
export const {Longest, LONGEST} = createArgs('Longest');

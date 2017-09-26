const toSnakeUpperCase = str =>  str.split(/(?=[A-Z])/).join('_').toUpperCase();

const createArgs = (arg, uppercaseArg = toSnakeUpperCase(arg)) => ({
  [arg]: arg,
  [uppercaseArg]: uppercaseArg
});

//entities
export const {User, USER} = createArgs('User');
export const {Stream, STREAM} = createArgs('Stream');
export const {Playlist, PLAYLIST} = createArgs('Playlist');
export const {Song, SONG} = createArgs('Song');
export const {Comment, COMMENT} = createArgs('Comment');

//subFeeds
export const {Latest, LATEST} = createArgs('Latest');
export const {Popular, POPULAR} = createArgs('Popular');
export const {Longest, LONGEST} = createArgs('Longest');

export const {LatestSearch, LATEST_SEARCH} = createArgs('LatestSearch');
export const {PopularSearch, POPULAR_SEARCH} = createArgs('PopularSearch');
export const {LongestSearch, LONGEST_SEARCH} = createArgs('LongestSearch');
export const {Youtube, YOUTUBE} = createArgs('Youtube');
export const {Soundcloud, SOUNDCLOUD} = createArgs('Soundcloud');
export const {Vimeo, VIMEO} = createArgs('Vimeo');


export const {Queue, QUEUE} = createArgs('Queue');

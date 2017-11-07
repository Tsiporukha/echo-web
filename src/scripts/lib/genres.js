import tags from '../../assets/newTags.json';
import genres from '../../assets/genres.json';

export const genresNames = Object.keys(genres);

export const getGenre = title => ({...genres[title], title});

export const getSecondaryTags = primaryTag => tags[primaryTag];

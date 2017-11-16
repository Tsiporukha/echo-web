// tags :: Object
import tags from '../../assets/newTags.json';
// genresObject :: Object
import genresObject from '../../assets/genres.json';

// genresNames :: [String]
export const genresNames = Object.keys(genresObject);

// getGenre :: String -> Object
export const getGenre = title => ({...genresObject[title], title});

// genres :: [Object]
export const genres = genresNames.map(getGenre);

// getSecondaryTags :: String -> [String]
export const getSecondaryTags = primaryTag => tags[primaryTag];

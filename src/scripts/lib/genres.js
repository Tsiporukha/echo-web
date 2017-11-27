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

// getGenreTags :: String -> [String]
export const getGenreTags = genre => tags[genre];

// tags :: Object
import tags from '../../assets/tags.json';
// genresObject :: Object
import genresObject from '../../assets/genres.json';
// primaryTagsColors :: Object
export primaryTagsColors from '../../assets/primaryTagsColors.json';


// primaryTags :: [String]
export const primaryTags = Object.keys(tags);
// getSecondaryTagsOf :: [String] -> [String]
export const getSecondaryTagsOf = ptags => ptags.reduce((secondaryTags, ptag) => secondaryTags.concat(tags[ptag]), []);
// getPrimaryTagsFrom :: ([String], [String]) -> [String]
export const getPrimaryTagsFrom = (tgs, ptags = primaryTags) => tgs.filter(tag => ptags.includes(tag));
// inTags :: (String, [String]) -> Bool
export const inTags = (tag, tgs) => tgs.includes(tag);

// genresNames :: [String]
export const genresNames = Object.keys(genresObject);

// getGenre :: String -> Object
export const getGenre = title => ({...genresObject[title], title});

// genres :: [Object]
export const genres = genresNames.map(getGenre);

// getGenreTags :: String -> [String]
export const getGenreTags = genre => tags[genre];

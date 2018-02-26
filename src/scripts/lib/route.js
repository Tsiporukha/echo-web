export const removeSeparator = (locationHash, history, separator = '#!') => {
  const path = (RegExp(`${separator}(/.*)$`).exec(locationHash) || [])[1];
  return path ? history.replace(path) : false;
};

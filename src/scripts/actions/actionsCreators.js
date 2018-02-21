export const createAUDActions = name => (addConst, updateConst, deleteConst) => ({
  [`add${name}s`]: payload => ({type: addConst, payload}),
  [`update${name}s`]: payload => ({type: updateConst, payload}),
  [`delete${name}s`]: payload => ({type: deleteConst, payload}),
});

export const createSubFeedActions = name => (setConst, addConst, removeConst) => ({
  [`set${name}`]: payload => ({type: setConst, payload}),
  [`addTo${name}`]: payload => ({type: addConst, payload}),
  [`removeFrom${name}`]: payload => ({type: removeConst, payload}),
});

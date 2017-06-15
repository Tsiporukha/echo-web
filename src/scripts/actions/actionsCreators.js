export const createAUDActions = name => (addConst, updateConst, deleteConst) => ({
  [`add${name}s`]: payload => ({type: addConst, payload}),
  [`update${name}s`]: payload => ({type: updateConst, payload}),
  [`delete${name}s`]: payload => ({type: deleteConst, payload})
});

export const createSubFeedActions = name => (setConst, setItemsConst, addItemsConst, deleteItemsConst, setFiltersConst) => ({
  [`set${name}`]: payload => ({type: setConst, payload}),
  [`set${name}Items`]: payload => ({type: setItemsConst, payload}),
  [`addItemsTo${name}`]: payload => ({type: addItemsConst, payload}),
  [`deleteItemsFrom${name}`]: payload => ({type: deleteConst, payload}),
  [`set${name}Filters`]: payload => ({type: setFiltersConst, payload})
});

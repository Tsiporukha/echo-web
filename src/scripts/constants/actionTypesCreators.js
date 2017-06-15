const addEntities = name => `ADD_${name}S`;
const updateEntities = name => `UPDATE_${name}S`;
const deleteEntities = name => `DELETE_${name}S`;

const set = name => `SET_${name}`;
const setItems = name => `SET_${name}_ITEMS`;
const addItems = name => `ADD_ITEMS_TO_${name}`;
const deleteItems = name => `DELETE_ITEMS_FROM_${name}`;
const setFilters = name => `SET_${name}_FILTERS`;

export const createAUDConsts = name => ({
  [addEntities(name)]: addEntities(name),
  [updateEntities(name)]: updateEntities(name),
  [updateEntities(name)]: updateEntities(name)
});

export const createSubFeedConsts = name => ({
  [set(name)]: set(name),
  [setItems(name)]: setItems(name),
  [addItems(name)]: addItems(name),
  [setFilters(name)]: setFilters(name)
});

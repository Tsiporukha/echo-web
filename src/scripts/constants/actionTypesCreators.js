const addEntities = name => `ADD_${name}S`;
const updateEntities = name => `UPDATE_${name}S`;
const deleteEntities = name => `DELETE_${name}S`;

const set = name => `SET_${name}`;
const addTo = name => `ADD_TO_${name}`;
const removeFrom = name => `REMOVE_FROM_${name}`;

export const createAUDConsts = name => ({
  [addEntities(name)]: addEntities(name),
  [updateEntities(name)]: updateEntities(name),
  [deleteEntities(name)]: deleteEntities(name),
});

export const createSubFeedConsts = name => ({
  [set(name)]: set(name),
  [addTo(name)]: addTo(name),
  [removeFrom(name)]: removeFrom(name),
});

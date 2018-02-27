const getObjDiff = (a, b) => Object.keys(a).reduce(
  (newState, key) => Object.keys(b).includes(key) ? newState : ({...newState, [key]: a[key]}),
  {}
);


/* eslint-disable fp/no-nil */

export const createNamedAUDReducer = name => (state = {}, action) => {
  switch (action.type) {
    case `ADD_${name}S`: return {...state, ...action.payload};
    case `UPDATE_${name}S`: return {...state, ...action.payload};
    case `DELETE_${name}S`: return getObjDiff(state, action.payload);
    default: return state;
  }
};

export const createSubFeedReducer = (name, defaultState = {}) => (state = defaultState, action) => {
  switch (action.type) {
    case `SET_${name}`: return action.payload;
    case `ADD_TO_${name}`: return state.concat(action.payload);
    case `REMOVE_FROM_${name}`: return state.filter(item => !action.payload.includes(item));
    default: return state;
  }
};

export const createVisibilityFilterReducer = (name, defaultFilter = '') => (state = defaultFilter, action) => {
  switch (action.type) {
    case `SET_${name}_VISIBILITY_FILTER`: return action.payload;
    default: return state;
  }
};

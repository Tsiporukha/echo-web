/* eslint-disable fp/no-nil */

export const loadState = () => localStorage.getItem('echoAppExt') ?
  JSON.parse(localStorage.getItem('echoAppExt')) : undefined;

export const saveState = state =>
  localStorage.setItem('echoAppExt', JSON.stringify(state));

export const clearState = () => localStorage.setItem('echoAppExt', undefined);

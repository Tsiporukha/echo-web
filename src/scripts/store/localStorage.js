export const loadState = () => {
  try {
    return localStorage.getItem('echoAppExt') ? JSON.parse(localStorage.getItem('echoAppExt')) : undefined;
  } catch (e) {
    return undefined;
  }
};

export const saveState = (state) => {
  try {
    localStorage.setItem('echoAppExt', JSON.stringify(state))
  } catch (e) {

  }
}

export const clearState = () => {
  localStorage.setItem('echoAppExt', undefined);
}

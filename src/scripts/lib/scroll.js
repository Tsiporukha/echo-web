const getDocHeight = () => Math.max(document.body.scrollHeight, document.body.offsetHeight,
  document.documentElement.clientHeight,  document.documentElement.scrollHeight, document.documentElement.offsetHeight);
const getWindowHeight = () => window.innerHeight || document.documentElement.offsetHeight;
const getWindowBottom = () => getWindowHeight() + window.pageYOffset;
const isWindowBottomReached = () => getWindowBottom() >= getDocHeight();

const isElementBottomReached = element => element.scrollTop + window.innerHeight > element.scrollHeight;

export const onBottomReaching = (fn, element) =>
  ((element && element !== window) ? isElementBottomReached(element) : isWindowBottomReached()) ? fn() : false;

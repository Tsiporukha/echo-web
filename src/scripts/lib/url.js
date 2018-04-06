const rootUrl = 'https://www.echoapplication.com';

const getRootUrl = ({protocol, hostname, port}) =>
  `${protocol}//${hostname}${port && `:${port}`}`;

export const getClientUrl = (path = '') =>
  `${typeof (window) === 'undefined' ? rootUrl : getRootUrl(document.location)}${path}`;


export const getSubPath = (url, position = -1) => url.split('/').filter(s => s).slice(position)[0];

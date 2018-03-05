/* eslint-disable no-restricted-globals, fp/no-unused-expression */

const CACHE = 'echoapp-offline-fallback-v1';

// Наш Fallback вместе с нашим собсвенным Динозавриком.
const FALLBACK = `
  <div>Connection problem</div>
`;


const useFallback = () => Promise.resolve(new Response(
  FALLBACK,
  {headers: {'Content-Type': 'text/html; charset=utf-8'}},
));

const fromCache = request => caches.open(CACHE)
  .then(cache => cache.match(request)
    .then(matching => matching || Promise.reject(new Error('no-match')))
  );

const networkOrCache = request => fetch(request)
  .then(response => response || fromCache(request))
  .catch(() => fromCache(request));


self.addEventListener('install', event => event.waitUntil(
  caches
    .open(CACHE)
    .then(cache => cache.addAll([]))
    .then(() => self.skipWaiting())
));

self.addEventListener('activate', event => event.waitUntil(self.clients.claim()));

self.addEventListener(
  'fetch',
  event => event.respondWith(networkOrCache(event.request).catch(useFallback))
);

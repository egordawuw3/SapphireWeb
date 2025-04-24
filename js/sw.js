const CACHE_NAME = 'sapphire-web-cache-v1';
const urlsToCache = [
  '/',
  '/styles/main.css',
  '/styles/home.css',
  '/js/main.js',
  '/images/*'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) {
          return response;
        }
        return fetch(event.request);
      })
  );
});
// service-worker.js
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open('solar-explorer-cache').then((cache) => {
      return cache.addAll([
        '/',
        '/PWA.html',
        '/PWA.css',
        '/PWA.js',
        '/SolarExplorer.jpg'
      ]);
    })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      return cachedResponse || fetch(event.request);
    })
  );
});

// service-worker.js
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open('solar-explorer-cache').then((cache) => {
      return cache.addAll([
        '/CSS/PWA.css',
        '/images/SolarExplorer.jpg',
        '/images/mercury.jpg',
        '/images/venus.jpg',
        '/images/earth.jpg',
        '/images/mars.jpg',
        '/images/jupiter.jpg',
        '/images/saturn.jpg',
        '/images/uranus.jpg',
        '/images/neptune.jpg',
        '/images/moon.jpg',
        '/images/sun.jpg',
        '/JS/PWA.js',
        '/PWA.html',
        '/planet.json'
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


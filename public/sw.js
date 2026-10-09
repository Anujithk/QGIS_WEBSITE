// Kerala Grama Panchayat Directory - Progressive Service Worker
// Enables Sub-1000ms Loading Speed on 3G & Low-4G Networks + Offline Resilience

const CACHE_NAME = 'kerala-lsgd-directory-v1.1';

const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/kerala-gov-logo.png',
  '/kerala-gov-logo.webp',
  '/manifest.json',
];

// Pre-cache critical application shell
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(STATIC_ASSETS);
    })
  );
  self.skipWaiting();
});

// Clean up outdated caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// Cache-First with Stale-While-Revalidate Strategy for maximum 3G/4G throughput
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Ignore non-GET requests or browser-extension / telemetry URLs
  if (request.method !== 'GET' || !url.protocol.startsWith('http')) {
    return;
  }

  // Bypass caching for live OpenStreetMap tiles so users always receive fresh geo tiles
  if (url.hostname.includes('openstreetmap.org')) {
    return;
  }

  event.respondWith(
    caches.match(request).then((cachedResponse) => {
      // If found in cache, return immediately (sub-50ms latency on 3G/4G)
      if (cachedResponse) {
        // Fetch fresh copy in background to revalidate cache without blocking UI
        fetch(request)
          .then((networkResponse) => {
            if (networkResponse && networkResponse.status === 200) {
              const responseToCache = networkResponse.clone();
              caches.open(CACHE_NAME).then((cache) => {
                cache.put(request, responseToCache);
              });
            }
          })
          .catch(() => {
            // Network failure safely ignored; user already has cached version
          });
        return cachedResponse;
      }

      // If not in cache, fetch from network and store in cache
      return fetch(request)
        .then((networkResponse) => {
          if (!networkResponse || networkResponse.status !== 200 || networkResponse.type === 'opaque') {
            return networkResponse;
          }

          const responseToCache = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(request, responseToCache);
          });

          return networkResponse;
        })
        .catch(() => {
          // If offline and navigating to a page, serve cached index.html
          if (request.mode === 'navigate') {
            return caches.match('/index.html') || caches.match('/');
          }
        });
    })
  );
});

const APP_SHELL_CACHE = "app-shell-v2";
const RUNTIME_CACHE = "runtime-cache-v2";
const API_CACHE = "api-cache-v2";

const APP_SHELL = [
  '/',                   
  '/index.html',
  '/manifest.json',
  '/icons/icon-192.png',
  '/icons/icon-512.png',
  '/assets/index.css',
  '/assets/index.js'
];

self.addEventListener('install', (event) => {
  console.log('[SW] Install');
  self.skipWaiting();
  event.waitUntil(
    caches.open(APP_SHELL_CACHE).then((cache) => {
      return cache.addAll(APP_SHELL).catch(err => {
        console.error('[SW] Precache failed:', err);
      });
    })
  );
});

self.addEventListener('activate', (event) => {
  console.log('[SW] Activate');
  event.waitUntil(
    (async () => {
      const keys = await caches.keys();
      await Promise.all(
        keys
          .filter(k => ![APP_SHELL_CACHE, RUNTIME_CACHE, API_CACHE].includes(k))
          .map(k => caches.delete(k))
      );
      await self.clients.claim();
    })()
  );
});

async function networkFirst(request) {
  const cache = await caches.open(API_CACHE);
  try {
    const response = await fetch(request);
    if (response && response.ok) {
      cache.put(request, response.clone());
    }
    return response;
  } catch (err) {
    const cached = await cache.match(request);
    return cached || new Response(JSON.stringify({ error: 'Offline' }), {
      headers: { 'Content-Type': 'application/json' },
      status: 503
    });
  }
}

async function cacheFirst(request) {
  const cache = await caches.open(RUNTIME_CACHE);
  const cached = await cache.match(request);
  if (cached) return cached;
  try {
    const response = await fetch(request);
    if (response && response.ok) {
      cache.put(request, response.clone());
    }
    return response;
  } catch (err) {
    return cached || Response.error();
  }
}

self.addEventListener('fetch', (event) => {
  const request = event.request;
  const url = new URL(request.url);

  if (
    url.origin.includes("googleapis.com") ||
    url.origin.includes("firebase") ||
    request.url.includes("identitytoolkit") ||
    request.url.includes("securetoken")
  ) {
    return;
  }

  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request).catch(() =>
        caches.open(APP_SHELL_CACHE).then(cache => cache.match('/index.html'))
      )
    );
    return;
  }

  if (url.origin === 'https://rickandmortyapi.com') {
    event.respondWith(networkFirst(request));
    return;
  }

  if (
    (request.destination === 'style' ||
     request.destination === 'script' ||
     request.destination === 'image') &&
    !url.href.includes("rickandmortyapi.com")
  ) {
    event.respondWith(cacheFirst(request));
    return;
  }

  event.respondWith(
    fetch(request).catch(() => caches.match(request))
  );
});

const CACHE = "molongi-v15";
const FILES = [
  "./",
  "./index.html",
  "./manifest.json",
  "./ma-photo.jpg",
  "./bosantu-nayo-cover.jpg"
];

self.addEventListener("install", e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(FILES)));
  self.skipWaiting();
});

self.addEventListener("activate", e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.map(k => k!==CACHE ? caches.delete(k) : null))));
  self.clients.claim();
});

self.addEventListener("fetch", e => {
  e.respondWith(fetch(e.request).catch(() => caches.match(e.request)));
});

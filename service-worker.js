const CACHE_NAME = "lernprofil-coach-v0.3.6";

const APP_FILES = [
  "./",
  "./index.html?v=036",
  "./styles.css?v=036",
  "./modules.js?v=036",
  "./experiment-data.js?v=036",
  "./app.js?v=036",
  "./manifest.webmanifest?v=036",
  "./icons/icon-192.png?v=036",
  "./icons/icon-512.png?v=036",
  "./audio-bienen.mp3?v=036",
  "./audio-tintenfisch.mp3?v=036"
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(async cache => {
      await Promise.allSettled(APP_FILES.map(file => cache.add(file)));
    })
  );
  self.skipWaiting();
});

self.addEventListener("activate", event => {
  event.waitUntil(
    Promise.all([
      caches.keys().then(keys =>
        Promise.all(
          keys
            .filter(key => key !== CACHE_NAME)
            .map(key => caches.delete(key))
        )
      ),
      self.clients.claim()
    ])
  );
});

self.addEventListener("fetch", event => {
  if (event.request.method !== "GET") return;

  if (event.request.mode === "navigate") {
    event.respondWith(
      fetch(event.request, { cache: "no-store" })
        .then(response => {
          const copy = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put("./index.html?v=036", copy));
          return response;
        })
        .catch(() =>
          caches.match("./index.html?v=036").then(cached => cached || caches.match("./"))
        )
    );
    return;
  }

  event.respondWith(
    caches.match(event.request).then(cached => {
      if (cached) return cached;

      return fetch(event.request, { cache: "no-store" }).then(response => {
        if (response && response.status === 200) {
          const copy = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(event.request, copy));
        }
        return response;
      });
    })
  );
});

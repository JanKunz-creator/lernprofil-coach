const CACHE_NAME = "lernprofil-coach-v0.3.2";

const APP_FILES = [
  "./",
  "./index.html?v=032",
  "./styles.css?v=032",
  "./modules.js?v=032",
  "./experiment-data.js?v=032",
  "./app.js?v=032",
  "./manifest.webmanifest",
  "./icons/icon-192.png",
  "./icons/icon-512.png",
  "./audio/unit-2-bienen.mp3",
  "./audio/unit-2-tintenfisch.mp3"
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(APP_FILES))
  );
  self.skipWaiting();
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys
          .filter(key => key !== CACHE_NAME)
          .map(key => caches.delete(key))
      )
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", event => {
  if (event.request.method !== "GET") return;

  if (event.request.mode === "navigate") {
    event.respondWith(
      fetch(event.request, { cache: "no-store" })
        .then(response => {
          const copy = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put("./index.html?v=032", copy));
          return response;
        })
        .catch(() =>
          caches.match("./index.html?v=032").then(cached => cached || caches.match("./"))
        )
    );
    return;
  }

  event.respondWith(
    caches.match(event.request).then(cached => {
      if (cached) return cached;

      return fetch(event.request, { cache: "no-store" })
        .then(response => {
          if (response && response.status === 200) {
            const copy = response.clone();
            caches.open(CACHE_NAME).then(cache => cache.put(event.request, copy));
          }
          return response;
        });
    })
  );
});

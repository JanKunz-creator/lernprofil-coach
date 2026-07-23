const CACHE_NAME = "lernprofil-coach-v0.3.3";

const APP_FILES = [
  "./",
  "./index.html?v=033",
  "./styles-033.css?v=033",
  "./modules-033.js?v=033",
  "./experiment-data-033.js?v=033",
  "./app-033.js?v=033",
  "./manifest.webmanifest?v=033",
  "./icons/icon-192.png",
  "./icons/icon-512.png",
  "./audio/unit-2-bienen.mp3",
  "./audio/unit-2-tintenfisch.mp3"
];

self.addEventListener("install", event => {
  event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(APP_FILES)));
  self.skipWaiting();
});

self.addEventListener("activate", event => {
  event.waitUntil(
    Promise.all([
      caches.keys().then(keys =>
        Promise.all(
          keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
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
          caches.open(CACHE_NAME).then(cache => cache.put("./index.html?v=033", copy));
          return response;
        })
        .catch(() =>
          caches.match("./index.html?v=033").then(cached => cached || caches.match("./"))
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

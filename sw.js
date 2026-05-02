// Pantry Chef — Service Worker v5
const CACHE_NAME = "pantry-chef-v5";
const STATIC_ASSETS = [
  "/",
  "/index.html",
  "/app.js",
  "/styles.css",
  "/chef_avatar.png",
  "/manifest.json",
  "https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,800;1,400;1,700;1,800&family=DM+Sans:wght@400;500;600;700&display=swap",
  "https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=swap"
];

// Install — cache static assets
self.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(STATIC_ASSETS.map(url => new Request(url, { mode: "no-cors" })))
        .catch(() => cache.addAll(["/", "/index.html", "/app.js", "/styles.css", "/chef_avatar.png"]));
    })
  );
  self.skipWaiting();
});

// Activate — clean old caches
self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
    )
  );
  self.clients.claim();
});

// Fetch — cache-first for static, network-first for images
self.addEventListener("fetch", (e) => {
  const url = new URL(e.request.url);

  // Skip non-GET and chrome-extension requests
  if (e.request.method !== "GET" || url.protocol === "chrome-extension:") return;

  // Network-first for Unsplash/Picsum images (don't block on these)
  if (url.hostname.includes("unsplash") || url.hostname.includes("picsum")) {
    e.respondWith(
      fetch(e.request).catch(() => caches.match(e.request))
    );
    return;
  }

  // Cache-first for everything else
  e.respondWith(
    caches.match(e.request).then((cached) => {
      if (cached) return cached;
      return fetch(e.request).then((response) => {
        if (!response || response.status !== 200 || response.type === "opaque") return response;
        const clone = response.clone();
        caches.open(CACHE_NAME).then((cache) => cache.put(e.request, clone));
        return response;
      }).catch(() => {
        // Fallback to root HTML for navigation requests
        if (e.request.mode === "navigate") return caches.match("/index.html");
      });
    })
  );
});

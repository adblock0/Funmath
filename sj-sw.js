/* Chicken Scramjet worker: deliberately scoped to ~/sj/ only. */
importScripts('https://cdn.jsdelivr.net/npm/@mercuryworkshop/scramjet-controller@0.0.14/dist/controller.sw.js');

const scramjetPrefix = new URL('./', self.registration.scope).pathname;

self.addEventListener('fetch', event => {
  try {
    const pathname = new URL(event.request.url).pathname;
    if (!pathname.startsWith(scramjetPrefix)) return;
    if (self.$scramjetController?.shouldRoute(event)) {
      event.respondWith(self.$scramjetController.route(event));
    }
  } catch {}
});

self.addEventListener('install', event => {
  event.waitUntil(self.skipWaiting());
});

self.addEventListener('activate', event => {
  event.waitUntil(self.clients.claim());
});

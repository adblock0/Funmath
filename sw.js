/* Scramjet 2.x service worker. Keep this file beside index.html. */
importScripts('https://cdn.jsdelivr.net/npm/@mercuryworkshop/scramjet-controller@0.0.14/dist/controller.sw.js');

// IMPORTANT: only route Scramjet's rewritten namespace. This makes any
// legacy root-scoped registration harmless for normal Chicken pages such as
// Minecraft.html, chatroom.html, and index.html.
const scramjetPrefix = new URL('./~/sj/', self.location.href).pathname;

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

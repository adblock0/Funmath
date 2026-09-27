/* Legacy Chicken root service-worker cleanup.
   New builds use sj-sw.js under the ~/sj/ scope. */
self.addEventListener('install', event => event.waitUntil(self.skipWaiting()));
self.addEventListener('activate', event => {
  event.waitUntil((async()=>{
    const rootScope = new URL('./', self.location.href).href;
    if (self.registration.scope === rootScope) {
      await self.registration.unregister();
      const clients = await self.clients.matchAll({type:'window', includeUncontrolled:true});
      for (const client of clients) { try { client.navigate(client.url); } catch {} }
    } else {
      await self.clients.claim();
    }
  })());
});

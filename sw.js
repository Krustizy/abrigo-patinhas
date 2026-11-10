// Busca sempre a versão nova quando tem internet; sem internet, usa a última salva.
const CACHE = 'patinhas';
self.addEventListener('install', e=>{ self.skipWaiting(); e.waitUntil(caches.open(CACHE).then(c=>c.addAll(['./','index.html','manifest.webmanifest','icon-192.png','icon-512.png']))); });
self.addEventListener('activate', e=>{ e.waitUntil(self.clients.claim()); });
self.addEventListener('fetch', e=>{
  if(e.request.method!=='GET' || !e.request.url.startsWith(self.location.origin)) return;
  e.respondWith(fetch(e.request, {cache:'no-store'}).then(r=>{ const copy = r.clone(); caches.open(CACHE).then(c=>c.put(e.request, copy)); return r; }).catch(()=>caches.match(e.request).then(r=>r || caches.match('index.html'))));
});

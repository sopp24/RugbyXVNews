const CACHE_NAME='rugbyxvnews-v7';
const BASE=new URL('./',self.registration.scope);
const CORE_FILES=['','index.html','style.css','app.js','manifest.webmanifest','icon.svg?v=3','offline.html','data/sports-data.json','data/articles.json','data/gallery.json','data/locales.json','assets/fonts/montserrat-latin-wght-normal.woff2','assets/fonts/montserrat-latin-wght-italic.woff2','assets/fonts/OFL.txt'];
const CORE_URLS=CORE_FILES.map(p=>new URL(p,BASE).toString());
self.addEventListener('install',event=>{
 event.waitUntil(caches.open(CACHE_NAME).then(cache=>cache.addAll(CORE_URLS)).then(()=>self.skipWaiting()));
});
self.addEventListener('activate',event=>{
 event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k.startsWith('rugbyxvnews-')&&k!==CACHE_NAME).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));
});
self.addEventListener('fetch',event=>{
 const request=event.request;
 if(request.method!=='GET'||new URL(request.url).origin!==self.location.origin)return;
 if(new URL(request.url).pathname.endsWith('.json')){
  event.respondWith(fetch(request,{cache:'no-store'}).then(response=>{
   if(response&&response.ok){const copy=response.clone();caches.open(CACHE_NAME).then(cache=>cache.put(request,copy));}
   return response;
  }).catch(()=>caches.match(request)));
  return;
 }
 if(request.mode==='navigate'||request.headers.get('accept')?.includes('text/html')){
  event.respondWith(fetch(request).then(response=>{
   if(response&&response.ok){const copy=response.clone();caches.open(CACHE_NAME).then(cache=>cache.put(request,copy));}
   return response;
  }).catch(()=>caches.match(request,{ignoreSearch:true}).then(cached=>cached||caches.match(new URL('offline.html',BASE).toString()))));
  return;
 }
 event.respondWith(caches.match(request).then(cached=>{
  if(cached)return cached;
  return fetch(request).then(response=>{
   if(response&&response.ok){const copy=response.clone();caches.open(CACHE_NAME).then(cache=>cache.put(request,copy));}
   return response;
  });
 }));
});
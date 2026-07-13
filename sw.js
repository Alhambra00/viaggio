/* Service worker — Compagno di Viaggio
   Strategia: l'app funziona offline; quando c'è rete, la pagina si aggiorna da GitHub.
   Per pubblicare una nuova versione dell'app basta cambiare VERSION qui sotto. */
const VERSION = 'v23';
const SHELL = 'viaggio-shell-' + VERSION;
const RUNTIME = 'viaggio-runtime';
const PRECACHE = [
  './',
  './index.html',
  './manifest.webmanifest',
  './icons/icon-192.png',
  './icons/icon-512.png',
  'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.css',
  'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.js'
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(SHELL).then(c => c.addAll(PRECACHE)).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k.startsWith('viaggio-shell-') && k !== SHELL).map(k => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  const url = new URL(e.request.url);
  if (e.request.method !== 'GET') return;

  // Navigazione (apertura dell'app): prima la rete (per gli aggiornamenti), poi la cache (offline)
  if (e.request.mode === 'navigate') {
    e.respondWith(
      fetch(e.request).then(r => {
        const copy = r.clone();
        caches.open(SHELL).then(c => c.put('./index.html', copy));
        return r;
      }).catch(() => caches.match('./index.html'))
    );
    return;
  }

  // Le API dinamiche (tassi, meteo, geocoding, Firebase) vanno sempre in rete
  if (/frankfurter|er-api|open-meteo|nominatim|photon|firebase|gstatic|googleapis/.test(url.host)) return;

  // Tile della mappa e risorse statiche: cache-first con riempimento progressivo
  e.respondWith(
    caches.match(e.request).then(hit => hit || fetch(e.request).then(r => {
      if (r.ok || r.type === 'opaque') {
        const copy = r.clone();
        caches.open(RUNTIME).then(c => {
          c.put(e.request, copy);
          // limito la cache dei tile per non gonfiare la memoria
          if (url.host.includes('tile.openstreetmap.org')) {
            c.keys().then(keys => { if (keys.length > 2500) c.delete(keys[0]); });
          }
        });
      }
      return r;
    }))
  );
});

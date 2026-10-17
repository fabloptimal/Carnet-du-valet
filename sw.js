/* Service worker : met tout le jeu en mémoire sur le téléphone
   au premier chargement, puis sert les fichiers sans réseau. */
importScripts("config.js");
var C = self.TREFLE;
var CACHE = "trefle-" + C.version;

function fichiers() {
  var f = ["./", "index.html", "app.css", "app.js", "config.js", "lib/jsQR.js", "manifest.webmanifest",
           "assets/icon-192.png", "assets/icon-512.png",
           "fonts/special-elite-latin-400-normal.woff2", "fonts/ibm-plex-sans-condensed-latin-400-normal.woff2", "fonts/ibm-plex-sans-condensed-latin-600-normal.woff2"];
  C.suspects.forEach(function (s) { f.push(s.image); });
  C.memoryImages.forEach(function (i) { f.push(i); });
  Object.keys(C.codes).forEach(function (k) { if (C.codes[k].image) f.push(C.codes[k].image); });
  return f;
}

self.addEventListener("install", function (e) {
  e.waitUntil(caches.open(CACHE).then(function (c) {
    // chaque fichier séparément : un fichier manquant n'empêche pas le reste
    return Promise.all(fichiers().map(function (u) {
      return fetch(u, { cache: "reload" }).then(function (r) { if (r.ok) return c.put(u, r); }).catch(function () {});
    }));
  }).then(function () { return self.skipWaiting(); }));
});

self.addEventListener("activate", function (e) {
  e.waitUntil(caches.keys().then(function (ks) {
    return Promise.all(ks.filter(function (k) { return k.indexOf("trefle-") === 0 && k !== CACHE; })
      .map(function (k) { return caches.delete(k); }));
  }).then(function () { return self.clients.claim(); }));
});

self.addEventListener("fetch", function (e) {
  if (e.request.method !== "GET") return;
  e.respondWith(caches.open(CACHE).then(function (c) {
    return c.match(e.request, { ignoreSearch: true }).then(function (r) {
      if (r) return r;
      return fetch(e.request).then(function (rep) {
        if (rep.ok && new URL(e.request.url).origin === self.location.origin) c.put(e.request, rep.clone());
        return rep;
      });
    });
  }));
});

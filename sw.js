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
  var url = new URL(e.request.url);
  if (url.origin !== self.location.origin) return;
  // Le code et les textes du jeu (page, .js, .css, .webmanifest) : réseau d'abord, pour que
  // chaque mise à jour arrive tout de suite ; sans réseau (ou après 3 s), la copie en mémoire.
  var code = e.request.mode === "navigate" || /\.(js|css|html|webmanifest)$/.test(url.pathname) || url.pathname.slice(-1) === "/";
  if (code) {
    e.respondWith(caches.open(CACHE).then(function (c) {
      var memoire = function () { return c.match(e.request, { ignoreSearch: true }).then(function (r) { return r || c.match("index.html"); }); };
      var reseau = fetch(e.request, { cache: "no-cache" }).then(function (rep) {
        if (rep.ok) c.put(e.request, rep.clone());
        return rep;
      });
      var delai = new Promise(function (ok) { setTimeout(ok, 3000); }).then(memoire);
      return Promise.race([reseau, delai]).then(function (r) { return r || reseau; }).catch(memoire);
    }));
    return;
  }
  // Photos, polices, sons : la copie en mémoire d'abord (rapide, et marche sans réseau).
  e.respondWith(caches.open(CACHE).then(function (c) {
    return c.match(e.request, { ignoreSearch: true }).then(function (r) {
      if (r) return r;
      return fetch(e.request).then(function (rep) {
        if (rep.status === 200) c.put(e.request, rep.clone());
        return rep;
      });
    });
  }));
});

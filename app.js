/* Le Carnet du Valet — application des téléphones (acte 1), Qui est-ce des iPad (acte 2) et régie.
   Fonctionne hors ligne une fois ouverte une première fois. */
(function () {
  "use strict";
  var C = self.TREFLE;
  var app = document.getElementById("app");
  var CLE_EQUIPE = "trefle.equipe", CLE_DECALAGE = "trefle.decalage", CLE_QUI = "trefle.qui";
  var flux = null, minuterie = null;
  var ETAPES = { VOLET: "Le volet", PLAFOND: "Le regard vers le haut", MEMORY: "La boîte de jeux", HAIE: "La haie de sapins" };

  /* ---------- outils ---------- */
  function lire(c) { try { return localStorage.getItem(c); } catch (e) { return null; } }
  function ecrire(c, v) { try { localStorage.setItem(c, v); } catch (e) {} }
  function efface(c) { try { localStorage.removeItem(c); } catch (e) {} }
  function lireJSON(c, d) { try { return JSON.parse(lire(c)) || d; } catch (e) { return d; } }
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }
  function equipe() { var e = lire(CLE_EQUIPE); return C.equipes[e] ? e : null; }
  function couleur(e) { document.documentElement.style.setProperty("--equipe", e ? C.equipes[e].couleur : "#b8913f"); }
  function melange(t) { for (var i = t.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)); var x = t[i]; t[i] = t[j]; t[j] = x; } return t; }
  function vibre(ms) { if (navigator.vibrate) navigator.vibrate(ms); }
  function stopCamera() { if (flux) { flux.getTracks().forEach(function (t) { t.stop(); }); flux = null; } }
  function stopMinuterie() { if (minuterie) { clearInterval(minuterie); minuterie = null; } }
  function aller(h) { if (location.hash === h) route(); else location.hash = h; }
  function pad(n) { return String(n).padStart(2, "0"); }

  function bandeau(retour) {
    var e = equipe(), q = e ? C.equipes[e] : null;
    return '<div class="bandeau"><span class="onglet">' + (q ? q.symbole + " Équipe " + esc(q.nom) : "Le carnet du Valet") + "</span>" +
      '<button class="lien" data-go="' + (retour || "#/") + '">' + (retour && retour.indexOf("equipe") >= 0 ? "Changer d'équipe" : "Accueil") + "</button></div>";
  }
  function liens() {
    app.querySelectorAll("[data-go]").forEach(function (b) { b.addEventListener("click", function () { aller(b.getAttribute("data-go")); }); });
  }
  function tamponner(parent, texte) {
    var t = document.createElement("span"); t.className = "tampon frappe"; t.textContent = texte; parent.appendChild(t); vibre([60, 40, 120]);
  }

  /* ---------- progression (le fil de l'enquête) ---------- */
  function cleProg(e) { return "trefle.progression." + e; }
  function noter(code, resolu) {
    var e = equipe(); if (!e) return;
    var p = lireJSON(cleProg(e), []), i = p.findIndex(function (x) { return x.code === code; });
    if (i < 0) p.push({ code: code, resolu: !!resolu }); else if (resolu) p[i].resolu = true;
    ecrire(cleProg(e), JSON.stringify(p));
  }
  function etiquette(code) { var k = code.split("-").pop(); return ETAPES[k] || code; }

  /* ---------- routeur ---------- */
  function route() {
    stopCamera(); stopMinuterie();
    document.body.classList.remove("mode-qui");
    var h = location.hash || "#/";
    couleur(equipe());
    window.scrollTo(0, 0);
    if (h.indexOf("#/c/") === 0) return vueCode(decodeURIComponent(h.slice(4)));
    if (h === "#/scan") return vueScan();
    var dep = h.match(/^#\/depart\/([A-Z])$/);
    if (dep && C.equipes[dep[1]]) { // QR de départ : l'équipe est fixée par l'adresse
      ecrire(CLE_EQUIPE, dep[1]); history.replaceState(null, "", "#/"); return route();
    }
    if (h === "#/equipe") return vueChoix("#/");
    if (h === "#/qui-equipe") return vueChoix("#/qui");
    if (h === "#/qui") return vueQui();
    return equipe() ? vueAccueil() : vueChoix("#/");
  }

  /* ---------- choix d'équipe : quatre cartes ---------- */
  function vueChoix(suite) {
    var html = "<h1>Le carnet du Valet</h1><p>Quelle est ton équipe ?</p><div class=\"equipes\">";
    Object.keys(C.equipes).forEach(function (k) {
      var q = C.equipes[k];
      html += '<button data-eq="' + k + '" style="color:' + q.couleur + '"><span>V ' + q.symbole + '</span><span class="sym">' + q.symbole +
        '</span><span class="nom">' + esc(q.nom) + "</span></button>";
    });
    html += "</div>";
    if (equipe()) html += '<button class="btn discret" data-go="' + suite + '">Annuler</button>';
    app.innerHTML = html; liens();
    app.querySelectorAll("[data-eq]").forEach(function (b) {
      b.addEventListener("click", function () { ecrire(CLE_EQUIPE, b.getAttribute("data-eq")); aller(suite); });
    });
  }

  /* ---------- accueil ---------- */
  function vueAccueil() {
    var e = equipe(), q = C.equipes[e], p = lireJSON(cleProg(e), []);
    var fil = '<div class="enquete" aria-label="Indices trouvés">';
    p.forEach(function (x) { fil += '<div class="indice">' + esc(etiquette(x.code)) + "<small>" + (x.resolu ? "élucidé" : "code scanné") + "</small></div>"; });
    fil += '<div class="indice manque">' + (p.length ? "Prochain indice" : "Premier indice") + "<small>à trouver</small></div></div>";
    app.innerHTML = bandeau("#/equipe") +
      "<h1>Le carnet du Valet</h1>" +
      "<p>Chaque fois que vous trouvez un code " + q.symbole + " " + esc(q.nom) + ", scannez-le ici.</p>" +
      '<button class="btn principal" data-go="#/scan">Scanner un code</button>' +
      fil +
      '<div id="etat" class="etat">Vérification du mode hors ligne…</div>' +
      '<p class="petit">Un seul téléphone par équipe. Ne fermez pas cette page pendant le jeu.</p>';
    liens(); verifierHorsLigne();
  }

  function fichiers() {
    var f = ["./", "index.html", "app.css", "app.js", "config.js", "lib/jsQR.js", "manifest.webmanifest",
      "fonts/special-elite-latin-400-normal.woff2", "fonts/ibm-plex-sans-condensed-latin-400-normal.woff2", "fonts/ibm-plex-sans-condensed-latin-600-normal.woff2"];
    C.memoryImages.forEach(function (i) { f.push(i); });
    C.suspects.forEach(function (s) { f.push(s.image); });
    Object.keys(C.codes).forEach(function (k) { if (C.codes[k].image) f.push(C.codes[k].image); });
    return f;
  }
  function verifierHorsLigne() {
    var el = document.getElementById("etat"); if (!el) return;
    if (!("serviceWorker" in navigator) || !window.caches) { el.className = "etat ko"; el.textContent = "Ce navigateur ne garde pas le jeu hors ligne : restez à portée du Wi-Fi."; return; }
    navigator.serviceWorker.ready.then(function () {
      return Promise.all(fichiers().map(function (u) { return caches.match(u, { ignoreSearch: true }); }));
    }).then(function (res) {
      var manque = res.filter(function (r) { return !r; }).length;
      if (!document.getElementById("etat")) return;
      if (manque === 0) { el.className = "etat ok"; el.textContent = "✓ Prêt : le jeu fonctionne maintenant sans réseau."; }
      else { el.className = "etat ko"; el.textContent = "Téléchargement en cours (" + manque + " éléments restants)… Restez sur le Wi-Fi."; setTimeout(verifierHorsLigne, 1500); }
    });
  }

  /* ---------- scanner ---------- */
  function vueScan() {
    app.innerHTML = bandeau() + "<h2>Scanner un code</h2>" +
      '<div class="scanner"><video id="video" playsinline muted></video><div class="viseur"></div></div>' +
      '<p class="petit" id="msg-scan">Visez le QR code. Il doit tenir dans le cadre.</p>' +
      '<div class="saisie"><label for="code" class="petit" hidden>Code</label><input id="code" placeholder="ou tapez le code" autocomplete="off" autocapitalize="characters">' +
      '<button class="btn" id="ok">Valider</button></div>' +
      '<button class="btn discret" data-go="#/">Retour</button>';
    liens();
    var input = document.getElementById("code");
    function valider() { var v = input.value.trim().toUpperCase().replace(/\s+/g, ""); if (v) aller("#/c/" + encodeURIComponent(v)); }
    document.getElementById("ok").addEventListener("click", valider);
    input.addEventListener("keydown", function (e) { if (e.key === "Enter") valider(); });
    lancerCamera();
  }
  function lancerCamera() {
    var video = document.getElementById("video"), msg = document.getElementById("msg-scan");
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) { msg.textContent = "Caméra indisponible ici : tapez le code écrit sous le QR."; return; }
    navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" }, audio: false }).then(function (s) {
      if (!document.getElementById("video")) { s.getTracks().forEach(function (t) { t.stop(); }); return; }
      flux = s; video.srcObject = s; video.play();
      var canvas = document.createElement("canvas"), ctx = canvas.getContext("2d", { willReadFrequently: true });
      (function boucle() {
        if (!flux) return;
        if (video.readyState >= 2 && video.videoWidth) {
          var w = 480, hgt = Math.round(480 * video.videoHeight / video.videoWidth);
          canvas.width = w; canvas.height = hgt; ctx.drawImage(video, 0, 0, w, hgt);
          var r = window.jsQR(ctx.getImageData(0, 0, w, hgt).data, w, hgt, { inversionAttempts: "dontInvert" });
          if (r && r.data) {
            var code = r.data.trim().toUpperCase(), m = code.match(/#\/C\/([A-Z0-9-]+)/); if (m) code = m[1];
            vibre(80); stopCamera(); aller("#/c/" + encodeURIComponent(code)); return;
          }
        }
        requestAnimationFrame(boucle);
      })();
    }).catch(function () { msg.textContent = "Caméra refusée : autorisez-la dans les réglages, ou tapez le code écrit sous le QR."; });
  }

  /* ---------- un code scanné ---------- */
  function vueCode(code) {
    var c = C.codes[code];
    if (!c) {
      app.innerHTML = bandeau() + '<div class="fiche refus"><div class="gros">?</div><h2>Code inconnu</h2><p>« ' + esc(code) +
        ' » ne figure pas dans le carnet. Vérifiez l\'orthographe.</p></div><button class="btn" data-go="#/scan">Scanner à nouveau</button>';
      return liens();
    }
    if (c.type === "regie") return vueRegie();
    var e = equipe();
    if (!e) return aller("#/equipe");
    if (c.equipe !== e) {
      var q = C.equipes[c.equipe];
      app.innerHTML = bandeau() + '<div class="fiche refus" style="border-top-color:' + q.couleur + '"><div class="gros" style="color:' + q.couleur + '">' + q.symbole +
        '</div><span class="tampon frappe">RÉSERVÉ</span><h2>À l\'équipe ' + esc(q.nom) + "</h2><p>Ce code ne vous appartient pas. Remettez-le exactement où vous l'avez trouvé.</p></div>" +
        '<button class="btn" data-go="#/">Accueil</button>';
      return liens();
    }
    noter(code, false);
    if (c.type === "texte") { noter(code, true); return vueTexte(c); }
    if (c.type === "puzzle") return vuePuzzle(c, code);
    if (c.type === "memory") return vueMemory(c, code);
  }

  function vueTexte(c) {
    app.innerHTML = bandeau() + '<div class="fiche apparait"><h2>' + esc(c.titre || "") + '</h2><p class="recit">' + esc(c.texte) +
      (c.anagramme ? '<span class="anagramme">' + esc(c.anagramme) + "</span>" : "") + "</p></div>" +
      '<button class="btn discret" data-go="#/">Accueil</button>';
    liens();
  }

  /* ---------- puzzle pivotant 4×4 ---------- */
  function vuePuzzle(c, code) {
    app.innerHTML = bandeau() + '<div class="fiche"><h2>' + esc(c.titre || "Puzzle") + "</h2>" +
      '<p class="consigne">Touchez une pièce pour la faire tourner. Faites-la glisser sur une autre pour les échanger.</p>' +
      '<div class="puzzle-zone" id="zone"><div class="puzzle" id="puzzle"></div></div><div id="fin"></div></div>';
    var img = new Image();
    img.onload = function () {
      var cote = Math.min(img.naturalWidth, img.naturalHeight), cv = document.createElement("canvas");
      cv.width = cv.height = Math.min(cote, 1200);
      cv.getContext("2d").drawImage(img, (img.naturalWidth - cote) / 2, (img.naturalHeight - cote) / 2, cote, cote, 0, 0, cv.width, cv.height);
      monterPuzzle(c, code, cv.toDataURL("image/jpeg", 0.85));
    };
    img.onerror = function () { document.getElementById("puzzle").outerHTML = '<p class="etat ko">Photo introuvable : ' + esc(c.image) + "</p>"; };
    img.src = c.image;
  }
  function monterPuzzle(c, code, url) {
    // Comme le puzzle d'Opération Némésis : pièces mélangées dans le cadre ET tournées.
    // Toucher = tourner d'un quart de tour ; glisser = échanger avec la pièce d'arrivée.
    var grille = document.getElementById("puzzle"), N = 16;
    var pos = melange(Array.from({ length: N }, function (_, i) { return i; }));  // pos[case] = pièce
    var rot = [], angles = [], tuiles = [];
    for (var i = 0; i < N; i++) { rot.push(Math.floor(Math.random() * 4)); }
    if (pos.every(function (p, s) { return p === s; })) { var x = pos[0]; pos[0] = pos[1]; pos[1] = x; }
    rot.forEach(function (r, i) { angles[i] = r * 90; });
    function placer() { pos.forEach(function (p, s) { tuiles[p].style.order = s; }); }
    function tourner(p) { rot[p] = (rot[p] + 1) % 4; angles[p] += 90; tuiles[p].style.transform = "rotate(" + angles[p] + "deg)"; }
    function verifier() {
      if (!pos.every(function (p, s) { return p === s && rot[p] === 0; })) return;
      grille.classList.add("resolu"); noter(code, true);
      setTimeout(function () { tamponner(document.getElementById("zone"), "ÉLUCIDÉ"); }, 900);
      setTimeout(function () {
        document.getElementById("fin").innerHTML = '<p class="recit apparait">' + esc(c.fin) + "</p>" +
          '<button class="btn discret" style="color:var(--encre);border-color:#0003" data-go="#/">Accueil</button>';
        liens();
      }, 1500);
    }
    for (var k = 0; k < N; k++) {
      var t = document.createElement("button");
      t.className = "tuile"; t.setAttribute("aria-label", "Pièce " + (k + 1));
      t.style.backgroundImage = "url(" + url + ")";
      t.style.backgroundPosition = ((k % 4) * 100 / 3) + "% " + (Math.floor(k / 4) * 100 / 3) + "%";
      t.style.transform = "rotate(" + angles[k] + "deg)";
      t.dataset.p = k; tuiles.push(t); grille.appendChild(t);
    }
    placer();
    var geste = null; // { p, x, y, id, fantome }
    grille.addEventListener("pointerdown", function (e) {
      var t = e.target.closest(".tuile");
      if (!t || grille.classList.contains("resolu") || geste) return;
      e.preventDefault();
      geste = { p: +t.dataset.p, x: e.clientX, y: e.clientY, id: e.pointerId, fantome: null };
      try { grille.setPointerCapture(e.pointerId); } catch (er) {}
    });
    grille.addEventListener("pointermove", function (e) {
      if (!geste || e.pointerId !== geste.id) return;
      var dx = e.clientX - geste.x, dy = e.clientY - geste.y;
      if (!geste.fantome && Math.hypot(dx, dy) < 10) return;
      var t = tuiles[geste.p];
      if (!geste.fantome) {
        var r = t.getBoundingClientRect(), f = t.cloneNode(false);
        f.className = "tuile fantome"; f.style.width = r.width + "px"; f.style.height = r.height + "px";
        f.style.left = r.left + "px"; f.style.top = r.top + "px"; f.style.order = "";
        document.body.appendChild(f); geste.fantome = f; geste.r = r; t.classList.add("partie"); vibre(20);
      }
      geste.fantome.style.translate = dx + "px " + dy + "px";
    });
    function fin(e, annule) {
      if (!geste || e.pointerId !== geste.id) return;
      var g = geste; geste = null;
      if (!g.fantome) { if (!annule) { tourner(g.p); verifier(); } return; }
      g.fantome.remove(); tuiles[g.p].classList.remove("partie");
      if (annule) return;
      var cible = document.elementFromPoint(e.clientX, e.clientY), t2 = cible && cible.closest && cible.closest(".tuile");
      if (!t2 || !grille.contains(t2) || +t2.dataset.p === g.p) return;
      var a = pos.indexOf(g.p), b = pos.indexOf(+t2.dataset.p);
      pos[a] = +t2.dataset.p; pos[b] = g.p; placer(); vibre(30); verifier();
    }
    grille.addEventListener("pointerup", function (e) { fin(e, false); });
    grille.addEventListener("pointercancel", function (e) { fin(e, true); });
  }

  /* ---------- memory 16 cartes ---------- */
  function vueMemory(c, code) {
    var paquet = melange(C.memoryImages.concat(C.memoryImages).map(function (src) { return { src: src, id: C.memoryImages.indexOf(src) }; }));
    app.innerHTML = bandeau() + '<div class="fiche" id="fiche"><h2>Les visages du gang</h2>' +
      '<p class="cadre-enfant"><strong>Seul le plus jeune de l\'équipe touche l\'écran.</strong> Les autres ont le droit… de se taire.</p>' +
      '<div class="memory" id="memory"></div><p class="consigne" id="coups">Retrouvez les 8 paires.</p><div id="fin"></div></div>';
    var grille = document.getElementById("memory"), ouvertes = [], trouvees = 0, coups = 0, bloque = false;
    paquet.forEach(function (p) {
      var b = document.createElement("button");
      b.className = "carte"; b.setAttribute("aria-label", "Carte retournée");
      b.innerHTML = '<div class="in"><div class="face dos">♣</div><div class="face recto"><img alt="" src="' + p.src + '"></div></div>';
      b.addEventListener("click", function () {
        if (bloque || b.classList.contains("vue") || b.classList.contains("trouvee")) return;
        b.classList.add("vue"); ouvertes.push({ b: b, id: p.id });
        if (ouvertes.length < 2) return;
        coups++; document.getElementById("coups").textContent = coups + " essai" + (coups > 1 ? "s" : "");
        var a = ouvertes[0], d = ouvertes[1]; ouvertes = [];
        if (a.id === d.id) {
          a.b.classList.add("trouvee"); d.b.classList.add("trouvee"); vibre(40); trouvees++;
          if (trouvees === 8) setTimeout(function () {
            noter(code, true); tamponner(document.getElementById("fiche"), "ÉLUCIDÉ");
            document.getElementById("fin").innerHTML = '<p class="recit apparait">' + esc(c.fin) + "</p>" +
              '<button class="btn discret" style="color:var(--encre);border-color:#0003" data-go="#/">Accueil</button>';
            liens(); document.getElementById("fin").scrollIntoView({ behavior: "smooth" });
          }, 500);
        } else { bloque = true; setTimeout(function () { a.b.classList.remove("vue"); d.b.classList.remove("vue"); bloque = false; }, 900); }
      });
      grille.appendChild(b);
    });
  }

  /* ---------- Qui est-ce (iPad, acte 2) ---------- */
  function vueQui() {
    var e = equipe(); if (!e) return aller("#/qui-equipe");
    var etat = lireJSON(CLE_QUI, { secret: null, barres: [], fin: null });
    function sauver() { ecrire(CLE_QUI, JSON.stringify(etat)); }
    var q = C.equipes[e];
    var choix = etat.secret === null;
    var html = bandeau("#/qui-equipe") + '<div class="qui"><div class="qui-barre"><h1>Qui est-ce ?</h1>';
    if (choix) {
      html += '<p>Choisissez <strong>en secret</strong> le suspect que l\'équipe adverse devra trouver. Cachez l\'écran.</p>';
    } else {
      var s = C.suspects[etat.secret];
      html += '<div class="qui-secret"><img src="' + s.image + '" alt="" id="secret-img" class="flou">' +
        '<div><strong>Votre suspect</strong><br><button class="lien" id="voir">Afficher</button></div></div>' +
        '<div class="horloge" id="chrono">' + pad(C.dureeDuel) + ':00</div>' +
        '<button class="btn principal" id="go">Lancer le chrono (' + C.dureeDuel + ' min)</button>' +
        '<p class="petit" id="reste"></p>' +
        '<details class="qui-questions"><summary>Les 7 questions</summary><ol>' +
        C.questions.map(function (x) { return "<li>" + esc(x) + "</li>"; }).join("") + "</ol></details>";
    }
    html += '</div><div class="qui-grille" id="grille"></div>';
    if (!choix) html += '<button class="btn discret qui-raz" id="raz">Nouvelle partie</button>';
    html += "</div>";
    app.innerHTML = html; liens();
    document.body.classList.add("mode-qui");
    var grille = document.getElementById("grille");
    C.suspects.forEach(function (s, i) {
      var b = document.createElement("button");
      b.className = "suspect";
      b.innerHTML = '<img src="' + s.image + '" alt=""><span class="nom">' + esc(s.nom) + '</span><span class="x">✕</span>';
      function maj() { b.classList.toggle("barre", etat.barres.indexOf(i) >= 0); }
      maj();
      b.addEventListener("click", function () {
        if (choix) { etat.secret = i; etat.barres = []; sauver(); return vueQui(); }
        var k = etat.barres.indexOf(i); if (k >= 0) etat.barres.splice(k, 1); else etat.barres.push(i);
        sauver(); maj(); compte();
      });
      grille.appendChild(b);
    });
    if (choix) return;
    function compte() { document.getElementById("reste").textContent = (24 - etat.barres.length) + " suspects encore possibles."; }
    compte();
    document.getElementById("voir").addEventListener("click", function () {
      var im = document.getElementById("secret-img"), cache = im.classList.toggle("flou");
      this.textContent = cache ? "Afficher" : "Cacher";
    });
    var raz = document.getElementById("raz"), armer = false;
    raz.addEventListener("click", function () {
      if (!armer) { armer = true; raz.textContent = "Toucher encore pour effacer la partie"; setTimeout(function () { armer = false; raz.textContent = "Nouvelle partie"; }, 3000); return; }
      efface(CLE_QUI); vueQui();
    });
    function tic() {
      var el = document.getElementById("chrono"); if (!el) return stopMinuterie();
      var reste = Math.max(0, Math.round((etat.fin - Date.now()) / 1000));
      el.textContent = pad(Math.floor(reste / 60)) + ":" + pad(reste % 60); el.classList.toggle("urgent", reste < 60);
      if (reste === 0) { stopMinuterie(); document.getElementById("reste").textContent = "Temps écoulé : gagne l'équipe à qui il reste le moins de suspects (" + (24 - etat.barres.length) + " pour vous)."; vibre([200, 100, 200]); }
    }
    document.getElementById("go").addEventListener("click", function () { etat.fin = Date.now() + C.dureeDuel * 60000; sauver(); stopMinuterie(); tic(); minuterie = setInterval(tic, 1000); });
    if (etat.fin && etat.fin > Date.now()) { tic(); minuterie = setInterval(tic, 1000); }
  }

  /* ---------- régie : horloge du Valet + Corbeau ---------- */
  function cible() {
    var p = C.horloge.heureFin.split(":"), d = new Date(); d.setHours(+p[0], +p[1], 0, 0);
    return d.getTime() + (parseInt(lire(CLE_DECALAGE) || "0", 10) * 60000);
  }
  function vueRegie() {
    couleur(null);
    var html = '<div class="bandeau"><span class="onglet">Régie</span><button class="lien" data-go="#/">Quitter</button></div>' +
      '<h2 style="text-align:center">L\'horloge du Valet</h2><div class="horloge" id="horloge">--:--</div>' +
      '<p class="petit" style="text-align:center" id="echeance"></p>' +
      '<div class="reglages"><button class="btn discret" data-d="-5">−5 min</button><button class="btn discret" data-d="-1">−1 min</button>' +
      '<button class="btn discret" data-d="1">+1 min</button><button class="btn discret" data-d="5">+5 min</button></div>' +
      '<button class="btn discret" id="raz">Remettre à l\'heure prévue</button><h2>Le Corbeau</h2>';
    C.corbeau.forEach(function (m, i) {
      html += '<div class="message-corbeau" id="m' + i + '"><p class="titre-message">' + esc(m.titre) + "</p>" +
        '<div class="lecteur"><button class="btn" data-lire="' + i + '" aria-label="Lecture">▶</button>' +
        '<button class="btn discret" data-recul="' + i + '" aria-label="Reculer de 10 secondes">↺ 10 s</button>' +
        '<button class="btn discret" data-debut="' + i + '" aria-label="Revenir au début">⏮</button></div>' +
        '<div class="barre-lecture"><div class="avance" id="av' + i + '"></div></div><p class="petit temps" id="t' + i + '">0:00</p>' +
        '<div class="fiche"><p class="recit">' + esc(m.texte) + "</p></div></div>";
    });
    html += '<h2>Ce téléphone</h2><p class="petit">Efface l\'équipe choisie, les indices trouvés et la partie de Qui est-ce. Le jeu reste en mémoire pour fonctionner sans réseau.</p>' +
      '<button class="btn discret" id="reinit">Réinitialiser ce téléphone</button>' +
      '<p class="petit" style="text-align:center;opacity:.6">Version ' + esc(C.version) + '</p>';
    app.innerHTML = html; liens();
    var armee = null, bReinit = document.getElementById("reinit");
    bReinit.addEventListener("click", function () {
      if (!armee) { // premier toucher : demande de confirmation
        bReinit.textContent = "Toucher encore pour confirmer";
        armee = setTimeout(function () { armee = null; bReinit.textContent = "Réinitialiser ce téléphone"; }, 4000);
        return;
      }
      clearTimeout(armee); armee = null;
      try {
        Object.keys(localStorage).forEach(function (k) { if (k.indexOf("trefle.progression.") === 0) efface(k); });
      } catch (e) {}
      efface(CLE_EQUIPE); efface(CLE_QUI);
      vibre([60, 40, 60]); aller("#/");
    });
    app.querySelectorAll("[data-d]").forEach(function (b) {
      b.addEventListener("click", function () { ecrire(CLE_DECALAGE, String(parseInt(lire(CLE_DECALAGE) || "0", 10) + parseInt(b.getAttribute("data-d"), 10))); tic(); });
    });
    document.getElementById("raz").addEventListener("click", function () { efface(CLE_DECALAGE); tic(); });
    // Un seul lecteur pour les 3 messages : impossible de lancer deux fois le même son en même temps.
    var son = new Audio(), courant = -1;
    son.preload = "auto";
    function mm(x) { x = Math.floor(x || 0); return Math.floor(x / 60) + ":" + pad(x % 60); }
    function majBoutons() {
      app.querySelectorAll("[data-lire]").forEach(function (b) {
        var actif = +b.getAttribute("data-lire") === courant && !son.paused;
        b.textContent = actif ? "❚❚" : "▶"; b.setAttribute("aria-label", actif ? "Pause" : "Lecture");
      });
    }
    function majTemps() {
      if (courant < 0) return;
      var t = document.getElementById("t" + courant), av = document.getElementById("av" + courant);
      if (!t) return;
      t.textContent = mm(son.currentTime) + (isFinite(son.duration) ? " / " + mm(son.duration) : "");
      av.style.width = (isFinite(son.duration) && son.duration ? 100 * son.currentTime / son.duration : 0) + "%";
    }
    function charger(i) {
      if (courant === i) return;
      son.pause();
      if (courant >= 0) { var av = document.getElementById("av" + courant); if (av) av.style.width = "0%"; }
      courant = i; son.src = C.corbeau[i].audio; son.currentTime = 0;
    }
    function jouer(i) {
      charger(i);
      var p = son.play();
      if (p && p.catch) p.catch(function () { document.getElementById("m" + i).classList.add("ouvert"); });
    }
    son.addEventListener("play", majBoutons); son.addEventListener("pause", majBoutons);
    son.addEventListener("ended", function () { majBoutons(); majTemps(); });
    son.addEventListener("timeupdate", majTemps); son.addEventListener("loadedmetadata", majTemps);
    son.addEventListener("error", function () { if (courant >= 0) document.getElementById("m" + courant).classList.add("ouvert"); });
    app.querySelectorAll("[data-lire]").forEach(function (b) {
      b.addEventListener("click", function () {
        var i = +b.getAttribute("data-lire");
        if (courant === i && !son.paused) son.pause(); else jouer(i);
      });
    });
    app.querySelectorAll("[data-recul]").forEach(function (b) {
      b.addEventListener("click", function () {
        var i = +b.getAttribute("data-recul");
        if (courant !== i) return; son.currentTime = Math.max(0, son.currentTime - 10); majTemps();
      });
    });
    app.querySelectorAll("[data-debut]").forEach(function (b) {
      b.addEventListener("click", function () {
        var i = +b.getAttribute("data-debut");
        if (courant !== i) charger(i); son.currentTime = 0; majTemps();
      });
    });
    // On quitte la régie : le son s'arrête.
    window.addEventListener("hashchange", function stop() { son.pause(); window.removeEventListener("hashchange", stop); });
    function tic() {
      var reste = Math.max(0, Math.round((cible() - Date.now()) / 1000));
      var h = Math.floor(reste / 3600), mn = Math.floor(reste % 3600 / 60), s = reste % 60;
      var el = document.getElementById("horloge"); if (!el) return stopMinuterie();
      el.textContent = (h ? h + ":" + pad(mn) : pad(mn)) + ":" + pad(s); el.classList.toggle("urgent", reste < 600);
      var d = new Date(cible()), dec = parseInt(lire(CLE_DECALAGE) || "0", 10);
      document.getElementById("echeance").textContent = "Échéance affichée : " + pad(d.getHours()) + " h " + pad(d.getMinutes()) + (dec ? " (décalage " + (dec > 0 ? "+" : "") + dec + " min)" : "");
    }
    tic(); minuterie = setInterval(tic, 1000);
  }

  /* ---------- démarrage ---------- */
  if ("serviceWorker" in navigator) {
    // Quand une nouvelle version prend la main, la page se recharge une fois d'elle-même.
    var dejaRecharge = false;
    navigator.serviceWorker.addEventListener("controllerchange", function () {
      if (dejaRecharge) return; dejaRecharge = true; location.reload();
    });
    navigator.serviceWorker.register("sw.js?v=" + encodeURIComponent(C.version))
      .then(function (reg) { reg.update().catch(function () {}); }).catch(function () {});
  }
  window.addEventListener("hashchange", route);
  document.addEventListener("visibilitychange", function () { if (document.hidden) stopCamera(); else if (location.hash === "#/scan") route(); });
  route();
})();

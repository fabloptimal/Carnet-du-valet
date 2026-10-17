# Le Carnet du Valet — l'app des téléphones

Application web hors ligne pour l'acte 1 du « Dernier Soir du Trèfle », plus la régie.
HTML/CSS/JS sans framework ni compilation : on ouvre `index.html`, c'est tout.

## Ce qu'elle fait
- Choix de l'équipe (Rouge ♥, Bleue ♠, Verte ♣, Jaune ♦), mémorisé sur le téléphone.
- **QR de départ** (page 1 de `qr.html`) : un par équipe, il contient l'adresse du jeu suivie de `#/depart/R` (ou B, V, J). Scanné avec l'appareil photo normal, il ouvre l'app déjà réglée sur la bonne équipe. C'est le seul QR qui contient une adresse.
- Scanner de QR codes **intégré** (caméra), plus saisie manuelle du code écrit sous chaque QR.
- 16 codes pour l'acte 1 : 8 puzzles photo pivotants, 4 memory, 4 pages texte (plafonds).
- Un code d'une autre équipe affiche « Réservé à l'équipe … ».
- Régie (code `TREFLE-REGIE-7Q4`) : horloge du Valet réglable, 3 messages du Corbeau.
- **Qui est-ce des iPad** : ouvrir l'adresse du jeu suivie de `#/qui` (par exemple `https://…/carnet-du-valet/#/qui`), choisir l'équipe, puis le suspect secret. On barre les suspects d'un toucher ; chrono de 10 minutes ; « Nouvelle partie » demande deux touchers.
- Le fil de l'enquête : l'accueil affiche les indices déjà trouvés par l'équipe, reliés par le fil rouge.
- Hors ligne : tout est mis en mémoire au premier chargement (message « ✓ Prêt » sur l'accueil).

## Fichiers
| Fichier | Rôle |
|---|---|
| `config.js` | **Tout le contenu** : textes, photos, cachettes, heure de fin. Seul fichier à modifier. |
| `app.js`, `app.css`, `index.html` | L'application |
| `sw.js` | Mise en mémoire hors ligne |
| `qr.html` | Planche des QR codes à imprimer (ouvrir dans le navigateur, imprimer à 100 %) |
| `assets/photos/` | 8 photos des puzzles — **provisoires**, à remplacer en gardant les mêmes noms |
| `assets/memory/` | 8 visages du memory (8 des 24 suspects) |
| `assets/suspects/` | Les 24 portraits du Qui est-ce. Pour passer aux portraits ChatGPT, remplacer les fichiers en gardant les mêmes noms |
| `fonts/` | Polices de la charte, embarquées pour le mode hors ligne |
| `assets/audio/` | Mettre ici `corbeau-1.mp3`, `corbeau-2.mp3`, `corbeau-3.mp3`. Sans fichier, la régie affiche le texte à lire. |
| `lib/` | jsQR 1.4.0 (lecture QR), qrcode-generator 1.4.4 (impression) |

## Reste à compléter (chercher « À REMPLIR » dans `config.js`)
- Les 3 anagrammes des boîtes de jeu (Rouge, Bleue, Jaune).
- Les 4 cachettes de la salle de jeux (fin des memory).
- Les 8 photos réelles (le 24/25, sur place).
- L'heure de fin (`horloge.heureFin`), une fois la date fixée.

**Après toute modification, changer `version` en haut de `config.js`**, sinon les téléphones gardent l'ancienne version.

## Tester sur le Mac
Dans le Terminal, depuis ce dossier : `python3 -m http.server 8000`, puis ouvrir http://localhost:8000.

## En ligne
Le jeu est publié sur **https://fabloptimal.github.io/Carnet-du-valet/** (dépôt GitHub `fabloptimal/Carnet-du-valet`). Ne pas renommer le dépôt : l'adresse est imprimée dans les QR de départ (`adresse` dans `config.js`).

## Mettre en ligne (GitHub Pages)
1. Créer un dépôt public sur github.com, par exemple `carnet-du-valet`.
2. Y déposer tout le contenu de ce dossier (bouton « Add file → Upload files »).
3. Settings → Pages → Branch `main` / dossier racine → Save.
4. L'adresse `https://<ton-compte>.github.io/carnet-du-valet/` s'affiche au bout d'une minute.
La caméra ne fonctionne qu'en https : c'est le cas sur GitHub Pages.

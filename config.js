/* ============================================================
   LE DERNIER SOIR DU TRÈFLE — contenu du jeu
   C'est le SEUL fichier à modifier pour changer les textes,
   les photos, les cachettes ou l'heure de fin.
   Tout ce qui est marqué « À REMPLIR » doit être complété
   avant le jour J (sur place, le 24/25).
   ============================================================ */

self.TREFLE = {

  // Changer ce numéro à chaque mise en ligne d'une nouvelle version :
  // les téléphones rechargent alors tout le contenu.
  version: "2026-10-18b",

  // Adresse publique du jeu (sert aux 4 QR de départ). Ne plus la changer une fois les QR imprimés.
  adresse: "https://fabloptimal.github.io/Carnet-du-valet/",

  equipes: {
    R: { nom: "Rouge", symbole: "♥", carte: "Cœur",    couleur: "#c8102e" },
    B: { nom: "Bleue", symbole: "♠", carte: "Pique",   couleur: "#2c66c9" },
    V: { nom: "Verte", symbole: "♣", carte: "Trèfle",  couleur: "#1e7a45" },
    J: { nom: "Jaune", symbole: "♦", carte: "Carreau", couleur: "#d9a400" }
  },

  // Horloge du Valet (écran de la régie). Heure de l'échéance, le jour même.
  horloge: { heureFin: "20:00" },

  // Les 8 visages du memory (16 cartes = 8 paires) : 8 des 24 suspects du Qui est-ce.
  memoryImages: [
    "assets/suspects/suspect-01.jpg", "assets/suspects/suspect-02.jpg", "assets/suspects/suspect-06.jpg", "assets/suspects/suspect-09.jpg", "assets/suspects/suspect-11.jpg", "assets/suspects/suspect-14.jpg", "assets/suspects/suspect-16.jpg", "assets/suspects/suspect-21.jpg"
  ],

  // Les 24 suspects du Qui est-ce (iPad) : portraits réalistes générés avec ChatGPT, matricule sur l'ardoise.
  suspects: [
    { nom: "Simone P.", matricule: 1801, image: "assets/suspects/suspect-01.jpg" },
    { nom: "Patrick F.", matricule: 1808, image: "assets/suspects/suspect-02.jpg" },
    { nom: "Nadine G.", matricule: 1815, image: "assets/suspects/suspect-03.jpg" },
    { nom: "Josiane L.", matricule: 1822, image: "assets/suspects/suspect-04.jpg" },
    { nom: "Monique G.", matricule: 1829, image: "assets/suspects/suspect-05.jpg" },
    { nom: "Gérard G.", matricule: 1836, image: "assets/suspects/suspect-06.jpg" },
    { nom: "Serge D.", matricule: 1843, image: "assets/suspects/suspect-07.jpg" },
    { nom: "Didier D.", matricule: 1850, image: "assets/suspects/suspect-08.jpg" },
    { nom: "Roland C.", matricule: 1857, image: "assets/suspects/suspect-09.jpg" },
    { nom: "Alain C.", matricule: 1864, image: "assets/suspects/suspect-10.jpg" },
    { nom: "Martine L.", matricule: 1871, image: "assets/suspects/suspect-11.jpg" },
    { nom: "Paulette R.", matricule: 1878, image: "assets/suspects/suspect-12.jpg" },
    { nom: "Bernard T.", matricule: 1885, image: "assets/suspects/suspect-13.jpg" },
    { nom: "René M.", matricule: 1892, image: "assets/suspects/suspect-14.jpg" },
    { nom: "Odette B.", matricule: 1899, image: "assets/suspects/suspect-15.jpg" },
    { nom: "Colette F.", matricule: 1906, image: "assets/suspects/suspect-16.jpg" },
    { nom: "Ginette R.", matricule: 1913, image: "assets/suspects/suspect-17.jpg" },
    { nom: "Gilles M.", matricule: 1920, image: "assets/suspects/suspect-18.jpg" },
    { nom: "Huguette T.", matricule: 1927, image: "assets/suspects/suspect-19.jpg" },
    { nom: "Lucien R.", matricule: 1934, image: "assets/suspects/suspect-20.jpg" },
    { nom: "Marcel B.", matricule: 1941, image: "assets/suspects/suspect-21.jpg" },
    { nom: "Sylvie B.", matricule: 1948, image: "assets/suspects/suspect-22.jpg" },
    { nom: "Lucienne C.", matricule: 1955, image: "assets/suspects/suspect-23.jpg" },
    { nom: "Jacky T.", matricule: 1962, image: "assets/suspects/suspect-24.jpg" }
  ],

  // Les 7 questions autorisées, rappelées à l'écran.
  questions: [
    "Est-ce une femme ?", "Porte-t-il un chapeau ?", "Porte-t-il des lunettes ?", "A-t-il les cheveux clairs (blonds, gris ou blancs) ?",
    "A-t-il une cicatrice ?", "Porte-t-il une cravate ?", "A-t-il une barbe ou une moustache ?"
  ],
  dureeDuel: 10, // minutes

  // Les 3 messages du Corbeau. Si le fichier audio manque, la régie affiche le texte à lire.
  corbeau: [
    { titre: "Message 1 — fin de l'acte 1", audio: "assets/audio/corbeau-1.mp3",
      texte: "(Annonce) Vous écoutez 395 NM, la radio qui dévoile tout, la nuit comme le jour. — … Allô ? Ça enregistre ? Bon. Alors comme ça, on lit le carnet de mon vieux copain le Valet ? Moi, c'est le Corbeau. Je suis sorti ce matin. Vingt ans que je compte les jours… et ça se termine ce soir. Ce trésor, c'est le mien. Cherchez, cherchez… Je vous regarde. Et quand la nuit tombera, je passerai. (grand croassement)" },
    { titre: "Message 2 — ouverture de l'acte 2", audio: "assets/audio/corbeau-2.mp3",
      texte: "Bonsoir, et bienvenue sur 395 NM, la radio des mauvais garçons. Ce soir, émission spéciale : les disques préférés du Valet. Chaque titre que vous reconnaîtrez vous rapportera une lettre. Mettez les lettres bout à bout : elles vous diront où il a rangé ce qui lui servait le plus, le soir venu. Restez avec nous… 395 NM, la radio qui dévoile tout, la nuit comme le jour." },
    { titre: "Message 3 — après l'ouverture des coffres", audio: "assets/audio/corbeau-3.mp3",
      texte: "(Annonce) Vous écoutez 395 NM, la radio qui dévoile tout, la nuit comme le jour. — Quoi ?! Vous l'avez trouvé ? … Bon. C'est l'heure. Il est à vous, c'est la loi. Bien joué. Le Valet serait fier de vous… D'ailleurs, vous ne vous êtes jamais demandé qui c'était, le Valet ? Regardez bien autour de vous…" }
  ],

  /* ----------------------------------------------------------
     Les 16 codes de l'acte 1 (4 par équipe) + la régie.
     type : "puzzle" (puzzle photo pivotant), "memory", "texte", "regie"
     ---------------------------------------------------------- */
  codes: {

    /* ---------------- ROUGE ♥ ---------------- */
    "TREFLE-R-VOLET": {
      equipe: "R", type: "puzzle", image: "assets/photos/volet-rouge.jpg",
      titre: "Une page du carnet, retrouvée…",
      fin: "Pour me lire, il faut me fermer. Que les uns me baissent de l'intérieur, que les autres lisent dehors."
    },
    "TREFLE-R-PLAFOND": {
      equipe: "R", type: "texte", titre: "Le Valet a levé les yeux…",
      texte: "Au royaume des jeux, sous la maison, cherche la boîte :",
      anagramme: "À REMPLIR (boîte n°1)"
    },
    "TREFLE-R-MEMORY": {
      equipe: "R", type: "memory",
      fin: "Bravo, petit Valet. Ton morceau de page dort À REMPLIR (cachette n°1 de la salle de jeux)."
    },
    "TREFLE-R-HAIE": {
      equipe: "R", type: "puzzle", image: "assets/photos/haie-rouge.jpg",
      titre: "Où le Trèfle a-t-il creusé ?",
      fin: "Dos à la petite porte, longe la haie en t'éloignant du portail. Au pied du 6ᵉ sapin, le Trèfle a enterré sa page."
    },

    /* ---------------- BLEUE ♠ ---------------- */
    "TREFLE-B-VOLET": {
      equipe: "B", type: "puzzle", image: "assets/photos/volet-bleu.jpg",
      titre: "Une page du carnet, retrouvée…",
      fin: "Pour me lire, il faut me fermer. Que les uns me baissent de l'intérieur, que les autres lisent dehors."
    },
    "TREFLE-B-PLAFOND": {
      equipe: "B", type: "texte", titre: "Le Valet marchait le nez en l'air…",
      texte: "Au royaume des jeux, sous la maison, cherche la boîte :",
      anagramme: "À REMPLIR (boîte n°2)"
    },
    "TREFLE-B-MEMORY": {
      equipe: "B", type: "memory",
      fin: "Bravo, petit Valet. Ton morceau de page dort À REMPLIR (cachette n°2 de la salle de jeux)."
    },
    "TREFLE-B-HAIE": {
      equipe: "B", type: "puzzle", image: "assets/photos/haie-bleu.jpg",
      titre: "Où le Trèfle a-t-il creusé ?",
      fin: "Depuis le coin de la haie en haut à droite, descends le long de la haie vers la piscine. Au pied du 5ᵉ sapin, le Trèfle a enterré sa page."
    },

    /* ---------------- VERTE ♣ ---------------- */
    "TREFLE-V-MEMORY": {
      equipe: "V", type: "memory",
      fin: "Bravo, petit Valet. Ton morceau de page dort À REMPLIR (cachette n°3 de la salle de jeux)."
    },
    "TREFLE-V-HAIE": {
      equipe: "V", type: "puzzle", image: "assets/photos/haie-vert.jpg",
      titre: "Où le Trèfle a-t-il creusé ?",
      fin: "Dos à l'abri de jardin, longe la haie du haut en direction du saule. Au pied du 8ᵉ sapin, le Trèfle a enterré sa page."
    },
    "TREFLE-V-VOLET": {
      equipe: "V", type: "puzzle", image: "assets/photos/volet-vert.jpg",
      titre: "Une page du carnet, retrouvée…",
      fin: "Pour me lire, il faut me fermer. Que les uns me baissent de l'intérieur, que les autres lisent dehors."
    },
    "TREFLE-V-PLAFOND": {
      equipe: "V", type: "texte", titre: "Le Valet gardait ses secrets au sec…",
      texte: "Tu as tout. Rejoins la table du Valet, au salon."
    },

    /* ---------------- JAUNE ♦ ---------------- */
    "TREFLE-J-HAIE": {
      equipe: "J", type: "puzzle", image: "assets/photos/haie-jaune.jpg",
      titre: "Où le Trèfle a-t-il creusé ?",
      fin: "Depuis le coin de la haie derrière la piscine, longe la haie du bas en direction de la maison. Au pied du 7ᵉ sapin, le Trèfle a enterré sa page."
    },
    "TREFLE-J-VOLET": {
      equipe: "J", type: "puzzle", image: "assets/photos/volet-jaune.jpg",
      titre: "Une page du carnet, retrouvée…",
      fin: "Le Valet glissait ses secrets entre le bois et le mur."
    },
    "TREFLE-J-PLAFOND": {
      equipe: "J", type: "texte", titre: "Le Valet guettait sous le saule…",
      texte: "Au royaume des jeux, sous la maison, cherche la boîte :",
      anagramme: "À REMPLIR (boîte n°4)"
    },
    "TREFLE-J-MEMORY": {
      equipe: "J", type: "memory",
      fin: "Bravo, petit Valet. Ton morceau de page dort À REMPLIR (cachette n°4 de la salle de jeux). Ensuite, rejoins la table du Valet, au salon."
    },

    /* ---------------- RÉGIE ---------------- */
    "TREFLE-REGIE-7Q4": { equipe: null, type: "regie" }
  }
};

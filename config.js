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
  version: "2026-10-27-1335",

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
      texte: "(Annonce) Vous écoutez 395 NM, la radio qui dévoile tout, la nuit comme le jour. — … Allô ? Ça enregistre ? Bon. Alors comme ça, on lit le carnet de mon vieux copain le Valet ? Moi, c'est le Corbeau. Je suis sorti ce matin. Vingt ans que je compte les jours… et ça se termine ce soir. Ce trésor, c'est le mien. Cherchez, cherchez… Je vous regarde. Et quand la nuit tombera, je passerai." },
    { titre: "Message 2 — ouverture de l'acte 2", audio: "assets/audio/corbeau-2.mp3",
      texte: "(Annonce) Vous écoutez 395 NM, la radio qui dévoile tout, la nuit comme le jour. — … Bonsoir. Je vous avais dit que je passerais à la nuit tombée. Me voilà. Vous avez cherché toute la journée… et maintenant, il fait noir. Pas de chance. Mais je suis beau joueur. Le Valet avait ses disques, toujours les mêmes, il les passait le soir. Je vais vous les faire écouter. Chaque chanson que vous reconnaîtrez vous donnera une lettre. À la fin, les lettres vous diront où chercher. Ratez-en trop… et vous resterez dans le noir. Allez. On commence." },
    { titre: "Message 3 — après l'ouverture des coffres", audio: "assets/audio/corbeau-3.mp3",
      texte: "(Annonce) Vous écoutez 395 NM, la radio qui dévoile tout, la nuit comme le jour. — Quoi ?! Vous l'avez trouvé ? Bon. C'est l'heure. Il est à vous, c'est la loi. Et moi, si je touche à un seul de ces bijoux, je repars pour vingt ans. Non merci. Bien joué. Moi, vingt ans à relire ses gribouillis, sans rien y comprendre… et vous, en une soirée. Le Valet serait fier de vous… D'ailleurs, vous ne vous êtes jamais demandé qui c'était, le Valet ? Regardez bien autour de vous…" }
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
      fin: "Pour me lire, il faut me fermer. Que les uns me baissent de l'intérieur, que les autres lisent dehors. Puis remontez-moi."
    },
    "TREFLE-R-PLAFOND": {
      apres: "TREFLE-R-VOLET",
      equipe: "R", type: "texte", titre: "Le Valet a levé les yeux…",
      texte: "Personne ne fouille une boîte de jeu : c'est là que le Valet rangeait ce qui comptait. Au royaume des jeux, sous la maison, cherche la boîte :",
      anagramme: "MOI, TOM", signature: "— V."
    },
    "TREFLE-R-MEMORY": {
      apres: "TREFLE-R-PLAFOND",
      equipe: "R", type: "memory",
      fin: "Bravo, petit Valet. Ton morceau de page dort contre un pied du baby-foot."
    },
    "TREFLE-R-HAIE": {
      apres: "TREFLE-R-MEMORY",
      equipe: "R", type: "puzzle", image: "assets/photos/haie-rouge.jpg",
      titre: "Où le Trèfle a-t-il creusé ?",
      fin: "Dos à la petite porte, longe la haie en t'éloignant du portail. Au pied du 6ᵉ sapin, le Trèfle a enterré sa page."
    },

    /* ---------------- BLEUE ♠ ---------------- */
    "TREFLE-B-VOLET": {
      equipe: "B", type: "puzzle", image: "assets/photos/volet-bleu.jpg",
      titre: "Une page du carnet, retrouvée…",
      fin: "Pour me lire, il faut me fermer. Que les uns me baissent de l'intérieur, que les autres lisent dehors. Puis remontez-moi."
    },
    "TREFLE-B-PLAFOND": {
      apres: "TREFLE-B-VOLET",
      equipe: "B", type: "texte", titre: "Le Valet marchait le nez en l'air…",
      texte: "Personne ne fouille une boîte de jeu : c'est là que le Valet rangeait ce qui comptait. Au royaume des jeux, sous la maison, cherche la boîte :",
      anagramme: "PAUL GOURO", signature: "— V."
    },
    "TREFLE-B-MEMORY": {
      apres: "TREFLE-B-PLAFOND",
      equipe: "B", type: "memory",
      fin: "Bravo, petit Valet. Ton morceau de page dort dans la portière de la petite voiture rouge et jaune."
    },
    "TREFLE-B-HAIE": {
      apres: "TREFLE-B-MEMORY",
      equipe: "B", type: "puzzle", image: "assets/photos/haie-bleu.jpg",
      titre: "Où le Trèfle a-t-il creusé ?",
      fin: "Les sapins gardent un salon secret, à l'abri des regards. Le Valet y a laissé de quoi lire."
    },

    /* ---------------- VERTE ♣ ---------------- */
    "TREFLE-V-MEMORY": {
      equipe: "V", type: "memory",
      fin: "Bravo, petit Valet. Ton morceau de page dort derrière la porte du placard du bar."
    },
    "TREFLE-V-HAIE": {
      apres: "TREFLE-V-MEMORY",
      equipe: "V", type: "puzzle", image: "assets/photos/haie-vert.jpg",
      titre: "Où le Trèfle a-t-il creusé ?",
      fin: "Dos à l'abri de jardin, longe la haie du haut en direction du saule. Au pied du 8ᵉ sapin, le Trèfle a enterré sa page."
    },
    "TREFLE-V-VOLET": {
      apres: "TREFLE-V-HAIE",
      equipe: "V", type: "puzzle", image: "assets/photos/volet-vert.jpg",
      titre: "Une page du carnet, retrouvée…",
      fin: "Pour me lire, il faut me fermer. Que les uns me baissent de l'intérieur, que les autres lisent dehors. Puis remontez-moi."
    },
    "TREFLE-V-PLAFOND": {
      apres: "TREFLE-V-VOLET",
      equipe: "V", type: "texte", titre: "Le Valet gardait ses secrets au sec…",
      texte: "Tu as tes 4 morceaux et ta clé. Rejoins la table du Valet, au salon, et montre cet écran à la régie : c'est ton laissez-passer."
    },

    /* ---------------- JAUNE ♦ ---------------- */
    "TREFLE-J-HAIE": {
      equipe: "J", type: "puzzle", image: "assets/photos/haie-jaune.jpg",
      titre: "Où le Trèfle a-t-il creusé ?",
      fin: "Dans cette rangée qui monte la garde, un seul soldat est tombé. C'est lui qui n'a jamais trahi le secret du Valet."
    },
    "TREFLE-J-VOLET": {
      apres: "TREFLE-J-HAIE",
      equipe: "J", type: "puzzle", image: "assets/photos/volet-jaune.jpg",
      titre: "Une page du carnet, retrouvée…",
      fin: "Le Valet glissait ses secrets entre le bois et le mur."
    },
    "TREFLE-J-PLAFOND": {
      apres: "TREFLE-J-VOLET",
      equipe: "J", type: "texte", titre: "Le Valet guettait sous le saule…",
      texte: "Personne ne fouille une boîte de jeu : c'est là que le Valet rangeait ce qui comptait. Au royaume des jeux, sous la maison, cherche la boîte :",
      anagramme: "DODO D'ÉLI", signature: "— V."
    },
    "TREFLE-J-MEMORY": {
      apres: "TREFLE-J-PLAFOND",
      equipe: "J", type: "memory",
      fin: "Bravo, petit Valet. Ton morceau de page dort contre le pied de la grande table. Ensuite, rejoins la table du Valet, au salon."
    },

    /* ---------------- RÉGIE ---------------- */
    "TREFLE-REGIE-7Q4": { equipe: null, type: "regie" }
  }
};

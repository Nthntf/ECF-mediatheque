# ECF Médiathèque

## Techno utilisés :

- Maquettage conçu avec : Pencil
- Library CSS utilisé : Tailwindcss
- Library Javascript utilisé : jQuery

### Page Vidéothéque

---

- Tâche à accomplir :
    - [x] Afficher les films dans un tableau
    - [x] Créer un bouton **"Ajouter"** qui nous fera apparaître un formulaire
        - Une zone de saisie pour le titre
        - Une zone de saisie pour l'année
        - Une zone de saisie pour l'auteur
        - Un bouton pour sauvegarder
    - [x] Vérifier les données saisies par l'utilisateur dans le formulaire d'ajout
        - Titre : **minimum 2 caractères**
        - Année : format de l'année 4 chiffres compris entre **1900 et l'année en cours**
        - Auteur : **minimum de 5 caractères**
    - [x] Si le formulaire est valide ajouter le film dans le tableau
        - On enregistrera le titre et le nom de l'auteur avec la **première lettre en MAJUSCULE**
        - Afficher un message d'alerte pendant 3s : "Film ajouter avec succès"
    - [x] Sinon on affichera un message d'erreur
        - Afficher un message d'alerte pendant 5s : "Erreur dans le formulaire " + les zones d'erreurs
    - [x] Pour le filtre :
        - Si l'option filtre par titre est sélection on affichera les films par **ordre alphabétique**
        - Si l'option filtre par année est sélection on affichera les films par **ordre décroissant**
    - [x] Enfin, pour chaque film on ajoutera un bouton _"Supprimer"_ qui permettra de retirer le film de la liste
        - On demandera une confirmation de suppression :
            - Si la personne confirme la suppression on retirera le film de la liste
            - Sinon on annulera la demande de suppression

### Page Recherche film

---

- Tâche à accomplir :
    - [x] Créer un formulaire de Recherche
        - [x] Une zone de saisie pour le titre
        - [x] Une zone de saisie pour l'année
        - [x] Un sélecteur pour le type (film, épisode, séries, saison)
              -> L'api ne propose pas saison + épisode ne fonctionnait pas tellement j'ai mit le type jeux à la place histoire d'avoir au moins 3 choix (film, jeux, séries)
    - [x] Faire la recherche via OMDB avec les données de l'utilisateur et veuillez a optimiser votre recherche.
    - [x] Afficher les différents résultats avec :
        - [x] Le poster du film (si disponible)
            - [x] Sinon afficher une image importé
        - [x] Le titre film
        - [x] L'année du film
    - [x] Affiche une pagination si besoin
        - [x] Chaque page renverra la suite des résultats attendu

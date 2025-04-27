
---

# Gestion de Pokémon - Application Full Stack

Ce projet est une application complète de gestion de Pokémon, composée d'un **backend** (API REST) et d'un **frontend** (interface utilisateur). L'application permet de gérer une base de données de Pokémon, offrant des fonctionnalités telles que la création, la mise à jour, la suppression et la récupération de Pokémon. Un système d'authentification sécurisé protège les actions sensibles. De plus, vous pourrez faire des duels de Pokemons.

# Vidéo de présentation du projet

[ Retrouver la vidéo youtube de mon projet ici ](https://youtu.be/CD67CT3wUJ8)

## Technologies utilisées

- **React** pour l’interface utilisateur.
- **Vite** pour le bundling et le développement rapide.
- **Axios** pour les appels API.
- **ESLint** pour la qualité du code.
- **CSS/SCSS** pour le style.
- **API REST** (backend local ou distant).
- **JWT (JSON Web Token)** pour l’authentification sécurisée.

## Fonctionnalités principales

- **Explorez la liste des Pokémon** : Parcourez une base de données complète de Pokémon, incluant leurs images, noms et types.
- **Recherche et filtrage avancés** : Trouvez rapidement un Pokémon par son nom ou appliquez des filtres sur des critères tels que le type ou la génération.
- **Fiche détaillée de chaque Pokémon** : Accédez aux informations complètes de chaque Pokémon, telles que leurs statistiques, types et autres caractéristiques importantes.
- **Modification des informations Pokémon** : Mettez à jour les informations des Pokémon, en personnalisant leurs détails selon vos besoins.
- **Tournois Pokémon** : Lancez des tournois où vos Pokémon s'affrontent en fonction de leurs statistiques, pour tester leur puissance et stratégie.
- **Sécurisation par authentification** : Inscription et connexion sécurisées via des tokens JWT. Ces tokens sont stockés de manière sécurisée côté client et sont utilisés pour protéger l'accès aux fonctionnalités sensibles.
- **Protection des routes** : Accès limité aux pages et fonctionnalités privées selon l’état de connexion de l’utilisateur, garantissant ainsi une expérience personnalisée et sécurisée. Certaines pages et fonctionnalités sont protégées pour garantir que seuls les utilisateurs authentifiés puissent y accéder. Cette protection est assurée via un composant personnalisé appelé **PrivateRoute**.
- **Déconnexion sécurisée** : Supprimez proprement votre token et les informations utilisateur à la déconnexion pour une sécurité optimale.

## Fonctionnalités esthétiques
- **Style** : J'ai opté pour un style design gameplay pour rappeler l'univers des jeux vidéo. (Coloris, Background animé, style de texte )
- **Interface responsive** : Profitez d'une expérience fluide, quelle que soit la taille de votre écran, que ce soit sur ordinateur, tablette ou mobile.


## Installation et Démarrage

### Prérequis
- **Node.js** (v16 ou supérieur)
- **MongoDB** (local ou hébergé)
- Un gestionnaire de paquets comme `npm` ou `yarn`

### Étapes d'installation


Lancer les commandes suivante pour récupérer le projet:

````
mkdir projet_react_pokemon
cd projet_react_pokemon
git clone https://github.com/zkerkeb-class/pokedex-starter-Medenga.git
git clone https://github.com/zkerkeb-class/pokedex-api-Medenga.git
````

Ouvrez le dossier projet_react_pokemon avec vscode. Lancer les commandes dans deux terminaux différents:

Terminale 1 (côté client)
````
cd pokedex-starter-Medenga
npm run dev
````

Terminale 2 (côté server)
````
cd pokedex-api-Medenga
npm run dev
````

Accès à l'application
Frontend : http://localhost:5173
Backend : http://localhost:3000


## Documentation des Routes Frontend

Pour ce projet j'ai fait le choix d'avoir une barre de navigation permettant de pouvoir navigué entre mes différentes pages pour ne pas se perdre.

### `/auth`
- **Composant associé** : `<Auth />`
- **Description** : Page de connexion pour les utilisateurs. Permet de saisir les informations d'identification (email et mot de passe) pour obtenir un token JWT.
- **Accès** : Public (pas besoin d'être authentifié).

### `/register`
- **Composant associé** : `<Register />`
- **Description** : Page d'inscription pour les nouveaux utilisateurs. Permet de créer un compte en fournissant des informations comme l'email et le mot de passe.
- **Accès** : Public (pas besoin d'être authentifié).

### `/pokedex`
- **Composant associé** : `<Pokedex />`
- **Description** : Page affichant la liste complète des Pokémon disponibles. Permet de consulter les informations de base des Pokémon.
- **Accès** : Protégé (nécessite une authentification via `<PrivateRoute />`).

### `/`
- **Composant associé** : `<APropos />`
- **Description** : Page "À propos" contenant des informations sur l'application ou l'équipe de développement.
- **Accès** : Protégé (nécessite une authentification via `<PrivateRoute />`).

### `/pokedex/pokemon/:id`
- **Composant associé** : `<Card />`
- **Description** : Page détaillée pour un Pokémon spécifique. Affiche les informations complètes d'un Pokémon identifié par son id.
- **Accès** : Protégé (nécessite une authentification via `<PrivateRoute />`).

### `/pokedex/pokemon/new`
- **Composant associé** : `<NewCard />`
- **Description** : Page permettant de créer un nouveau Pokémon. Inclut un formulaire pour saisir les informations du Pokémon (nom, types, statistiques, image, etc.).
- **Accès** : Protégé (nécessite une authentification via `<PrivateRoute />`).

### `/pokedex/tournament`
- **Composant associé** : `<Tournament />`
- **Description** : Page dédiée à l'organisation de tournois entre Pokémon. Permet de sélectionner des Pokémon pour des duels ou des compétitions.
- **Accès** : Protégé (nécessite une authentification via `<PrivateRoute />`).



## Documentation de l'API

### Endpoints principaux

#### Authentification
- **POST** `/api/login` : Connexion d'un utilisateur.
  - **Body** :
    ```json
    {
      "email": "user@example.com",
      "password": "password123"
    }
    ```
  - **Réponse** :
    ```json
    {
      "token": "jwt-token"
    }
    ```

#### Inscription
- **POST** `/api/register` : Inscription d'un utilisateur.
  - **Body** :
    ```json
    {
      "pseudo": "pseudo",
      "email": "user@example.com",
      "password": "password123"
    }
    ```
  - **Réponse** :
    ```json
    {
      "message": "Inscription réussie !"
    }
    ```

#### Pokémon
- **GET** `/api/pokemons` : Récupérer tous les Pokémon.
- **GET** `/api/pokemons/:id` : Récupérer un Pokémon par son ID.
- **POST** `/api/pokemons` : Créer un nouveau Pokémon.
  - **Headers** : `Authorization: Bearer <token>`
  - **Body** (form-data) :
    - `pokemon` : JSON des données du Pokémon.
    - `image` : Fichier image (JPG, JPEG, PNG).
- **PUT** `/api/pokemons/:id` : Mettre à jour un Pokémon.
  - **Headers** : `Authorization: Bearer <token>`
  - **Body** :
    ```json
    {
      "hp": 100,
      "attack": 50
    }
    ```
- **DELETE** `/api/pokemons/:id` : Supprimer un Pokémon.
  - **Headers** : `Authorization: Bearer <token>`

---


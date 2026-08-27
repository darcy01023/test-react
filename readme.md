# Shop.js V2

Application e-commerce réalisée dans le cadre d'un test technique.

Le projet permet de consulter un catalogue de produits, rechercher des produits, gérer un panier, créer un compte, passer une commande et administrer les commandes depuis une interface réservée aux administrateurs.

## 🌐 Démo

**Application :**  
https://lebongroin.netlify.app/

**API :**  
https://site--test-react--sw2wxzy5rpkz.code.run

## ✨ Fonctionnalités

### Catalogue
- Liste des produits
- Recherche par nom
- Affichage des détails d'un produit
- Gestion des quantités

### Panier
- Ajout de produits
- Modification des quantités
- Suppression automatique d'un produit lorsque sa quantité atteint zéro
- Calcul du total

### Authentification
- Création de compte
- Connexion / déconnexion
- Persistance de la session côté client
- Authentification par token

### Commandes
- Accès à la page de paiement pour les utilisateurs authentifiés
- Création d'une commande
- Adresse de livraison
- Historique des commandes côté administration

### Administration
- Accès réservé aux administrateurs
- Consultation des commandes
- Affichage des produits commandés et des prix
- Marquage d'une commande comme livrée

## 🛠️ Technologies

### Frontend
- React
- TypeScript
- Vite
- React Router
- TanStack Query
- Zustand
- Tailwind CSS

### Backend
- Node.js
- Express
- MongoDB
- Mongoose

### Déploiement
- Frontend : Netlify
- Backend : Northflank
- Base de données : MongoDB sur Northflank

## 📁 Structure du projet

```text
test-technique-react/
├── frontend/
│   ├── src/
│   │   ├── api/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── pages/
│   │   ├── stores/
│   │   └── types/
│   └── ...
│
├── backend/
│   ├── assets/
│   ├── middlewares/
│   ├── models/
│   ├── routes/
│   └── index.js
│
└── README.md
```

## 🚀 Installation

### Prérequis

- Node.js
- npm
- MongoDB

### Backend

    cd backend
    npm install

Créer un fichier `.env` :

    MONGO_URI=mongodb://localhost:27017/shopjsv2
    PORT=4000

Puis lancer le serveur :

    npm start

Le backend est disponible sur `http://localhost:4000`.

### Frontend

Dans un autre terminal :

    cd frontend
    npm install

Créer un fichier `.env` :

    VITE_API_URL=http://localhost:4000

Puis lancer le serveur de développement :

    npm run dev

L'application sera disponible à l'adresse indiquée par Vite.

## 🔨 Build

Pour générer le build du frontend :

    cd frontend
    npm run build

## 🔐 Variables d'environnement

### Backend

    MONGO_URI=...
    PORT=4000

### Frontend

    VITE_API_URL=...

En production, ces variables sont configurées directement dans l'environnement de déploiement.

## 🗄️ Base de données

Le backend utilise MongoDB avec Mongoose.

Les principaux modèles sont :

- `User`
- `Product`
- `Order`

Les produits peuvent être initialisés à partir des données présentes dans `backend/assets/products.json`.

## 🔒 Sécurité

- Les routes nécessitant une authentification utilisent un middleware dédié.
- Les routes d'administration vérifient les droits administrateur.
- Les secrets et variables d'environnement ne sont pas versionnés.
- Les communications avec les services déployés utilisent HTTPS.

## 📌 Routes principales

### Frontend

| Route | Accès |
|---|---|
| `/` | Public |
| `/products` | Public |
| `/products/:id` | Public |
| `/cart` | Public |
| `/users/login` | Public |
| `/users/signup` | Public |
| `/payment` | Utilisateur authentifié |
| `/admin` | Administrateur |

### API

| Méthode | Route | Accès |
|---|---|---|
| `POST` | `/user/signup` | Public |
| `POST` | `/user/login` | Public |
| `GET` | `/products` | Public |
| `GET` | `/products/:id` | Public |
| `POST` | `/orders` | Authentifié |
| `GET` | `/orders` | Administrateur |
| `PUT` | `/orders/mark-delivered/:id` | Administrateur |

## 📄 Scripts disponibles

### Frontend

    npm run dev
    npm run build
    npm run lint
    npm run preview

### Backend

    npm start
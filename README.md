# 🚀 SurveyPlatform - Collecte de Données

[![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white)](https://docker.com)
[![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)](https://reactjs.org)
[![Node.js](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org)
[![Firebase](https://img.shields.io/badge/firebase-%23039BE5.svg?style=for-the-badge&logo=firebase)](https://firebase.google.com)
[![Material--UI](https://img.shields.io/badge/material--ui-%230081CB.svg?style=for-the-badge&logo=material-ui&logoColor=white)](https://mui.com)

Une plateforme web moderne et sécurisée pour la création de sondages et la collecte de données, permettant aux entreprises de recueillir des avis consommateurs via des marchands et "callboxeurs". Interface élégante avec animations fluides et architecture DevOps-ready.

## ✨ Fonctionnalités

### 🎨 Frontend Moderne (React + Material-UI + Framer Motion)
- 🎭 **Animations fluides** : Transitions élégantes avec Framer Motion
- 🎨 **Design System** : Thème Material-UI personnalisé avec dégradés modernes
- 📱 **Interface responsive** : Optimisée pour mobile, tablette et desktop
- 🔐 **Authentification élégante** : Pages de login/register avec arrière-plan animé
- 📊 **Tableaux de bord interactifs** : Graphiques animés avec Recharts
- ⚡ **Performance optimisée** : Lazy loading et animations optimisées
- 🌙 **UX moderne** : Micro-interactions et feedback visuel

### 🛡️ Backend Sécurisé (Node.js + Express)
- 🔐 **Authentification JWT** avec rôles (Admin, Company, Merchant)
- 🛡️ **Sécurité renforcée** : Rate limiting, CORS, Helmet, compression
- 📝 **API RESTful complète** : CRUD pour sondages et réponses
- 💾 **Base de données hybride** : Firebase + fallback mock pour développement
- 📊 **Logging structuré** : Winston pour monitoring et debugging
- ⚡ **Performance** : Compression gzip, cache, health checks
- 🐳 **Containerisation** : Docker ready avec orchestration

### 🔧 DevOps & Qualité
- 🐳 **Containerisation complète** : Docker + Docker Compose
- 📏 **Qualité de code** : ESLint + Prettier configurés
- 🔍 **Monitoring** : Health checks, métriques, logging
- 🚀 **CI/CD prêt** : Structure pour déploiement automatisé
- 📚 **Documentation** : README complet + guides de déploiement

## 🛠️ Installation et Démarrage

### 🚀 Démarrage Rapide (Docker recommandé)
```bash
# Cloner le projet
git clone <repository-url>
cd survey-platform

# Démarrer avec Docker Compose
docker-compose up -d

# L'application sera disponible sur :
# Frontend: http://localhost:3000
# Backend API: http://localhost:5000
# Base de données: http://localhost:8080 (Adminer)
```

### 🔧 Installation Manuelle

#### Prérequis
- Node.js (v18+)
- npm ou yarn
- Docker (optionnel)

#### Backend
```bash
cd backend
npm install
npm start
```
Le serveur démarre sur http://localhost:5000

#### Frontend
```bash
cd frontend
npm install
npm start
```
L'application React démarre sur http://localhost:3000

### 🐳 Utilisation Docker Individuelle
```bash
# Backend uniquement
cd backend && docker build -t survey-backend .
docker run -p 5000:5000 survey-backend

# Frontend uniquement
cd frontend && docker build -t survey-frontend .
docker run -p 3000:3000 survey-frontend
```

## 🔧 Configuration Firebase (Optionnel)

Pour utiliser Firebase en production :

1. Créer un projet Firebase
2. Activer Firestore et Authentication
3. Télécharger la clé de service `firebase-service-account.json`
4. Placer le fichier dans `backend/`
5. Configurer les variables d'environnement dans `.env`

## 👥 Rôles Utilisateurs

- **Admin**: Accès complet à toutes les fonctionnalités
- **Company**: Création de sondages, visualisation des analyses
- **Merchant**: Consultation et réponse aux sondages

## 📜 Scripts Disponibles

### Backend
```bash
cd backend
npm start          # Démarrage en production
npm run dev        # Démarrage en développement (avec nodemon)
npm test           # Exécution des tests
npm run lint       # Vérification du code avec ESLint
```

### Frontend
```bash
cd frontend
npm start          # Démarrage du serveur de développement
npm run build      # Build de production
npm test           # Exécution des tests
npm run eject      # Éjection de Create React App
```

### Docker
```bash
docker-compose up -d              # Démarrage complet
docker-compose down               # Arrêt des services
docker-compose logs -f            # Suivi des logs
docker-compose exec backend sh    # Accès au conteneur backend
```

## 🔍 Monitoring & Debugging

### Health Checks
- **Backend**: `GET /health` - État du serveur et métriques
- **Frontend**: Interface utilisateur avec indicateurs visuels

### Logs
- **Backend**: Dossier `backend/logs/` (erreurs et accès)
- **Frontend**: Console du navigateur

### Métriques
- **Performance**: Response time, utilisation CPU/mémoire
- **Sécurité**: Tentatives de connexion, rate limiting
- **Business**: Nombre de sondages, taux de réponse

## � API Endpoints

### Authentification
- `POST /api/auth/register` - Inscription
- `POST /api/auth/login` - Connexion
- `GET /api/auth/me` - Profil utilisateur

### Sondages
- `POST /api/surveys` - Créer un sondage
- `GET /api/surveys` - Lister les sondages
- `GET /api/surveys/active/list` - Sondages actifs pour marchands
- `PUT /api/surveys/:id` - Modifier un sondage
- `DELETE /api/surveys/:id` - Supprimer un sondage

### Réponses
- `POST /api/responses` - Soumettre une réponse
- `GET /api/responses/survey/:surveyId` - Réponses d'un sondage

## 🏗️ Architecture

```
├── backend/
│   ├── routes/          # Routes API
│   ├── middleware/      # Middleware d'authentification
│   ├── firebase.config.js # Configuration Firebase
│   ├── mockDatabase.js  # Base de données de développement
│   └── server.js        # Serveur principal
├── frontend/
│   ├── src/
│   │   ├── components/  # Composants React
│   │   └── App.js       # Application principale
│   └── package.json
└── README.md
```

## 🔒 Sécurité

- Chiffrement des mots de passe (bcrypt)
- Tokens JWT pour l'authentification
- Validation des entrées
- Protection contre les injections SQL
- Headers de sécurité (Helmet)

## 📱 Support Mobile

L'application est responsive et fonctionne sur :
- Ordinateur de bureau
- Tablettes
- Téléphones mobiles (Android/iOS via navigateur)

## 🔄 Synchronisation Hors Ligne

- Stockage local des réponses en cas de perte de connexion
- Synchronisation automatique lors de la reconnexion
- Notifications utilisateur

## 📈 Analyses et Rapports

- Graphiques en barres et camemberts
- Statistiques en temps réel
- Export possible (extension future)

## 🚀 Déploiement

### Backend
```bash
cd backend
npm run build  # Si nécessaire
npm start
```

### Frontend
```bash
cd frontend
npm run build
# Servir les fichiers statiques depuis build/
```

## 🤝 Contribution

1. Fork le projet
2. Créer une branche feature
3. Commit les changements
4. Push vers la branche
5. Créer une Pull Request

## 📄 Licence

ISC

## 📞 Support

Pour toute question ou problème, veuillez contacter l'équipe de développement.

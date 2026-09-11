<div align="center">

# 🏦 SmartBank — Plateforme Bancaire Digitale (SPA)

**Une expérience bancaire interactive moderne, sécurisée et modulaire, développée en JavaScript Vanilla sans aucun framework externe.**

[![JavaScript ES6+](https://img.shields.io/badge/JavaScript-ES6%2B%20Modules-F7DF1E?logo=javascript&logoColor=black)](https://developer.mozilla.org/fr/docs/Web/JavaScript)
[![HTML5](https://img.shields.io/badge/HTML5-Semantique-E34F26?logo=html5&logoColor=white)](https://developer.mozilla.org/fr/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-Modern%20%26%20Responsive-1572B6?logo=css3&logoColor=white)](https://developer.mozilla.org/fr/docs/Web/CSS)
[![Security](https://img.shields.io/badge/Security-Web%20Crypto%20API%20(SHA--256)-2ea44f)](https://developer.mozilla.org/fr/docs/Web/API/SubtleCrypto)
[![Architecture](https://img.shields.io/badge/Architecture-SPA%20%2F%20Zero--Dependency-blueviolet)](#-architecture--structure-du-projet)
[![License](https://img.shields.io/badge/Licence-Projet%20%C3%89ducatif-lightgrey)](#%EF%B8%8F-mentions-l%C3%A9gales--disclaimer)

[Fonctionnalités](#-fonctionnalit%C3%A9s-cl%C3%A9s) • [Architecture](#-architecture--structure-du-projet) • [Technologies](#-stack-technologique) • [Démarrage Rapide](#-installation--d%C3%A9marrage-rapide) • [Sécurité](#-s%C3%A9curit%C3%A9--donn%C3%A9es) • [Roadmap](#%EF%B8%8F-feuille-de-route-roadmap)

---

</div>

## 📌 Présentation du Projet

**SmartBank** est une application web monopage (*Single Page Application* — SPA) simulant l'environnement d'une néobanque de nouvelle génération. Conçue selon une approche modulaire stricte en **JavaScript Vanilla**, elle démontre comment concevoir une application web complète, réactive, élégante et sécurisée sans dépendre de bibliothèques ou de frameworks tiers (comme React, Vue ou Angular).

L'application intègre un cycle complet d'utilisation financière : authentification sécurisée, tableau de bord en temps réel, catalogue de produits bancaires, simulateur d'emprunt dynamique, historique filtrable, gamification avec programme fidélité, et gestion autonome du profil utilisateur.

---

## ✨ Fonctionnalités Clés

### 🔐 1. Authentification & Sécurité Client
- **Création de compte & Connexion** : Validation stricte des données de formulaire (format e-mail, complexité du mot de passe).
- **Hachage Cryptographique Natif** : Protection des mots de passe avec l'algorithme **SHA-256** via l'API standard `crypto.subtle` (Web Crypto API).
- **Protection des Routes & Session** : Restriction automatique d'accès aux espaces privés en l'absence de session active, avec redirection intelligente.

### 📊 2. Tableau de Bord Intuitif (Dashboard)
- **Synthèse Financière** : Affichage dynamique du solde principal, des points de fidélité et des indicateurs de dépenses.
- **Dernières Transactions** : Aperçu rapide des opérations financières les plus récentes.
- **Raccourcis d'actions** : Accès direct vers les services essentiels (virement, simulateur, offres).

### 💳 3. Catalogue d'Offres Bancaires
- **Organisation par Métiers** : Présentation sous forme d'onglets (Cartes Bancaires, Prêts & Crédits, Épargne & Placements, Assurances).
- **Cartes Bancaires Virtuelles** : Cartes Classic, Gold et Black avec leurs plafonds et avantages respectifs.
- **Souscription Interactive** : Parcours de souscription avec mise à jour immédiate de l'état du compte.

### 🧮 4. Simulateur de Crédit Interactif
- **Calculs Financiers en Temps Réel** : Curseurs dynamiques (sliders) pour ajuster le montant du capital emprunté, la durée de remboursement et le taux d'intérêt annuel.
- **Métriques Détaillées** : Calcul précis de la mensualité amortie, du coût total du crédit et des intérêts cumulés.
- **Visualisation Réactive** : Restitution instantanée de l'impact financier sur le budget.

### ⚡ 5. Offres Flash & Événements Temporaires
- **Ventes Flash Dynamiques** : Promotions exclusives soumises à une contrainte temporelle.
- **Compte à Rebours en Temps Réel** : Chronomètres synchronisés à la seconde avec désactivation automatique à expiration.

### 🎡 6. Gamification & Roue de Récompenses
- **Roue de la Fortune Interactive** : Animation fluide de rotation avec tirage aléatoire contrôlé.
- **Programme de Fidélité** : Gain direct de points de fidélité ajoutés au solde de l'utilisateur avec historisation des gains.

### 📜 7. Historique & Analyse des Transactions
- **Journal Exhaustif** : Consultation complète de l'ensemble des crédits et débits.
- **Moteur de Recherche & Filtres** : Tri par type d'opération (entrées / sorties), filtrage par mots-clés et périodes.

### 👤 8. Gestion Complète du Profil
- **Mise à Jour des Coordonnées** : Édition instantanée des informations personnelles.
- **Changement Sécurisé du Mot de Passe** : Contrôle du mot de passe actuel avant modification.
- **Droit à l'Oubli & Réinitialisation** : Suppression intégrale du compte et purge complète des données locales en un clic.

---

## 🏗️ Architecture & Structure du Projet

L'application repose sur le paradigme des **Modules ES6** (`import` / `export`), garantissant une séparation claire des responsabilités (*Separation of Concerns*) :

```text
smartbank/
├── index.html              # Point d'entrée HTML5 unique (conteneur des vues SPA)
├── index.js                # Bootstrap de l'application & routage initial
│
├── components/             # Contrôleurs modulaires des vues
│   ├── auth.js             # Gestion de l'authentification (login, register, logout)
│   ├── dashboard.js        # Logique et affichage du tableau de bord
│   ├── offres.js           # Catalogue des produits et navigation par onglets
│   ├── simulation.js       # Moteur de calcul du simulateur de crédit
│   ├── flash.js            # Offres promotionnelles avec timers réactifs
│   ├── rewards.js          # Roue de la fortune et crédits des points fidélité
│   ├── historique.js       # Visualisation, recherche et filtres de transactions
│   └── profil.js           # Paramètres de compte et mise à jour des identifiants
│
├── router/
│   └── router.js           # Routage côté client (HTML5 History API, gestion des vues)
│
├── security/
│   └── security.js         # Abstraction cryptographique (hachage SHA-256 via Web Crypto)
│
├── storage/
│   └── storage.js          # Couche d'accès aux données (persistance localStorage)
│
└── styles/
    └── style.css           # Feuille de style globale (Variables CSS, Flexbox/Grid, Responsive)
```

### 🧭 Mécanisme de Routage SPA
Le routeur client ([`router/router.js`](file:///c:/Users/safiy/Documents/smartbank/router/router.js)) s'appuie sur l'API native **HTML5 History** (`history.pushState` et événement `popstate`). Il offre une navigation instantanée, sans rechargement de page, tout en préservant des URLs propres (`/dashboard`, `/offres`, `/simulation`, etc.) et la compatibilité avec les boutons *Précédent / Suivant* du navigateur.

---

## 💻 Stack Technologique

| Technologie | Rôle dans l'application | Points forts |
| :--- | :--- | :--- |
| **HTML5** | Structure sémantique & gabarit SPA | Balisage accessible, conteneurs de vues optimisés |
| **CSS3** | Design System & Responsive Design | Variables CSS personnalisées, Flexbox, Grid, transitions fluides, approche *Mobile-First* |
| **JavaScript (ES6+)** | Logique métier & comportement dynamique | Modules natifs, fonctions asynchrones (`async`/`await`), zéro dépendance tierce |
| **Web Crypto API** | Hachage sécurisé des identifiants | API cryptographique native des navigateurs (`crypto.subtle.digest`) |
| **LocalStorage API** | Persistance des données utilisateur | Persistance locale sans nécessiter de serveur de base de données |

---

## 🚀 Installation & Démarrage Rapide

### Prérequis
- Un navigateur web moderne compatible ES Modules (Google Chrome, Mozilla Firefox, Microsoft Edge, Safari).
- Un serveur HTTP local (requis car les modules JavaScript ES6 sont soumis aux règles de sécurité CORS et ne peuvent pas être exécutés directement via le protocole `file://`).

### 1. Cloner ou Télécharger le Dépôt
```bash
git clone https://github.com/votre-compte/smartbank.git
cd smartbank
```

### 2. Lancer un Serveur Local

Choisissez l'option qui correspond à votre environnement :

#### Option A — Avec VS Code (Recommandé)
1. Installez l'extension **Live Server**.
2. Faites un clic droit sur le fichier [`index.html`](file:///c:/Users/safiy/Documents/smartbank/index.html).
3. Cliquez sur **« Open with Live Server »**.

#### Option B — Avec Node.js (`npx`)
```bash
npx serve .
# Accessible par défaut sur http://localhost:3000
```

#### Option C — Avec Python (intégré nativement)
```bash
# Python 3
python -m http.server 8080
# Accessible sur http://localhost:8080
```

#### Option D — Avec PHP
```bash
php -S localhost:8080
```

### 3. Utilisation
Ouvrez l'URL générée dans votre navigateur, créez un compte ou connectez-vous pour accéder à l'interface bancaire complète.

---

## 🔒 Sécurité & Données

> [!NOTE]
> **Conception de Sécurité Client** :
> - Tous les mots de passe sont hachés en amont de leur persistance locale via **SHA-256** (`crypto.subtle.digest`).
> - Les données sont stockées sous clés isolées dans le stockage local du navigateur (`smartbank_user`, `smartbank_transactions`, `smartbank_gains_spinner`).
> - Une option de purge intégrale est disponible dans la vue Profil pour garantir la confidentialité et réinitialiser l'application.

---

## 🗺️ Feuille de Route (Roadmap)

- [ ] Ajout d'un module de virements instantanés de compte à compte avec validation par code OTP fictif.
- [ ] Export des relevés bancaires aux formats PDF et CSV.
- [ ] Graphiques dynamiques de répartition des dépenses (catégorisation automatique des flux).
- [ ] Mode Sombre / Mode Clair (Dark / Light Theme) commutable.
- [ ] Prise en charge multilingue (Français / Anglais).

---

## ⚠️ Mentions Légales & Disclaimer

Cette application est un **projet éducatif et de démonstration technique**. Aucune transaction financière réelle n'y est opérée et aucune donnée n'est transmise vers des serveurs bancaires ou externes. Toutes les marques, cartes et offres mentionnées sont purement fictives.

---

<div align="center">

Développé en **JavaScript Vanilla** • Conçu pour offrir une expérience utilisateur moderne et fluide.

</div>

# SmartBank

Application web bancaire fictive développée en JavaScript vanilla (SPA).

## Fonctionnalités

- Inscription et connexion avec mot de passe haché (SHA-256)
- Tableau de bord avec solde, points et dernières transactions
- Catalogue d'offres bancaires (cartes, crédits, épargne, assurances)
- Simulateur de crédit avec calcul des mensualités
- Offres flash avec compte à rebours en temps réel
- Roue des récompenses avec gain de points aléatoire
- Historique des transactions filtrable
- Gestion du profil (modification, changement de mot de passe, suppression)

## Structure du projet

```
smartbank/
├── index.html              # Structure HTML complète (SPA)
├── index.js                # Point d'entrée, initialisation des modules
├── components/
│   ├── auth.js             # Connexion, inscription, déconnexion
│   ├── dashboard.js        # Tableau de bord
│   ├── offres.js           # Catalogue d'offres avec onglets
│   ├── simulation.js       # Simulateur de crédit
│   ├── historique.js       # Historique des transactions
│   ├── flash.js            # Offres flash avec timer
│   ├── rewards.js          # Roue des récompenses
│   └── profil.js           # Gestion du profil utilisateur
├── router/
│   └── router.js           # Navigation SPA et gestion de l'URL
├── security/
│   └── security.js         # Hachage SHA-256 des mots de passe
├── storage/
│   └── storage.js          # Persistance via localStorage
└── styles/
    └── style.css           # Styles globaux (mobile-first)
```

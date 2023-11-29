
# Guide d'Utilisation et de Configuration

Ce document fournit des instructions détaillées pour l'utilisation de différents composants et outils dans votre projet.

## Sommaire
1. [Structure de la Card](#structure-de-la-card)
2. [Gestion d'une Application Node.js avec PM2](#gestion-dune-application-nodejs-avec-pm2)

---

## Structure de la Card
Une "card" dans notre contexte est représentée par un objet JSON. Chaque card comporte plusieurs attributs qui définissent son apparence et son comportement.

### Attributs des Cards

#### `icon` (Obligatoire)
- **Description :** Nom de l'icône représentant la card.
- **Exemple :** "university", "clipboardList".
- **Ressources :** Utilisez les icônes de [Font Awesome](https://fontawesome.com/).

#### `iconColor` (Obligatoire)
- **Description :** Couleur de l'icône.
- **Exemple :** Valeurs hexadécimales comme "#ffd383".
- **Ressources :** Choisissez des couleurs via [Color Picker](https://htmlcolorcodes.com/color-picker/).

#### `title` (Obligatoire)
- **Description :** Titre de la card.

#### `text` (Obligatoire)
- **Description :** Description ou texte d'accompagnement.

#### `link` (Conditionnel)
- **Description :** Lien de redirection direct.
- **Note :** Remplir avec le lien principale même si des sous-liens sont présents.

#### `sublinks` (Facultatif)
- **Description :** Tableau d'objets représentant des sous-liens.
- **Structure :** Chaque objet contient un "title" et une "url".

### Exemple de Card
```json
{
  "icon": "university",
  "iconColor": "#ffd383",
  "title": "Vie de la PTSI",
  "text": "Découvrez les événements et actualités de la PTSI.",
  "link": "",
  "sublinks": [
    {"title": "Événement sportif", "url": "https://exemple.com/evenement-sportif"},
    {"title": "Journée portes ouvertes", "url": "https://exemple.com/portes-ouvertes"},
    {"title": "Conférence invitée", "url": "https://exemple.com/conference"}
  ]
}
```

---

## Gestion d'une Application Node.js avec PM2
PM2 est un gestionnaire de processus robuste pour les applications Node.js en production. Il offre des fonctionnalités comme le redémarrage automatique, la surveillance et le clustering.

### Installation de PM2
Assurez-vous que Node.js et npm sont installés. Exécutez la commande suivante pour installer PM2 globalement :
```sh
npm install pm2 -g
```

### Démarrage de l'Application
Lancez votre application `server.js` avec PM2 en utilisant :
```sh
pm2 start server.js --name "mon-application"
```

### Commandes Utiles
- **Liste des Applications :** `pm2 list`
- **Surveillance :** `pm2 monit`
- **Redémarrage :** `pm2 restart "mon-application"`
- **Rechargement :** `pm2 reload "mon-application"`
- **Arrêt :** `pm2 stop "mon-application"`
- **Suppression :** `pm2 delete "mon-application"`
- **Journaux :** `pm2 logs "mon-application"`
- **Démarrage Automatique :** `pm2 startup`

### Aide et Documentation
Consultez `pm2 --help` ou la [documentation officielle de PM2](https://pm2.keymetrics.io/docs/usage/quick-start/) pour plus d'informations.

---

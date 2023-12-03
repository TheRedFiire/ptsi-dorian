
# Guide d'Utilisation et de Configuration

Ce document fournit des instructions détaillées pour l'utilisation de différents composants et outils dans votre projet.

## Sommaire
1. [Structure de la Card](#structure-de-la-card)

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

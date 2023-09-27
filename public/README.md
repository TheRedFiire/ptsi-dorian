# Documentation: Structure de la Card

Une "card" est représentée par un objet JSON avec les attributs suivants :

## Attributs

- **icon** *(Obligatoire)* :
  - Description : Nom de l'icône qui représente la card.
  - Exemple : "university", "clipboardList", etc.
  - Ressources : Ces icônes proviennent d'une bibliothèque gratuite disponible sur [Font Awesome](https://fontawesome.com/).

- **iconColor** *(Obligatoire)* :
  - Description : Couleur de l'icône.
  - Exemple : Les valeurs peuvent être des valeurs hexadécimals, comme "#ffd383".
  - Ressources : Pour choisir ces couleurs, vous pouvez utiliser cette ressources [Color Picker](https://htmlcolorcodes.com/color-picker/)

- **title** *(Obligatoire)* :
  - Description : Titre de la card.

- **text** *(Obligatoire)* :
  - Description : Description ou texte d'accompagnement de la card.

- **link** *(Conditionnel)* :
  - Description : Lien de redirection direct de la card.
  - Note : Si des sous-liens sont présents, cet attribut doit être laissé vide (`""`), sinon il doit contenir l'URL de redirection.

- **sublinks** *(Facultatif)* :
  - Description : Un tableau d'objets, où chaque objet représente un sous-lien avec un "title" et une "url".

## Exemple de Card

```json
{
  "icon": "university",
  "iconColor": "#ffd383",
  "title": "Vie de la PTSI",
  "text": "Découvrez les événements et actualités de la PTSI.",
  "link": "",
  "sublinks": [
    {
      "title": "Événement sportif",
      "url": "https://exemple.com/evenement-sportif"
    },
    {
      "title": "Journée portes ouvertes",
      "url": "https://exemple.com/portes-ouvertes"
    },
    {
      "title": "Conférence invitée",
      "url": "https://exemple.com/conference"
    }
  ]
}
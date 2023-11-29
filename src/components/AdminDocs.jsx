import React, { useEffect, useState } from 'react';
import Card from './Card';
import * as icons from '@fortawesome/free-solid-svg-icons';

// URL du fichier JSON dans le répertoire public
const cardsDataURL = '/config/cardsData.json?url';

const AdminDocs = () => {
  const [cards, setCards] = useState([]);

  // Utilisation de useEffect pour charger les données au montage du composant
  useEffect(() => {
    fetch(cardsDataURL)
      .then(response => response.json())
      .then(data => {
        setCards(data.adminDocs);
      })
      .catch(error => {
        console.error('Erreur lors de la récupération des données:', error);
      });
  }, []);  

  return (
    <section id="administratifs" className="p-6 bg-gray-100">
      <h2 className="text-4xl font-semibold text-gray-800 mb-8">Documents et liens administratifs</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {cards.map(card => (
          <Card
            key={card.title}
            icon={icons[card.icon]}
            iconColor={card.iconColor}
            title={card.title}
            text={card.text}
            link={card.link}
            sublinks={card.sublinks}
          />
        ))}
      </div>
    </section>
  );
};

export default AdminDocs;
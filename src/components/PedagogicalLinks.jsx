import React, { useEffect, useState } from "react";
import Card from "./Card";
import * as icons from "@fortawesome/free-solid-svg-icons";
import cardsDataURL from "/config/cardsData.json?url";

const PedagogicalLinks = () => {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    // Utilisation de fetch pour charger les données du fichier JSON
    fetch(cardsDataURL)
      .then((response) => response.json()) // Conversion de la réponse en JSON
      .then((data) => {
        setCards(data.pedagogicalLinks); // Mise à jour de l'état avec les données chargées
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération des données:", error);
      });
  }, []);

  return (
    <section id="liens-pedagogiques" className="p-6 bg-gray-100">
      <h2 className="text-4xl font-semibold text-gray-800 mb-8">
        Liens pédagogiques
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {cards.map((card, index) => (
          <div key={card.title + index} className="items-start self-start">
            {" "}
            {/* Clé unique ajoutée ici */}
            <Card
              icon={icons[card.icon]}
              iconColor={card.iconColor}
              title={card.title}
              text={card.text}
              link={card.link}
              sublinks={card.sublinks}
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default PedagogicalLinks;

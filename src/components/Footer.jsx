import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDiscord } from '@fortawesome/free-brands-svg-icons';
import cardsDataURL from '/config/cardsData.json?url';

const Footer = () => {
  const [data, setData] = useState({
    adminDocs: [],
    generalTools: [],
    pedagogicalLinks: []
  });

  useEffect(() => {
    fetch(cardsDataURL)
      .then(response => response.json())
      .then(data => setData(data))
      .catch(error => console.error('Erreur lors de la récupération des données:', error));
  }, []);

  const renderSection = (section, title) => (
    <div>
      <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">{title}</h2>
      <ul className="text-gray-500 dark:text-gray-400 font-medium">
        {section.map(item => (
          <li className="mb-4" key={item.title}>
            <a href={item.link} target="_blank" className="hover:underline">{item.title}</a>
          </li>
        ))}
      </ul>
    </div>
  );
  return (
    <footer className="bg-white dark:bg-gray-900">
      <div className="mx-auto w-full max-w-screen-xl">
        <div className="grid grid-cols-2 gap-8 px-4 py-6 lg:py-8 md:grid-cols-4">
          {renderSection(data.adminDocs, "Documents et liens administratifs")}
          {renderSection(data.generalTools, "Outils généraux")}
          {renderSection(data.pedagogicalLinks, "Liens pédagogiques")}
          <div>
            <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">Discord</h2>
            <a href="https://discord.gg/xQ5z7JCHSP" target="_blank" className="flex items-center text-blue-200 hover:underline">
              <FontAwesomeIcon icon={faDiscord} className="text-2xl mr-2" />
              Rejoignez notre serveur Discord
            </a>
          </div>
        </div>
        
        <div className="bg-gray-900 py-4">
            <div className="max-w-screen-xl mx-auto text-center text-white text-md">
                <p className="mb-2">
                Bidule : "Il y a 10 types de personnes : celles qui comprennent cette blague et celles qui ne la comprennent pas."
                </p>
                <p className="text-gray-500">© 2023 <a className='hover:underline' href='https://www.lycee-dorian.fr/' target="_blank">Lycée polyvalent public Dorian</a>. Tous droits réservés.</p>
            </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
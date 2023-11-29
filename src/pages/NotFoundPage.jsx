// src/pages/NotFoundPage.jsx

import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBug } from '@fortawesome/free-solid-svg-icons'; // Using a cat icon as a mascot

const NotFoundPage = () => {
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100 text-center">
            <FontAwesomeIcon icon={faBug} className="text-9xl text-blue-500" />
            <h1 className="text-6xl font-bold text-gray-800 mt-5">Error 404</h1>
            <p className="text-xl text-gray-700 mt-3">
                Oups! Nous ne pouvons pas trouver la page que vous cherchez.
            </p>
            <Link to="/" className="mt-6 bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-2 px-6 rounded-lg shadow transition duration-300 ease-in-out">
                Retour à l'accueil
            </Link>
        </div>
    );
};

export default NotFoundPage;

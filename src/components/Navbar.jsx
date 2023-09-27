import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/icon.jpg';

const Navbar = () => {
  return (
    <nav className="border-b border-gray-200 bg-gray-900">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <a href="/" className="flex items-center">
          <img 
            src={logo} 
            alt="Logo" 
            className="w-36 h-12 object-cover rounded-lg"
          />          
          {/* <span className="self-center text-2xl font-semibold whitespace-nowrap text-white">PTSI Dorian</span> */}
        </a>
        <div className="flex md:order-2">
          <button type="button" className="text-white font-medium rounded-lg text-sm px-4 py-2 text-center mr-3 md:mr-0 bg-blue-600 hover:bg-blue-700 focus:ring-blue-800">Forum général</button>
          <button data-collapse-toggle="navbar-cta" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200" aria-controls="navbar-cta" aria-expanded="false">
            <span className="sr-only">Ouvrir menu</span>
            <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15"/>
            </svg>
          </button>
        </div>
        <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-cta">
          <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border md:flex-row md:space-x-8 md:mt-0 md:border-0 bg-gray-900 border-gray-700">
            <li>
              <a href="/#administratifs" className="block py-2 pl-3 pr-4 text-white rounded hover:bg-gray-700">Administratifs</a>
            </li>
            <li>
              <a href="/#liens-pedagogiques" className="block py-2 pl-3 pr-4 text-white rounded hover:bg-gray-700">Liens pédagogiques</a>
            </li>
            <li>
              <a href="#" className="block py-2 pl-3 pr-4 text-white rounded hover:bg-gray-700">Agenda</a>
            </li>
            <li>
              <Link to="/depot-de-fichiers" className="block py-2 pl-3 pr-4 text-white rounded hover:bg-gray-700">
                Dépôt de fichiers
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendar,
  faLink,
  faLinkSlash,
  faSchool,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import logo from "../assets/icon.jpg";
import { faFile } from "@fortawesome/free-regular-svg-icons";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <nav className="bg-gray-900">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <a href="/" className="flex items-center">
          <img
            src={logo}
            alt="Logo"
            className="w-36 h-12 object-cover rounded-lg"
          />
        </a>
        <div className="flex md:order-2">
          <a
            href="https://forum.pt-dorian.net/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white font-medium rounded-lg px-4 py-2 text-center mr-3 md:mr-0 bg-blue-600 hover:bg-blue-700 focus:ring-blue-800"
          >
            Forum général
          </a>
          <button
            data-collapse-toggle="navbar-cta"
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-200"
            aria-controls="navbar-cta"
            aria-expanded={isMenuOpen}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <span className="sr-only">Ouvrir menu</span>
            {/* Icône du menu avec animation de transformation en croix */}
            <svg
              className={`w-6 h-6 transition duration-300 ease-in-out ${
                isMenuOpen ? "transform rotate-45" : ""
              }`}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d={
                  isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"
                }
              />
            </svg>
          </button>
        </div>
        <div
          className={`fixed inset-0 bg-gray-900 bg-opacity-90 backdrop-blur-sm z-50 transform ${
            isMenuOpen ? "translate-x-0" : "-translate-x-full"
          } transition-transform duration-500 ease-in-out md:relative md:translate-x-0 md:flex md:items-center md:w-auto md:h-auto md:bg-transparent md:z-auto`}
        >
          <button
            onClick={closeMenu}
            className="absolute top-5 right-5 text-white text-2xl md:hidden"
          >
            <FontAwesomeIcon icon={faTimes} />
          </button>
          <ul className="flex flex-col items-center justify-center h-full space-y-6 font-medium text-white md:flex-row md:space-x-8 md:space-y-0 md:items-center md:justify-start">
            <li className="md:hidden">
              <a
                href="/#administratifs"
                onClick={closeMenu}
                className="block text-lg py-2"
              >
                <FontAwesomeIcon icon={faSchool} className="mr-2" />
                Administratifs
              </a>
            </li>
            <li className="md:hidden">
              <a
                href="/#liens-pedagogiques"
                onClick={closeMenu}
                className="block text-lg py-2"
              >
                <FontAwesomeIcon icon={faLink} className="mr-2" />
                Liens pédagogiques
              </a>
            </li>
            <li className="md:hidden">
              <a
                href="/calendar"
                onClick={closeMenu}
                className="block text-lg py-2"
              >
                <FontAwesomeIcon icon={faCalendar} className="mr-2" />
                Agenda
              </a>
            </li>
            <li className="md:hidden">
              <Link
                to="/depot-de-fichiers"
                onClick={closeMenu}
                className="block text-lg py-2"
              >
                <FontAwesomeIcon icon={faFile} className="mr-2" />
                Dépôt de fichiers
              </Link>
            </li>
            {/* Liens pour la version ordinateur (sans icônes) */}
            <li className="hidden md:block">
              <a
                href="/#administratifs"
                onClick={closeMenu}
                className="text-lg py-2 md:text-base md:py-0"
              >
                Administratifs
              </a>
            </li>
            <li className="hidden md:block">
              <a
                href="/#liens-pedagogiques"
                onClick={closeMenu}
                className="text-lg py-2 md:text-base md:py-0"
              >
                Liens pédagogiques
              </a>
            </li>
            <li className="hidden md:block">
              <a
                href="/calendar"
                onClick={closeMenu}
                className="text-lg py-2 md:text-base md:py-0"
              >
                Agenda
              </a>
            </li>
            <li className="hidden md:block">
              <Link
                to="/depot-de-fichiers"
                onClick={closeMenu}
                className="text-lg py-2 md:text-base md:py-0"
              >
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

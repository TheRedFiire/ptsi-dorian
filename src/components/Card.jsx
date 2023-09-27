import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus, faLink } from "@fortawesome/free-solid-svg-icons";

const Card = ({ icon, iconColor, title, text, link, sublinks }) => {
  const [expanded, setExpanded] = useState(false);
  const hasSublinks = sublinks && sublinks.length > 0;

  return (
    <div className="flex flex-col min-h-[180px] h-full max-w-md p-6 border rounded-xl shadow-lg bg-white border-blue-300 transition-all duration-500 transform hover:shadow-2xl">
      <div className="flex-grow">
        <a
          href={link}
          target="_blank"
          style={{ userSelect: 'none' }}
          className="flex flex-row items-center mb-2"
        >
          <FontAwesomeIcon
            icon={icon}
            className={"mr-3 text-2xl"}
            color={iconColor}
          />
          <h5 className="text-xl font-bold text-blue-800">{title}</h5>
        </a>
        <p className="mb-4 text-gray-700">{text}</p>
      </div>
      <div>
        <a
          href={!hasSublinks ? link : undefined}
          target="_blank"
          style={{ userSelect: 'none' }}
          className="cursor-pointer inline-flex items-center text-blue-600 hover:underline"
          onClick={(e) => {
            // Seulement prévenir le comportement par défaut si il y a des sous-liens
            if (hasSublinks) e.preventDefault();
            if (hasSublinks) setExpanded(!expanded);
          }}
        >
          {expanded ? "Réduire" : hasSublinks ? "Explorer" : "Accéder"}
          <FontAwesomeIcon
            icon={expanded ? faMinus : hasSublinks ? faPlus : faLink}
            className="w-4 h-4 ml-2"
          />
        </a>

        {expanded && hasSublinks && (
          <div className="mt-4 space-y-2">
            {sublinks.map((sublink, index) => (
              <a
                key={index}
                href={sublink.url}
                className="block text-blue-600 hover:underline flex items-center space-x-2"
              >
                <FontAwesomeIcon icon={faLink} className="text-xs" />
                <span>{sublink.title}</span>
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Card;

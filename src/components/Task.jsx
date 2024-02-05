import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBook,
  faFlask,
  faLanguage,
  faLaptopCode,
  faGears,
  faSquareRootVariable,
  faClock,
  faLocationDot,
  faMicrochip,
} from "@fortawesome/free-solid-svg-icons";

const Task = ({ date, start, end, subject, professor, room, color, passed }) => {
  const [isHovered, setIsHovered] = useState(false);

  const timeToPosition = (time) => {
    const [hour, minutes] = time.split(":").map(Number);
    return (((hour - 8) * 60 + minutes) / 60) * 48;
  };

  const top = timeToPosition(start);
  const height = timeToPosition(end) - top;

  const darkenColor = (hexColor, percent) => {
    if (!/^#([0-9A-F]{3}){1,2}$/i.test(hexColor)) {
      console.error("Invalid hex color:", hexColor);
      return hexColor;
    }

    let r = parseInt(hexColor.slice(1, 3), 16);
    let g = parseInt(hexColor.slice(3, 5), 16);
    let b = parseInt(hexColor.slice(5, 7), 16);

    r = parseInt(r * (1 - percent / 100));
    g = parseInt(g * (1 - percent / 100));
    b = parseInt(b * (1 - percent / 100));

    return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, "0")}`;
  };

  const hoverColor = darkenColor(color, 10);
  const alignement = height >= 96 ? "flex-col" : "flex-row space-x-2";
  const finalColor = passed ? "#B0BEC5" : isHovered ? hoverColor : color;

  const newName = {
    "TP INFO Salle B306": "TP INFO",
    "Soutien SI": "Sout. Si",
  };

  const subjectIcon = {
    Maths: faSquareRootVariable,
    "TD maths": faSquareRootVariable,
    Physique: faFlask,
    "TD Physique": faFlask,
    "TD physique": faFlask,
    Français: faBook,
    Info: faLaptopCode,
    SI: faGears,
    "TD SI": faGears,
    "TP SI": faGears,
    "Soutien SI": faGears,
    Anglais: faLanguage,
    "TP INFO Salle B306": faLaptopCode,
    "INFO": faLaptopCode,
    "TIPE": faMicrochip
  }[subject];

  return (
    <div
      className={`absolute left-0 w-full border border-white text-white ${finalColor} ${
        passed ? "opacity-50" : ""
      } shadow-lg rounded-lg p-3 transition-all duration-300`}
      style={{
        top: `${top}px`,
        height: `${height}px`,
        backgroundColor: isHovered ? hoverColor : color,
        ...(passed && {
          backgroundImage:
            "linear-gradient(135deg, rgba(128, 128, 128, 0.2) 25%, transparent 25%, transparent 50%, rgba(128, 128, 128, 0.2) 50%, rgba(128, 128, 128, 0.2) 75%, transparent 75%, transparent)",
          backgroundSize: "20px 20px",
        }),
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div>
        <div className="flex flex-row content-center items-center self-center font-bold space-x-2">
          {subjectIcon && (
            <FontAwesomeIcon icon={subjectIcon} className="text-lg" />
          )}
          <h2>
            {newName[subject] || subject} - {professor}
          </h2>
        </div>
        <div className={`flex ${alignement} align-center content-center`}>
          <div className="text-sm text-zinc-100">
            <FontAwesomeIcon icon={faClock} /> {`${start} - ${end}`}
          </div>
          <div className="text-sm text-zinc-100">
            <FontAwesomeIcon icon={faLocationDot} /> {`${room}`}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Task;

import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock, faMapMarkerAlt, faChalkboardTeacher, faUserGroup } from '@fortawesome/free-solid-svg-icons';
import { format } from 'date-fns';

export function darkenColor(hexColor, percent) {
    let r = parseInt(hexColor.slice(1, 3), 16);
    let g = parseInt(hexColor.slice(3, 5), 16);
    let b = parseInt(hexColor.slice(5, 7), 16);

    r = Math.round(r * (1 - percent));
    g = Math.round(g * (1 - percent));
    b = Math.round(b * (1 - percent));

    const newHexColor = `#${((r << 16) + (g << 8) + b).toString(16).padStart(6, '0')}`;
    return newHexColor;
}

const newName = {"TD SI": "TD SSCIENCE DE L'INGENIEUR",
                "TP SI": "TP SCIENCE DE L'INGENIEUR",
                "TD INFO Salle B306": "TD INFORMATIQUE"}

const CourseCardCalendar = React.memo(({ course }) => {
    const { Activity, Professor, Time, Group } = course;

    const from = new Date(); // Définissez la date/heure de début
    const to = new Date(); // Définissez la date/heure de fin

    return (
        <div className={`flex flex-col flex-shrink-0 snap-center rounded-2xl border p-5 mx-2 h-auto relative bg-white`}>
            <div className="flex flex-row items-center justify-between mb-2 text-gray-700">
                <h3 className="text-lg font-bold">{newName}</h3>
            </div>
            <div className="flex flex-row items-center mb-2 text-xs text-gray-800">
                <FontAwesomeIcon icon={faClock} className="mr-2" />
                <span>{Time}</span>
                <span className="mx-2">|</span>
                <FontAwesomeIcon icon={faUserGroup} className="mr-2" />
                <span>{Group}</span>
                <span className="mx-2">|</span>
                <FontAwesomeIcon icon={faChalkboardTeacher} className="mr-2" />
                <span>{Professor}</span>
            </div>
        </div>
    );
});

export default CourseCardCalendar;
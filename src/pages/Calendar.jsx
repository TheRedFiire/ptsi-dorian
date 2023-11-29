import React, { useState, useEffect } from "react";
import "@hassanmojab/react-modern-calendar-datepicker/lib/DatePicker.css";
import DatePicker from "@hassanmojab/react-modern-calendar-datepicker";
import Task from "../components/Task";
import { startOfWeek } from "date-fns";
import scheduleData from "/config/schedule_final.json?url"; // Assurez-vous que le chemin est correct

const daysOfWeek = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi"];
const hoursOfDay = Array.from({ length: 24 }, (_, index) => {
  const hour = Math.floor((8 * 60 + 30 * index) / 60);
  const minute = (30 * index) % 60;
  return `${hour}:${minute.toString().padStart(2, "0")}`;
});
const filteredHoursOfDay = hoursOfDay.filter((hour) => !hour.includes(":30"));

const TimeTable = () => {
  const today = new Date();
  const currentYear = today.getFullYear();
  const currentMonth = today.getMonth() + 1; // Les mois sont indexés à partir de 0

  // Déterminez si nous sommes dans la première ou la seconde moitié de l'année scolaire
  const schoolYearStart = currentMonth >= 9 ? currentYear : currentYear - 1;
  const schoolYearEnd = schoolYearStart + 1;

  // Créez des objets Date pour les dates minimale et maximale
  const minDate = new Date(schoolYearStart, 8, 1); // 1er septembre de l'année scolaire en cours
  const maxDate = new Date(schoolYearEnd, 6, 6); // 6 juillet de l'année suivante

  // Convertissez ces dates au format attendu par DatePicker
  const formattedDefaultDate = {
    year: currentYear,
    month: currentMonth,
    day: today.getDate(),
  };
  const formattedMinDate = {
    year: minDate.getFullYear(),
    month: minDate.getMonth() + 1,
    day: minDate.getDate(),
  };
  const formattedMaxDate = {
    year: maxDate.getFullYear(),
    month: maxDate.getMonth() + 1,
    day: maxDate.getDate(),
  };

  const [selectedDay, setSelectedDay] = useState(formattedDefaultDate);
  const [selectedGroup, setSelectedGroup] = useState(
    localStorage.getItem("selectedGroup") || "A"
  );
  const [weeklyTasks, setWeeklyTasks] = useState([]);
  // Ajouter un état pour le jour actuel visible sur mobile
  const [currentDayIndex, setCurrentDayIndex] = useState(today.getDay()-1);

  // Fonction pour changer le jour actuel sur mobile
  const handleDayChange = (index) => {
    setCurrentDayIndex(index);
  };

  useEffect(() => {
    const savedGroup = localStorage.getItem("selectedGroup");
    if (savedGroup) {
      setSelectedGroup(savedGroup);
    }
  }, []);

  const setSelectedGroupWithStorage = (group) => {
    setSelectedGroup(group);
    localStorage.setItem("selectedGroup", group);
  };

  useEffect(() => {
    const loadCourses = (data) => {
      const start = startOfWeek(
        new Date(selectedDay.year, selectedDay.month - 1, selectedDay.day),
        { weekStartsOn: 1 }
      );
      const firstDayOfWeek = formatDateToFrench(start).toLowerCase();

      const tasksForWeek = data[firstDayOfWeek] || [];
      const filteredTasks = tasksForWeek.filter((task) =>
        task.group.includes(selectedGroup)
      );
      console.log(filteredTasks);
      setWeeklyTasks(filteredTasks);
    };

    // Utilisation de fetch pour charger les données du fichier JSON
    fetch(scheduleData)
      .then((response) => response.json()) // Conversion de la réponse en JSON
      .then((data) => {
        loadCourses(data); // Mise à jour de l'état avec les données chargées
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération des données:", error);
      });
  }, [selectedDay, selectedGroup]);

  const groups = [
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
  ];

  const tasks = [
    {
      day: "Lundi",
      start: "8:00",
      end: "10:30",
      subject: "Maths",
      professor: "M. Darreye",
      room: "B302",
      color: "#f0593f",
    },
    {
      day: "Mardi",
      start: "8:00",
      end: "10:30",
      subject: "Physique",
      professor: "M. Aubert",
      room: "B302",
      color: "#E1AB20",
    },
    {
      day: "Mardi",
      start: "10:30",
      end: "12:00",
      subject: "Maths",
      professor: "M. Darreye",
      room: "B302",
      color: "#f0593f",
    },
    {
      day: "Mercredi",
      start: "8:00",
      end: "10:00",
      subject: "SI",
      professor: "M. Costadoat",
      room: "B302",
      color: "#22659c",
    },
    {
      day: "Mercredi",
      start: "10:00",
      end: "12:00",
      subject: "Français",
      professor: "M.Chabot",
      room: "B302",
      color: "#744700",
    },
    {
      day: "Mercredi",
      start: "13:00",
      end: "15:30",
      subject: "Physique",
      professor: "M. Aubert",
      room: "B302",
      color: "#E1AB20",
    },
    {
      day: "Jeudi",
      start: "14:00",
      end: "16:00",
      subject: "Anglais",
      professor: "Mme. Pichon",
      room: "B302",
      color: "#339900",
    },
    {
      day: "Vendredi",
      start: "8:00",
      end: "10:30",
      subject: "Maths",
      professor: "M. Darreye",
      room: "B302",
      color: "#f0593f",
    },
  ];

  // Fonction pour formater la date au format français avec le point à la fin
  function formatDateToFrench(date) {
    const formatter = new Intl.DateTimeFormat("fr-FR", {
      day: "2-digit",
      month: "short"
    });
    const formatted = formatter.format(date);
    return (formatted.charAt(0).toUpperCase() + formatted.slice(1))
      .replace(/é/g, "e")
      .replace(/û/g, "u"); // Ajoute un point à la fin et retirer les accents
  }

  const calculateWeekDates = () => {
    const startDate = startOfWeek(
      new Date(selectedDay.year, selectedDay.month - 1, selectedDay.day),
      { weekStartsOn: 1 }
    );
    return daysOfWeek.map((_, index) => {
      let date = new Date(startDate);
      date.setDate(startDate.getDate() + index);
      return date.toLocaleDateString("fr-FR", {
        day: "2-digit",
        month: "long",
        year: "numeric"
      });
    });
  };

  const weekDates = calculateWeekDates();

  function isCoursePassed(courseDateString, courseEndTime) {
    const today = new Date();
    const [endHour, endMinutes] = courseEndTime.split(":").map(Number);
  
    // Extraire le jour et le mois et l'année à partir de courseDateString
    const [dayString, monthString, yearString] = courseDateString.split(" ");
    const day = parseInt(dayString);
    const monthNames = ["janvier", "février", "mars", "avril", "mai", "juin", "juillet", "août", "septembre", "octobre", "novembre", "décembre"];
    const month = monthNames.indexOf(monthString.toLowerCase());
    const year = parseInt(yearString);
  
    // Créer une date pour le cours
    const courseDate = new Date(year, month, day);
    courseDate.setHours(endHour, endMinutes, 0, 0);

    return courseDate < today;
  }  

  return (
    <div className="container mx-auto my-4">
      <div className="flex flex-row md:space-y-0 space-x-0 md:space-x-4 justify-center items-center md:mb-4">
        <div className="flex flex-col md:flex-row items-center justify-center space-y-2 md:space-y-0 space-x-2">
          <h2 className="text-sm md:text-lg font-semibold">
            Groupe de colle :
          </h2>
          <select
            className="p-2 rounded border border-gray-300"
            value={selectedGroup}
            onChange={(e) => setSelectedGroupWithStorage(e.target.value)}
          >
            {groups.map((group) => (
              <option key={group} value={group}>
                {group}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 space-x-2 z-30">
          <h2 className="text-sm md:text-lg font-semibold">Semaine :</h2>
          <DatePicker
            inputPlaceholder="Choisissez une date"
            inputClassName="p-2 rounded border border-gray-300 text-base"
            colorPrimary="#2563EB"
            value={selectedDay}
            onChange={setSelectedDay}
            minimumDate={formattedMinDate}
            maximumDate={formattedMaxDate}
            shouldHighlightWeekends
          />
        </div>
        <button
          className="hidden md:none bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg"
          onClick={() => setSelectedDay(formattedDefaultDate)}
        >
          Aujourd'hui
        </button>
      </div>

      <div className="md:hidden flex flex-row flex-shrink-0 sticky top-0 w-full justify-between p-5 shadow-sm z-10 rounded-t-3xl bg-white">
        {/* Affiche chaque jours de la semaine */}
        {daysOfWeek.map((day, index) => (
          <button
            key={day}
            className={`flex flex-col justify-center p-2 px-4 rounded-lg ${
              index === currentDayIndex ? "bg-indigo-700" : ""
            } items-center cursor-pointer z-auto`}
            onClick={() => handleDayChange(index)}
          >
            <span className={`text-sm text-gray-400`}>
              {weekDates[index].split(" ")[0]}
            </span>
            <span
              className={`flex flex-col font-bold relative ${
                index === currentDayIndex
                  ? "text-gray-200"
                  : new Date(
                      formattedDefaultDate.year,
                      formattedDefaultDate.month,
                      formattedDefaultDate.day
                    ) == weekDates[index]
                  ? "text-green-600"
                  : ""
              } `}
            >
              {day.slice(0, 2)}
            </span>
          </button>
        ))}
      </div>

      <div className="md:m-0 flex m-2">
        <div className="hidden md:flex flex-col bg-white text-right p-2 mr-4 pt-12">
          {filteredHoursOfDay.map((hour) => (
            <div
              key={hour}
              className="h-12 flex items-center justify-end pr-2 text-gray-400"
            >
              {hour}
            </div>
          ))}
        </div>

        <div className="flex-grow md:grid md:grid-cols-5">
          {daysOfWeek.map((day, index) => (
            <div
              key={day}
              className={`bg-white rounded-lg border transform transition duration-500 ${
                index === currentDayIndex ? "block" : "hidden md:block"
              }`}
            >
              <h2 className="text-xl font-bold text-gray-700 p-2 border-b mb-2">
                {day}
                <p className="text-sm font-semibold text-gray-500">
                  {weekDates[index]}
                </p>
              </h2>
              <div className="relative">
                {filteredHoursOfDay.map((hour) => (
                  <div
                    key={`${day}-${hour}`}
                    className="h-12 border-t flex items-center bg-gray-100"
                  ></div>
                ))}
                {tasks
                  .filter((task) => task.day === day)
                  .map((task) => (
                    <Task
                      key={`${task.day}-${task.start}-${task.end}-${task.subject}`}
                      day={day}
                      start={task.start}
                      end={task.end}
                      subject={task.subject}
                      professor={task.professor}
                      room={task.room}
                      color={task.color}
                      passed={isCoursePassed(weekDates[index], task.end)}
                    />
                  ))}
                {weeklyTasks
                  .filter((task) => task.day === day)
                  .map((task) => (
                    <Task
                      key={`${task.day}-${task.start}-${task.end}-${task.subject}`}
                      day={task.day}
                      start={task.start}
                      end={task.end}
                      subject={task.subject}
                      professor={task.professor}
                      room={task.room}
                      color={task.color}
                      passed={isCoursePassed(weekDates[index], task.end)}
                    />
                  ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TimeTable;
import React, { useState, useRef, useEffect } from "react";
import Select from "react-select";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFilePdf,
  faTimes,
  faFileImage,
  faFile,
  faUser,
  faBookOpen,
  faFileAlt,
  faInfoCircle,
  faExclamationTriangle,
  faCheckCircle,
} from "@fortawesome/free-solid-svg-icons";
import FileDropzone from "../functions/FileDropzone";
import studentsData from "../data/students.json";

const FileUpload = () => {
  const [file, setFile] = useState(null);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");
  const [selectedDocumentType, setSelectedDocumentType] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const [loading, setLoading] = useState(false);

  // État pour stocker les types de documents disponibles
  const [documentTypes, setDocumentTypes] = useState([]);
  const [showTooltip, setShowTooltip] = useState(false);

  const mounted = useRef(true);

  useEffect(() => {
    return () => {
      mounted.current = false;
    };
  }, []);

  useEffect(() => {
    let types;
    switch (selectedSubject) {
      case "physique":
        types = ["Cours", "TD", "TP", "Examens"];
        break;
      case "tipe":
        types = ["Présentation", "Figure"];
        break;
      default:
        types = ["Colle", "Devoir", "DM", "Exercice", "Autre"];
    }
    setDocumentTypes(types);
  }, [selectedSubject]);

  const setError = (message) => {
    // réinitialiser d'abord l'état errorMessage
    setErrorMessage(null);
    // puis le définir avec le nouveau message d'erreur
    setErrorMessage(message);
  };

  const handleFileChange = (selectedFile) => {
    setError("");
    if (selectedFile) {
      if (
        selectedFile.type === "image/png" ||
        selectedFile.type === "image/jpeg" ||
        selectedFile.type === "application/pdf" ||
        selectedFile.name.endsWith(".py")
      ) {
        if (selectedFile.size <= 5 * 1024 * 1024) {
          // Mis à jour à 5 Mo
          setFile(selectedFile);
          setError("");
        } else {
          setError("La taille maximale du fichier est de 5 Mo.");
        }
      } else {
        setError("Extensions autorisées : png, jpg, jpeg, pdf, py.");
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !file ||
      !firstName ||
      !lastName ||
      !selectedSubject ||
      !selectedDocumentType
    ) {
      setError("Tous les champs sont requis.");
      return;
    }

    setLoading(true);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("firstName", firstName);
    formData.append("lastName", lastName);
    formData.append("subject", selectedSubject);
    formData.append("documentType", selectedDocumentType);

    try {
      const response = await fetch("http://34.163.124.248:3001/upload", {
        method: "POST",
        body: formData,
        // Ne définissez pas l'en-tête 'Content-Type' ici. Laissez fetch le faire.
      });

      if (!response.ok) {
        throw new Error("Erreur de téléchargement");
      }

      setSuccessMessage("Succès du téléchargement");
      // Réinitialisez les champs ici après un succès
      setFile(null);
      setFirstName("");
      setLastName("");
      setSelectedSubject("");
      setSelectedDocumentType("");
      setErrorMessage("");
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const isFormValid = () => {
    return (
      file && firstName && lastName && selectedSubject && selectedDocumentType
    );
  };

  return (
    <div className="bg-gradient-to-br from-cyan-500 to-blue-800 bg-center bg-cover bg-no-repeat p-4 md:p-8">
      <div
        className="max-w-4xl mx-auto p-8 bg-white backdrop-blur-md shadow-lg rounded-lg space-y-6"
        style={{ userSelect: "none" }}
      >
        <h2 className="text-4xl font-semibold mb-5 text-center text-blue-800">
          Dépôt de fichiers
        </h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col space-y-2">
              <label
                htmlFor="studentName"
                className="text-lg font-medium text-gray-800 flex items-center w-full"
              >
                <FontAwesomeIcon icon={faUser} className="mr-2 text-blue-500" />
                Étudiant
              </label>
              <Select
                isSearchable
                name="studentName"
                options={studentsData}
                className="react-select-container md:w-[52rem]"
                classNamePrefix="react-select"
                placeholder="Sélectionnez votre nom et prénom"
                onChange={(selectedOption) => {
                  const [firstName, lastName] = selectedOption.value.split(" ");
                  setFirstName(firstName);
                  setLastName(lastName);
                }}
              />
            </div>
          </div>

          {/* Matière */}
          <div className="flex flex-col space-y-2">
            <label
              htmlFor="selectedSubject"
              className="text-lg font-medium text-gray-800 flex items-center"
            >
              <FontAwesomeIcon
                icon={faBookOpen}
                className="mr-2 text-blue-500"
              />
              Sélectionner la matière
            </label>
            <select
              id="selectedSubject"
              className="p-3 border rounded-md w-full focus:border-blue-500 focus:ring-1 focus:ring-blue-300 transition duration-200"
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)}
              required
            >
              <option value="" disabled>
                Sélectionnez une matière
              </option>
              <option value="physique">Physique-chimie</option>
              <option value="sii">Sciences de l'ingénieur</option>
              <option value="maths">Mathématiques</option>
              <option value="info">Informatique</option>
              <option value="anglais">Anglais</option>
              <option value="chemistry">Chimie</option>
              <option value="lettres">Lettres</option>
              <option value="tipe">TIPE</option>
            </select>
          </div>

          {/* Type de document */}
          <div className="flex flex-col space-y-2">
            <label
              htmlFor="selectedDocumentType"
              className="text-lg font-medium text-gray-800 flex items-center"
            >
              <FontAwesomeIcon
                icon={faFileAlt}
                className="mr-2 text-blue-500"
              />
              Sélectionnez le type de document
            </label>
            <select
              id="selectedDocumentType"
              className="p-3 border rounded-md w-full focus:border-blue-500 focus:ring-1 focus:ring-blue-300 transition duration-200"
              value={selectedDocumentType}
              onChange={(e) => setSelectedDocumentType(e.target.value)}
              required
            >
              <option value="" disabled>
                Sélectionnez un type de document
              </option>
              {documentTypes.map((type) => (
                <option key={type} value={type.toLowerCase()}>
                  {type}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col space-y-2 relative">
            <label
              htmlFor="file"
              className="text-lg font-medium text-gray-800 flex items-center"
            >
              <FontAwesomeIcon icon={faFile} className="mr-2 text-blue-500" />
              Sélectionner le fichier
              {/* Icône d'information */}
              <span className="ml-2 inline-block">
                <FontAwesomeIcon
                  icon={faInfoCircle}
                  className="text-blue-500 cursor-pointer"
                  onMouseOver={() => setShowTooltip(true)}
                  onMouseOut={() => setShowTooltip(false)}
                />
              </span>
            </label>
            <FileDropzone onFileChange={handleFileChange} />

            {/* Tooltip */}
            {showTooltip && (
              <div className="absolute left-0 mt-2 w-80 p-2 bg-white border border-gray-300 rounded shadow-lg text-sm">
                Un seul fichier à la fois. Donner un nom explicite et utile à
                votre fichier. Exemples:
                <br />
                * TD12-exercice1-question4.jpg
                <br />
                * Colle-16-mars.pdf
                <br />* DS4-exercice3.pdf
              </div>
            )}
          </div>

          {file && (
            <div className="relative bg-gray-200 p-4 rounded-md shadow-lg">
              <button
                className="absolute top-2 right-2 text-gray-800 hover:text-gray-600 transition duration-300"
                onClick={() => {
                  setFile(null);
                  setLoading(false);
                }}
              >
                <FontAwesomeIcon icon={faTimes} size="lg" />
              </button>
              <div className="flex items-center">
                <FontAwesomeIcon
                  icon={
                    file.type === "application/pdf"
                      ? faFilePdf
                      : file.type.startsWith("image/")
                      ? faFileImage
                      : faFile
                  }
                  className={`${
                    file.type === "application/pdf"
                      ? "text-red-500"
                      : file.type.startsWith("image/")
                      ? "text-green-500"
                      : "text-gray-500"
                  } text-4xl ml-3`}
                />
                <div className="flex flex-col max-w-sm pl-4 flex-grow truncate">
                  <span
                    className="text-sm font-normal truncate pr-4"
                    title={file.name} // Tooltip pour afficher le nom complet
                  >
                    {file.name}
                  </span>
                  <span className="text-xs text-gray-500 mt-1">
                    {(file.size / 1024).toFixed(2)} KB
                  </span>
                  <div className="relative h-1.5 mt-2 w-full rounded overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-full bg-white rounded"></div>
                    <div
                      className="absolute top-0 left-0 w-full h-full bg-blue-500 rounded"
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {errorMessage && (
            <div className="flex justify-between items-center border border-red-500 bg-red-100 text-red-500 p-2 rounded text-sm mt-1 text-center">
              <p className="flex items-center">
                <FontAwesomeIcon
                  icon={faExclamationTriangle}
                  className="mr-2"
                />
                {errorMessage}
              </p>
              <button
                onClick={() => setError("")}
                className="text-red-500 hover:text-red-700 transition duration-300"
              >
                <FontAwesomeIcon icon={faTimes} />
              </button>
            </div>
          )}

          {successMessage && (
            <div className="flex justify-between items-center border border-green-500 bg-green-100 text-green-500 p-2 rounded text-sm mt-1 text-center">
              <p className="flex items-center">
                <FontAwesomeIcon icon={faCheckCircle} className="mr-2" />
                {successMessage}
              </p>
              <button
                onClick={() => setSuccessMessage("")}
                className="text-green-500 hover:text-green-700 transition duration-300"
              >
                <FontAwesomeIcon icon={faTimes} />
              </button>
            </div>
          )}

          {/* Envoyer le fichier */}
          <div className="flex justify-center">
            <button
              type="submit"
              disabled={loading || !isFormValid()}
              className={`bg-green-500 hover:bg-green-600 text-white font-medium py-3 px-8 rounded-md transition duration-300 shadow hover:shadow-lg transform hover:scale-105 
          ${loading || !isFormValid() ? "opacity-50 cursor-not-allowed" : ""}`}
            >
              Envoyer le fichier
            </button>
          </div>
        </form>

        <a
          href="https://forum.pt-dorian.net/index.php?p=/entry/signin&Target=discussion%2F4844%2Fdepots-de-fichiers"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 hover:text-blue-700 text-sm block text-center mt-4"
        >
          Consignes pour l'upload de fichiers
        </a>
      </div>
    </div>
  );
};

export default FileUpload;

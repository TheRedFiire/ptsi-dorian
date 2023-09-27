import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload, faUser, faBookOpen, faFileAlt } from '@fortawesome/free-solid-svg-icons';
import FileDropzone from '../functions/FileDropzone'

const FileUpload = () => {
    const [file, setFile] = useState(null);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [selectedSubject, setSelectedSubject] = useState('');
    const [selectedDocumentType, setSelectedDocumentType] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleFileChange = (selectedFile) => {
        if (selectedFile) {
            if (
                selectedFile.type === 'image/png' ||
                selectedFile.type === 'image/jpeg' ||
                selectedFile.type === 'application/pdf' ||
                selectedFile.name.endsWith('.py')
            ) {
                if (selectedFile.size <= 15 * 1024 * 1024) {  // Mis à jour à 15 Mo
                    setFile(selectedFile);
                    setErrorMessage('');
                } else {
                    setErrorMessage('La taille maximale du fichier est de 15 Mo.');
                }
            } else {
                setErrorMessage('Extensions autorisées : png, jpg, jpeg, pdf, py.');
            }
        }
    };    

    const handleSubmit = (e) => {
        e.preventDefault();
        // Ajoutez ici la logique pour envoyer le fichier au serveur ou effectuer d'autres actions nécessaires.
        console.log('Fichier envoyé :', file);
        console.log('Prénom :', firstName);
        console.log('Nom :', lastName);
        console.log('Matière :', selectedSubject);
        console.log('Type de document :', selectedDocumentType);
    };

    return (
        <div className="max-w-lg mx-auto p-8 m-8 bg-gradient-to-r from-blue-100 to-blue-50 shadow-lg rounded-lg space-y-6">
            <h2 className="text-4xl font-semibold mb-5 text-center text-blue-800">Dépôt de fichiers</h2>
            <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-2 gap-4">
                    {/* Prénom */}
                    <div className="flex flex-col space-y-2">
                        <label htmlFor="firstName" className="text-lg font-medium text-gray-800 flex items-center">
                            <FontAwesomeIcon icon={faUser} className="mr-2 text-blue-500" />
                            Prénom
                        </label>
                        <input
                            type="text"
                            id="firstName"
                            placeholder="Entrez votre prénom"
                            className="p-3 border rounded-md w-full focus:border-blue-500 focus:ring-1 focus:ring-blue-300 transition duration-200"
                            maxLength="15"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            required
                        />
                        <span className="text-gray-500 text-xs">Max. 15 caractères</span>
                    </div>

                    {/* Nom */}
                    <div className="flex flex-col space-y-2">
                        <label htmlFor="lastName" className="text-lg font-medium text-gray-800 flex items-center">
                            <FontAwesomeIcon icon={faUser} className="mr-2 text-blue-500" />
                            Nom
                        </label>
                        <input
                            type="text"
                            id="lastName"
                            placeholder="Entrez votre nom"
                            className="p-3 border rounded-md w-full focus:border-blue-500 focus:ring-1 focus:ring-blue-300 transition duration-200"
                            maxLength="15"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            required
                        />
                        <span className="text-gray-500 text-xs">Max. 15 caractères</span>
                    </div>
                </div>


                { /* Matière */}
                <div className="flex flex-col space-y-2">
                    <label htmlFor="selectedSubject" className="text-lg font-medium text-gray-800 flex items-center">
                        <FontAwesomeIcon icon={faBookOpen} className="mr-2 text-blue-500" />
                        Sélectionner la matière
                    </label>
                    <select
                        id="selectedSubject"
                        className="p-3 border rounded-md w-full focus:border-blue-500 focus:ring-1 focus:ring-blue-300 transition duration-200"
                        value={selectedSubject}
                        onChange={(e) => setSelectedSubject(e.target.value)}
                        required
                    >
                        <option value="" disabled>--Sélectionner une matière--</option>
                        <option value="math">Mathématiques</option>
                        <option value="physics">Physique</option>
                        <option value="chemistry">Chimie</option>
                    </select>
                </div>

                { /* Type de document */}
                <div className="flex flex-col space-y-2">
                    <label htmlFor="selectedDocumentType" className="text-lg font-medium text-gray-800 flex items-center">
                        <FontAwesomeIcon icon={faFileAlt} className="mr-2 text-blue-500" />
                        Sélectionner le type de document
                    </label>
                    <select
                        id="selectedDocumentType"
                        className="p-3 border rounded-md w-full focus:border-blue-500 focus:ring-1 focus:ring-blue-300 transition duration-200"
                        value={selectedDocumentType}
                        onChange={(e) => setSelectedDocumentType(e.target.value)}
                        required
                    >
                        <option value="" disabled>--Sélectionner d'abord une matière--</option>
                        {/* Ajoutez ici les options de type de document en fonction de la matière sélectionnée */}
                    </select>
                </div>

                {/* Sélectionner le fichier */}
                <div className="flex items-center justify-center w-full mb-4">
                    <FileDropzone onFileChange={handleFileChange} />
                </div>
                {file && <div className="flex items-center justify-center w-full mb-4">
                    <span className="text-green-500 truncate w-48">{file.name}</span>
                </div>}
                <p className="text-red-500 text-sm mt-1 text-center">{errorMessage}</p>

                {/* Envoyer le fichier */}
                <div className="flex justify-center mt-4">
                    <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 px-8 rounded-md transition duration-200 shadow hover:shadow-lg transform hover:scale-105"
                    >
                        Envoyer le fichier
                    </button>
                </div>


            </form>
        </div>
    );
};

export default FileUpload;
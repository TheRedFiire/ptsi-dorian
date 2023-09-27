import React, { useState, useRef, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilePdf, faTimes, faFileImage, faFile, faUser, faBookOpen, faFileAlt } from '@fortawesome/free-solid-svg-icons';
import FileDropzone from '../functions/FileDropzone'

const FileUpload = () => {
    const [file, setFile] = useState(null);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [selectedSubject, setSelectedSubject] = useState('');
    const [selectedDocumentType, setSelectedDocumentType] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const [loading, setLoading] = useState(false);
    const [progress, setProgress] = useState(0);
    const [loadingMessage, setLoadingMessage] = useState('');

    const mounted = useRef(true);

    useEffect(() => {
        return () => {
            mounted.current = false;
        };
    }, []);


    const handleFileChange = (selectedFile) => {
        setLoadingMessage(''); // réinitialiser le message de chargement ici
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
        if (!file) {
            setErrorMessage('Veuillez sélectionner un fichier.');
            return;
        }

        setLoading(true);
        setLoadingMessage('Chargement en cours...');

        // Simuler le chargement du fichier
        const totalSize = file.size; // en octets
        let loadedSize = 0;
        const loadingInterval = setInterval(() => {
            if (mounted.current) {
                setProgress(currentProgress);
            }

            loadedSize += totalSize * 0.1; // suppose que 10% de la taille du fichier est chargé chaque seconde
            const currentProgress = Math.min((loadedSize / totalSize) * 100, 100);
            setProgress(currentProgress);

            // Mise à jour du message
            if (currentProgress === 100) {
                clearInterval(loadingInterval);
                setLoading(false);
                setLoadingMessage('Chargement terminé');
            }
        }, 1000);
    };

    return (
        <div className="max-w-xl mx-auto p-8 m-8 bg-white shadow-lg rounded-lg space-y-6">
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

                {file && (
                    <div className="relative bg-gray-200 p-4 rounded-md shadow-lg">
                        <button
                            className="absolute top-2 right-2 text-gray-800 hover:text-gray-600 transition duration-300"
                            onClick={() => {
                                setFile(null);
                                setProgress(0);
                                setLoading(false);
                            }}
                        >
                            <FontAwesomeIcon icon={faTimes} size="lg" />
                        </button>
                        <div className="flex items-center">
                            <FontAwesomeIcon
                                icon={file.type === 'application/pdf' ? faFilePdf : file.type.startsWith('image/') ? faFileImage : faFile}
                                className={`${file.type === 'application/pdf' ? "text-red-500" : file.type.startsWith('image/') ? "text-green-500" : "text-gray-500"} text-4xl ml-3`}
                            />
                            <div className="flex flex-col max-w-sm pl-4 flex-grow">
                                <span className="text-sm font-normal truncate" style={{ maxWidth: 'calc(100% - 1rem)' }}>{file.name}</span>
                                <span className="text-xs text-gray-500 mt-1">{(file.size / 1024).toFixed(2)} KB</span>
                                <div className="relative h-1.5 mt-2 w-full rounded">
                                    <div className="absolute top-0 left-0 w-full h-full bg-white rounded"></div>
                                    <div className="absolute top-0 left-0 h-full bg-blue-500 w-full rounded"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}



                {
                    errorMessage && (
                        <p className="flex items-center border border-red-500 bg-red-100 text-red-500 p-2 rounded text-sm mt-1 text-center">
                            <FontAwesomeIcon icon={faExclamationTriangle} className="mr-2" />
                            {errorMessage}
                        </p>
                    )
                }


                {/* Envoyer le fichier */}
                <button
                    type="submit"
                    disabled={loading}
                    className="bg-green-500 hover:bg-green-600 text-white font-medium py-3 px-8 rounded-md transition duration-300 shadow hover:shadow-lg transform hover:scale-105"
                >
                    Envoyer le fichier
                </button>



            </form>

            <a href="/forum/consignes" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-blue-700 text-sm block text-center mt-4">
                Consignes pour l'upload de fichiers
            </a>

        </div>
    );
};

export default FileUpload;
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload, faUser, faBookOpen, faFileAlt } from '@fortawesome/free-solid-svg-icons';

function FileDropzone({ onFileChange }) {
    const dropRef = React.useRef(null);
    const [isDragging, setIsDragging] = useState(false);

    const handleDrag = (e) => {
        e.preventDefault();
        e.stopPropagation();
    };

    const handleDragEnter = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(true);
    };
    
    const handleDragLeave = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
    };
    

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();

        let files = [...e.dataTransfer.files];

        if (files && files.length > 0) {
            const file = files[0];
            onFileChange(file);

            // Réinitialisez l'input file pour assurer que les événements onChange soient déclenchés même si le même fichier est choisi
            if (dropRef.current) {
                dropRef.current.value = '';
            }
        }
    };

    return (
        <div
            onDragOver={handleDrag}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDrop={handleDrop}
            className="flex items-center justify-center w-full mb-4"
        >

            <label htmlFor="file" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <FontAwesomeIcon icon={faUpload} className={`w-8 h-8 mb-4 text-gray-500 ${isDragging ? 'animate-spin' : ''}`} />
                    <p className="mb-2 text-sm text-gray-500">
                        <span className="font-semibold">Cliquez pour télécharger</span> ou glissez-déposez
                    </p>
                    <p className="text-xs text-gray-500">PNG, JPG, JPEG, PDF, PY (MAX. 10MB)</p>
                </div>
                <input
                    type="file"
                    id="file"
                    ref={dropRef}
                    className="hidden"
                    accept=".png, .jpg, .jpeg, .pdf, .py"
                    onChange={(e) => onFileChange(e.target.files[0])}
                    required
                />
            </label>
        </div>
    );
}

export default FileDropzone;

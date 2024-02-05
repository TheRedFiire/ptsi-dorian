const express = require("express");
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const helmet = require("helmet");
const cors = require("cors");
const morgan = require("morgan");
const rateLimit = require('express-rate-limit');

const app = express();

app.use(helmet());
app.use(cors());
app.use(morgan("combined"));

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10 // limite chaque IP à 10 requêtes par fenêtre
});
app.use(limiter);

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Les champs de texte seront disponibles ici
    console.log('Text fields', req.body);
    const safeFirstName = req.body.firstName.replace(/\s+/g, '_'); // Remplace les espaces par des underscores
    const safeLastName = req.body.lastName.replace(/\s+/g, '_'); // Remplace les espaces par des underscores

    const dir = `./uploads/${req.body.subject}/${req.body.documentType}/${safeFirstName}_${safeLastName}`;
    fs.mkdirSync(dir, { recursive: true });
    cb(null, dir);
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: multer.memoryStorage() });

app.post("/upload", upload.single("file"), (req, res) => {
  const { firstName, lastName, subject, documentType } = req.body;

  const safeFirstName = firstName.replace(/\s+/g, '_');
  const safeLastName = lastName.replace(/\s+/g, '_');

  const dir = `./uploads/${subject}/${documentType}/${safeFirstName}_${safeLastName}`;

  // Création du répertoire s'il n'existe pas
  fs.mkdirSync(dir, { recursive: true });

  // Définition du chemin complet du fichier
  const filepath = path.join(dir, req.file.originalname);

  // Écriture du fichier dans le répertoire
  fs.writeFile(filepath, req.file.buffer, err => {
    if (err) {
      console.error(err);
      return res.status(500).send("Une erreur est survenue lors du téléchargement du fichier !");
    }
    console.log('File saved to', filepath);
    res.status(200).send("Fichier téléchargé avec succès");
  });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Une erreur est survenue !");
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
});
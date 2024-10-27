// server.js

const express = require('express');
const cors = require('cors');
const app = express();
const db = require('./models');
const Role = db.role;

const dotenv = require('dotenv');
dotenv.config();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
require('./routes/auth.routes')(app);
require('./routes/user.routes')(app);
require('./routes/qhse.routes')(app);

// Synchronisation de la base de données et initialisation des rôles
db.sequelize.sync({ force: true }).then(() => {
  console.log('La base de données a été synchronisée.');
  initial();
});

// Route simple
app.get('/', (req, res) => {
  res.json({ message: 'Bienvenue sur le backend de MATEG 2.0.' });
});

// Démarrage du serveur
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Le serveur fonctionne sur le port ${PORT}.`);
});

// Fonction d'initialisation des rôles
function initial() {
  Role.findOrCreate({ where: { id: 1, name: 'user' } });
  Role.findOrCreate({ where: { id: 2, name: 'admin' } });
  Role.findOrCreate({ where: { id: 3, name: 'moderator' } });
}

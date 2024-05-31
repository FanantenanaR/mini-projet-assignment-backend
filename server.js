let express = require('express');
let app = express();
let bodyParser = require('body-parser');
let assignment = require('./controller/assignment.controller');

let mongoose = require('mongoose');
mongoose.Promise = global.Promise;
// mongoose.set('debug', true);

// remplacer toute cette chaine par l'URI de connexion à votre propre base dans le cloud s
// const uri = 'mongodb+srv://mb1:toto@cluster0.lxvcyxy.mongodb.net/assignments?retryWrites=true&w=majority&appName=Cluster0';
const uri = 'mongodb://localhost:27017/assignment';

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
};
// const options = {}

require("dotenv").config();

const cors = require("cors")
app.use(cors())

const connectDB = require('./configuration/database.configuration');
connectDB();

const indexRouter = require('./routes/index.routes');

// Pour accepter les connexions cross-domain (CORS)
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  next();
});

// Pour les formulaires
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Obligatoire si déploiement dans le cloud !
let port = process.env.PORT || 8010;

app.use('/', indexRouter);

// On démarre le serveur
app.listen(port, "0.0.0.0");
console.log('Serveur démarré sur http://localhost:' + port);

module.exports = app;



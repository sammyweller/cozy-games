const mongoose = require('mongoose'); // Modeling schema
const Models = require('./models.js');
const Games = Models.Game;

// Allows Mongoose to connect to that database so it can perform CRUD operations: 
//mongoose.connect('mongodb://localhost:27017/cozyDB', { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connect( process.env.CONNECTION_URI, { useNewUrlParser: true, useUnifiedTopology: true });

// Import express packages:
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
// const uuid = require('uuid'); //generate a unique ID at any point (I don't think I need this)

const app = express(); 

// Allow requests from certain domains:
const cors = require('cors');
let allowedOrigins = ['http://localhost:8080', 'http://localhost:1234', 'https://cozygamer.netlify.app/', 'https://sw-cozy-ca769a64fe57.herokuapp.com'];
app.use(cors({
  origin: (origin, callback) => {
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      let message = 'The CORS policy for this application doesn’t allow access from origin ' + origin;
      return callback(new Error(message), false);
    }
    return callback(null, true);
  }
}));

// Import middleware in common format:
app.use(morgan('common')); 
app.use(express.static('public')); // automatically routes all requests for static files to their corresponding files
app.use(bodyParser.json()); // any time you try to access the body of a request using req.body, the data will be expected to be in JSON format


  
  // GET requests (works in Postman)
  app.get('/', (req, res) => {
    res.send('Welcome to Cozy Gamers!');
  });
  
  // GET list of all games (works in Postman): 
  app.get('/games', async (req, res) => {
    await Games.find()
      .then((games) => {
        res.status(201).json(games);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send('Error: ' + err);
      });
  });

  // GET list of single game by title (works in Postman): 
  app.get('/games/:Title', async (req, res) => {
    await Games.findOne({ Title: req.params.Title })
      .then((game) => {
        res.json(game);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send('Error: ' + err);
      });
  });
  

  // Error handling: 
  app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
  });
  
  // listen for requests
  const port = process.env.PORT || 8080;
  app.listen(port, '0.0.0.0',() => {
   console.log('Listening on Port ' + port);
  });

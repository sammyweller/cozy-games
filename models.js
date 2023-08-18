const mongoose = require('mongoose');


let gameSchema = mongoose.Schema({
    Title: {type: String, required: true},
    Description: {type: String, required: true},
    Genre: {type: String},
    Year: {type: String},
    Platforms: {type: String},
    Developers: {type: String}
  });
  
  
  let Game = mongoose.model('Game', gameSchema);
  
  module.exports.Game = Game; // To import into index.js

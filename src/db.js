const mongoose = require('mongoose');
require('dotenv').config({ path: 'variables.env' });

const guest = require('./api/guest/guest.model.js');
const user = require('./api/user/user.model.js');

mongoose.Promise = global.Promise; // Tell Mongoose to use ES6 promises
const db = mongoose.connect(process.env.DATABASE);

mongoose.connection.on('error', err => {
  console.error(`🙅 🚫 🙅 🚫 🙅 🚫 🙅 🚫 → ${err.message}`);
});

const models = {
  guest,
  user,
};

module.exports = {
  db,
  models,
};

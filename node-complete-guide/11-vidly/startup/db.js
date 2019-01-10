const winston = require('winston');
const mongoose = require('mongoose');

module.exports = function db() {
  mongoose.connect('mongodb://localhost/vidly', { useNewUrlParser: true, useCreateIndex: true })
    .then(() => winston.info('Connected to MongoDB...'));

  // needed to fix deprecation warning
  mongoose.set('useFindAndModify', false);
};

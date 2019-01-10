const express = require('express');
const genres = require('../routes/genres');
const customers = require('../routes/customers');
const movies = require('../routes/movies');
const users = require('../routes/users');
const auth = require('../routes/auth');
const error = require('../middleware/error');

module.exports = function routes(app) {
  // STARTING MIDDLEWARE
  app.use(express.json());

  // ROUTES
  app.use('/api/genres', genres);
  app.use('/api/customers', customers);
  app.use('/api/movies', movies);
  app.use('/api/users', users);
  app.use('/api/auth', auth);

  // ENDING MIDDLEWARE
  app.use(error);
};

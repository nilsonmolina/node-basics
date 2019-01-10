const winston = require('winston');

module.exports = function catchErrors(err, req, res, next) {
  // Winston levels: error > warn > info > verbose > debug > silly
  winston.error(err.message, err);

  res.status(500).send('Something failed.');
  next();
};

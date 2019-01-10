const winston = require('winston');
require('winston-mongodb');
require('express-async-errors');

module.exports = function logging() {
  // CATCHING GLOBAL ERRORS
  winston.handleExceptions(
    new winston.transports.Console({ colorize: true, prettyPrint: true }),
    new winston.transports.File({ filename: 'uncaughtExceptions.log' }),
  );
  process.on('unhandledRejection', (ex) => {
    throw ex;
  });

  // SETTING UP LOGGER
  winston.add(winston.transports.File, { filename: 'logfile.log' });
  winston.add(winston.transports.MongoDB, { db: 'mongodb://localhost/vidly', level: 'info' });
};

// ALTERNATIVE TO CATCHING GLOBAL ERRORS
// process.on('uncaughtException', (ex) => {
//   winston.error(ex.message, ex);
//   process.exit(1);
// });
// // throw new Error('Something failed during startup.');

// process.on('unhandledRejection', (ex) => {
//   winston.error(ex.message, ex);
//   process.exit(1);
// });
// // const p = Promise.reject(new Error('Something failed miserably!'));
// // p.then(() => console.log('Done'));

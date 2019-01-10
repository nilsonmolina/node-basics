const config = require('config');

module.exports = function configuration() {
  // CHECKING ENVIRONMENT VARIABLES
  if (!config.get('jwtPrivateKey')) {
    throw new Error('FATAL ERROR: jwtPrivateKey is not defined.');
  }
};

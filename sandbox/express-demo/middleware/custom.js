function log(req, res, next) {
  console.log('Custom Middleware Started!');
  next();
  console.log('Custom Middleware Ended!');
}

module.exports = log;

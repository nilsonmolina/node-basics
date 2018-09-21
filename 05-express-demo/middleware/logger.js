function log(req, res, next) {
    console.log('Logging...');
    next(); // w/o this, request would hang
}

module.exports = log;
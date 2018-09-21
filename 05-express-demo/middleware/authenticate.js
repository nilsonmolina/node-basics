function authenticate(req, res, next) {
    console.log('Authenticating...');
    next(); // w/o this, request would hang
}

module.exports = authenticate;
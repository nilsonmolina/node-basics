// DEPENDENCIES
const express = require('express');

// SETUP
const router = express.Router();

// API ENDPOINTS
router.get('/', (req, res) => res.send('Hello World!'));

module.exports = router;

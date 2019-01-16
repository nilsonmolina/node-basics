// DEPENDENCIES
const path = require('path');
// const debug = require('debug')('app:files');
const multer = require('multer');
const express = require('express');

// SETUP
const router = express.Router();
const upload = multer({ dest: 'uploads/' });

// API ENDPOINTS
router.get('/', (req, res) => res.send('You made it!'));

router.post('/raw', upload.single('pricelist'), (req, res) => {
  // debug(req.file);
  // debug(req.body);
  res.download(path.join(__dirname, '../uploads', req.file.filename), 'cleaned.csv');
});

module.exports = router;

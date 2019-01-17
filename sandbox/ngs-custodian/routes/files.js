// DEPENDENCIES
// const debug = require('debug')('app:files');
const path = require('path');
const multer = require('multer');
const express = require('express');

const db = require('../db/index');

// SETUP
const router = express.Router();
const upload = multer({ dest: 'uploads/' });

// API ENDPOINTS
router.get('/', (req, res) => res.send('You made it!'));

router.get('/courses', async (req, res) => {
  const { rows } = await db.query('SELECT * FROM courses ORDER BY id ASC');
  res.send(rows);
});


router.post('/raw', upload.single('pricelist'), (req, res) => {
  // debug(req.file);
  // debug(req.body);
  res.download(path.join(__dirname, '../uploads', req.file.filename), 'cleaned.csv');
});

module.exports = router;

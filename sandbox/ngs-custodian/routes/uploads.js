// DEPENDENCIES
// const debug = require('debug')('routes');
const path = require('path');
const multer = require('multer');
const express = require('express');

const { cleanFileBash } = require('../utilities/cleanFile');

// SETUP
const router = express.Router();
const upload = multer({ dest: 'uploads/' });

// API ENDPOINTS
router.get('/', (req, res) => res.send('You made it!'));

router.post('/form', upload.single('pricelist'), async (req, res) => {
  const input = path.join(__dirname, '../uploads', req.file.filename);
  const output = path.join(__dirname, '../public/test.csv');
  await cleanFileBash(input, output);

  res.download(output, 'cleaned.csv');
});

router.post('/ajax', upload.single('pricelist'), (req, res) => {
  res.send('upload complete!');
});

module.exports = router;

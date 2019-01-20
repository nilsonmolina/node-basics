// DEPENDENCIES
// const debug = require('debug')('routes:files');
// const fs = require('fs');
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


router.post('/raw', upload.single('pricelist'), async (req, res) => {
  // debug(req.file);
  // debug(req.body);
  res.download(path.join(__dirname, '../uploads', req.file.filename), 'cleaned.csv');

  // const filepath = path.join(__dirname, '../uploads', req.file.filename);
  // await fs.readFile(filepath, async (err, data) => {
  //   if (err) throw err;

  //   const dirty = data.toString();
  //   const clean = dirty.split('\r\n').map((row) => {
  //     const r = row.split(',').map((col, index) => {
  //       let column = col;
  //       if (index === 0) column = column.replace(/ /g, '');
  //       column = column.replace(/"/g, '');
  //       return column;
  //     });
  //     return r;
  //   });

  //   await fs.writeFile(path.join(__dirname, '../public/test.txt'), clean, 'utf-8', (error) => {
  //     if (error) throw error;
  //   });
  // });

  // res.download(path.join(__dirname, '../public/test.txt'), 'cleaned.csv');
});

router.post('/upload', upload.single('pricelist'), (req, res) => {
  res.send('upload complete!');
});

module.exports = router;

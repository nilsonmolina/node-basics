// DEPENDENCIES
const express = require('express');

const db = require('../db/index');

// SETUP
const router = express.Router();

// API ENDPOINTS
router.get('/', async (req, res) => {
  const { rows } = await db.query('SELECT * FROM courses ORDER BY id ASC');
  res.send(rows);
});

router.get('/:id', async (req, res) => {
  const { rows } = await db.query('SELECT * FROM courses WHERE id=$1', [req.params.id]);
  if (rows.length < 1) res.status(404).send('A course with that id was not found.');

  res.send(rows[0]);
});

module.exports = router;

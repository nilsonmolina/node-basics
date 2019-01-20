// DEPENDENCIES
const express = require('express');

const db = require('../db/index');

// SETUP
const router = express.Router();

// API ENDPOINTS
router.get('/', async (req, res) => {
  const partNumber = req.query.number;
  if (!partNumber) return res.status(404).send('must send a number.');

  const { rows } = await db.query('SELECT * FROM parts WHERE number=$1', [partNumber.toUpperCase()]);
  if (rows.length < 1) return res.status(404).send('part not found.');

  return res.send(rows);
});

router.get('/:id', async (req, res) => {
  const { rows } = await db.query('SELECT * FROM parts WHERE id=$1', [req.params.id]);
  if (rows.length < 1) return res.status(404).send('part not found.');

  return res.send(rows);
});

module.exports = router;

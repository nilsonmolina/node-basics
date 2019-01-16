// DEPENDENCIES
const express = require('express');
const { courses, validate } = require('../models/course');

// SETUP
const router = express.Router();

// API ENDPOINTS
router.get('/', async (req, res) => {
  const c = await courses.getAll();
  res.send(c);
});

router.post('/', async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const course = await courses.create(req.body.name);
  return res.status(201).send(course);
});

router.get('/:id', async (req, res) => {
  const course = await courses.getByID(parseInt(req.params.id, 10));
  if (!course) return res.status(404).send('The course with the given ID was not found.');

  return res.send(course);
});

router.put('/:id', async (req, res) => {
  const _id = parseInt(req.params.id, 10);
  let course = await courses.getByID(_id);
  if (!course) return res.status(404).send('The course with the given ID was not found.');

  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  course = await courses.update(_id, req.body.name);
  return res.send(course);
});

router.delete('/:id', async (req, res) => {
  const _id = parseInt(req.params.id, 10);
  let course = await courses.getByID(_id);
  if (!course) return res.status(404).send('The course with the given ID was not found.');

  course = await courses.delete(_id);
  return res.send(course);
});

module.exports = router;

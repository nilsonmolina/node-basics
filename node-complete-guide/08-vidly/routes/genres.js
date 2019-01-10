const express = require('express');
const { Genre, validate } = require('../models/genre');

const router = express.Router();

router.get('/', async (req, res) => {
  const genres = await Genre.find().sort('name');
  res.send(genres);
});

router.get('/:id', async (req, res) => {
  try {
    const genre = await Genre.findById(req.params.id);
    if (!genre) return res.status(404).send('A genre with the given ID could not be found');

    return res.send(genre);
  } catch (err) { return res.status(404).send('A genre with the given ID could not be found'); }
});

router.post('/', async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let genre = new Genre({ name: req.body.name });
  genre = await genre.save(genre);

  return res.send(genre);
});

router.put('/:id', async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  try {
    const genre = await Genre.findByIdAndUpdate(req.params.id,
      { name: req.body.name }, { new: true });

    if (!genre) return res.status(404).send('A genre with the given ID could not be found');

    return res.send(genre);
  } catch (ex) { return res.status(404).send('A genre with the given ID could not be found'); }
});

router.delete('/:id', async (req, res) => {
  try {
    const genre = await Genre.findByIdAndRemove(req.params.id);
    if (!genre) return res.status(404).send('A genre with the given ID could not be found');

    return res.send(genre);
  } catch (ex) { return res.status(404).send('A genre with the given ID could not be found'); }
});

module.exports = router;

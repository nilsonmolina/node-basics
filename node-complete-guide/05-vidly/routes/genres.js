const express = require('express');
const router = express.Router();
const Joi = require('joi');

const genres = [
    { id: 1, name: 'action' },
    { id: 2, name: 'horror' },
    { id: 3, name: 'comedy' },
    { id: 4, name: 'drama' },
    { id: 5, name: 'documentary' },
];

router.get('/', (req, res) => {
    res.send(genres);
});

router.get('/:id', (req, res) => {
    const genre = genres.find(g => g.id === parseInt(req.params.id));
    if (!genre) return res.status(404).send('A genre with the given ID could not be found');
    res.send(genre);
});

router.post('/', (req, res) => {
    const { error } = validateGenre(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const genre = {
        id: genres.length + 1,
        name: req.body.name
    };
    genres.push(genre);
    res.send(genre);
});

router.put('/:id', (req, res) => {
    const {error} = validateGenre(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const genre = genres.find(g => g.id === parseInt(req.params.id));
    if (!genre) return res.status(404).send('A genre with the given ID could not be found');

    genre.name = req.body.name;
    res.send(genre);
});

router.delete('/:id', (req, res) => {
    const genre = genres.find(g => g.id === parseInt(req.params.id));
    if (!genre) return res.status(404).send('A genre with the given ID could not be found');
    
    const index = genres.indexOf(genre);
    genres.splice(index, 1);

    res.send(genre);
});

function validateGenre(genre) {
    const schema = {
        name: Joi.string().min(3).required()
    };
    return Joi.validate(genre, schema);
}

module.exports = router;
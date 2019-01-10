const express = require('express');
const { Customer, validate } = require('../models/customer');

const router = express.Router();

const errorIdNotFound = 'A customer with the given ID could not be found';

router.get('/', async (req, res) => {
  const customers = await Customer.find().sort('name');
  return res.send(customers);
});

router.get('/:id', async (req, res) => {
  try {
    const customer = await Customer.findById(req.params.id);
    if (!customer) throw new Error(errorIdNotFound);

    return res.send(customer);
  } catch (err) { return res.status(404).send(err.message); }
});

router.post('/', async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let customer = new Customer({
    name: req.body.name,
    phone: req.body.phone,
    isGold: req.body.isGold,
  });
  customer = await customer.save(customer);

  return res.send(customer);
});

router.put('/:id', async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  try {
    const customer = await Customer.findByIdAndUpdate(req.params.id, {
      name: req.body.name,
      phone: req.body.phone,
      isGold: req.body.isGold,
    }, { new: true });
    if (!customer) throw new Error(errorIdNotFound);

    return res.send(customer);
  } catch (err) { return res.status(404).send(err.message); }
});

router.delete('/:id', async (req, res) => {
  try {
    const customer = await Customer.findByIdAndRemove(req.params.id);
    if (!customer) throw new Error(errorIdNotFound);

    return res.send(customer);
  } catch (err) { return res.status(404).send(err.message); }
});

module.exports = router;

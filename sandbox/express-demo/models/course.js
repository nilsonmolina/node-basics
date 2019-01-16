const Joi = require('joi');
const db = require('../db/index');

const courses = {
  getAll: async function getAll() {
    const { rows } = await db.query('SELECT * FROM courses ORDER BY id ASC');
    return rows;
  },
  getByID: async function getByID(id) {
    const { rows } = await db.query('SELECT * FROM courses WHERE id=$1', [id]);
    return rows[0];
  },
  create: async function add(name) {
    const { rows } = await db.query('INSERT INTO courses (name) VALUES($1) RETURNING "id", "name"', [name]);
    return rows[0];
  },
  update: async function update(id, name) {
    const { rows } = await db.query('UPDATE courses SET name=$1 WHERE id=$2 RETURNING "id", "name"', [name, id]);
    return rows[0];
  },
  delete: async function remove(id) {
    const { rows } = await db.query('DELETE FROM courses WHERE id=$1 RETURNING "id", "name"', [id]);
    return rows[0];
  },
};

function validateCourse(course) {
  const schema = {
    name: Joi.string().min(3).required(),
  };

  return Joi.validate(course, schema);
}

exports.courses = courses;
exports.validate = validateCourse;


// const Joi = require('joi');

// const courses = [
//   { id: 1, name: 'English' },
//   { id: 2, name: 'Math' },
//   { id: 3, name: 'Science' },
// ];

// function validateCourse(course) {
//   const schema = {
//     name: Joi.string().min(3).required(),
//   };

//   return Joi.validate(course, schema);
// }

// exports.courses = courses;
// exports.validate = validateCourse;

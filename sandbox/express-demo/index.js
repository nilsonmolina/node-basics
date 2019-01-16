// APP DEPENDENCIES
const debug = require('debug')('app:startup'); // export DEBUG=app:startup
const helmet = require('helmet');
const morgan = require('morgan');
const config = require('config');
const express = require('express');

// const custom = require('./middleware/custom');
const home = require('./routes/home');
const courses = require('./routes/courses');

// SETUP
const app = express();
const port = process.env.PORT || 3000;

// CONFIGURATION
debug(`Application Name: "${config.get('name')}"`);

// LOAD MIDDLEWARE
app.use(express.json()); // allows us to use 'req.body'
app.use(helmet());
app.use(morgan(':remote-addr - :method :url :status :res[content-length] - :response-time ms'));
// if (app.get('env') === 'development') { // export NODE_ENV='production'
//   app.use(custom);
//   debug('Morgan enabled...');
// }

// LOAD API ROUTES
app.use('/', home);
app.use('/courses', courses);

// START SERVER
app.listen(port, () => console.log(`Listening on port ${port}...`));


// // APP DEPENDENCIES
// const debug = require('debug')('app:startup'); // export DEBUG=app:startup
// const helmet = require('helmet');
// const morgan = require('morgan');
// const config = require('config');
// const Joi = require('joi');
// const express = require('express');

// const middleware = require('./customMiddleware');

// // SETUP
// const app = express();
// const port = process.env.PORT || 3000;


// // DATA MODELS
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


// // CONFIGURATION
// debug(`Application Name: "${config.get('name')}"`);

// // LOAD MIDDLEWARE
// app.use(express.json()); // allows us to use 'req.body'
// app.use(helmet());
// app.use(morgan(':remote-addr - :method :url :status :res[content-length] - :response-time ms'));

// // set env:    $ export NODE_ENV='production'
// if (app.get('env') === 'development') {
//   app.use(middleware);
//   debug('Morgan enabled...');
// }


// // API ROUTES
// app.get('/', (req, res) => res.send('Hello World!'));

// app.get('/courses', (req, res) => res.send(courses));

// app.get('/courses/:id/:name', (req, res) => res.send([req.params, req.query]));

// app.get('/courses/:id', (req, res) => {
//   const course = courses.find(c => c.id === parseInt(req.params.id, 10));
//   if (!course) return res.status(404).send('The course with the given ID was not found.');

//   return res.send(course);
// });

// app.post('/courses', (req, res) => {
//   const { error } = validateCourse(req.body);
//   if (error) return res.status(400).send(error.details[0].message);

//   const course = {
//     id: courses.length + 1,
//     name: req.body.name,
//   };

//   courses.push(course);
//   return res.status(201).send(course);
// });

// app.put('/courses/:id', (req, res) => {
//   const course = courses.find(c => c.id === parseInt(req.params.id, 10));
//   if (!course) return res.status(404).send('The course with the given ID was not found.');

//   const { error } = validateCourse(req.body);
//   if (error) return res.status(400).send(error.details[0].message);

//   course.name = req.body.name;
//   return res.send(course);
// });

// app.delete('/courses/:id', (req, res) => {
//   const course = courses.find(c => c.id === parseInt(req.params.id, 10));
//   if (!course) return res.status(404).send('The course with the given ID was not found.');

//   const index = courses.indexOf(course);
//   courses.splice(index, 1);

//   return res.send(course);
// });


// // START SERVER
// app.listen(port, () => console.log(`Listening on port ${port}...`));

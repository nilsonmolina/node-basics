const config = require('config');
const debug = require('debug')('app:startup'); // export DEBUG=app:startup or export DEBUG=app:*
const helmet = require('helmet');
const morgan = require('morgan');
const logger = require('./middleware/logger');
const authenticate = require('./middleware/authenticate');
const home = require('./routes/home');
const courses = require('./routes/courses');
const express = require('express');
const app = express();

app.set('view engine', 'pug');
app.set('views', './views'); // default

// MIDDLEWARE
app.use(express.json());
app.use(express.static('public'));
app.use(helmet());
if (app.get('env') === 'development') {
    app.use(morgan('short'));
    debug('Morgan enabled...');
}
// CUSTOM MIDDLEWARE
app.use(logger);
app.use(authenticate);

// CONFIGURATION
console.log(`Application Name: ${config.get('name')}`);
console.log(`Mail Server: ${config.get('mail.host')}`);
console.log(`Mail Password: ${config.get('mail.password')}`);

// ROUTES
app.use('/api/courses', courses);
app.use('/', home);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
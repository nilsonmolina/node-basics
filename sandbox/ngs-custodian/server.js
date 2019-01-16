// APP DEPENDENCIES
const morgan = require('morgan');
const express = require('express');

const files = require('./routes/files');

// SETUP
const app = express();
const port = process.env.PORT || 3000;

// LOAD MIDDLEWARE
app.use(express.json());
app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));
// app.use(morgan(':remote-addr - :method :url :status :res[content-length] - :response-time ms'));

// LOAD API ROUTES
app.use(express.static('public'));
app.use('/api/files', files);

// START SERVER
app.listen(port, () => console.log(`Listening on port ${port}...`));

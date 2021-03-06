const genres = require('./routes/genres');
const express = require('express');
const app = express();

// MIDDLEWARE
app.use(express.json());

// ROUTES
app.use('/api/genres', genres);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
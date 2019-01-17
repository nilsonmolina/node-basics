const { Pool } = require('pg');

const pool = new Pool({
  host: 'localhost',
  port: 5432,
  user: 'nilsonmolina',
  password: '',
  database: 'node-sandbox',
});

module.exports = {
  query: (text, params) => pool.query(text, params),
};

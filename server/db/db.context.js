const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.POSTGRES_CONNECTION_STRING
});

module.exports = {
  query: (text, params, callback) => {
    return pool.query(text, params, callback);
  }
};

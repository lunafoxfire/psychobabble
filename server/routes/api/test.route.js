var express = require('express');
var router = express.Router();

var db = require('../../db/db.context');

// GET /api/test
router.get('/', (req, res) => {
  res.send("Hello from our Express API");
});

// GET /api/test/db-time-query
router.get('/db-time-query', (req, res) => {
  db.query('SELECT NOW()', null, (err, res) => {
    if (err) { }
    else {
      console.log(res.rows[0].now);
    }
  });
});

module.exports = router;

var express = require('express');
var router = express.Router();

// GET /api/test
router.get('/', (req, res) => {
  res.send("Hello from our Express API");
});

// GET /api/test/db-time-query
router.get('/db-time-query', (req, res) => {
  res.send("Hello from our Express API");
});

module.exports = router;

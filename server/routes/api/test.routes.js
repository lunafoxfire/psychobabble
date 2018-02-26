var express = require('express');
var router = express.Router();
var testCtrl = require('../../controllers/test.controller');

// GET /api/test
router.get('/', (req, res) => {
  res.send("Hello from our Express API");
});

// GET /api/test/db-time-query
router.get('/db-time-query', (req, res) => {
  testCtrl.getTime().then(
    (time) => {
      res.send(time);
    },
    (err) => {
      // Error handling would go here
    }
  );
});

module.exports = router;

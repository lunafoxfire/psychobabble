var express = require('express');
var router = express.Router();

// Test route
router.get('/test', (req, res) => {
  res.send("Hello from our Express API");
});

module.exports = router;

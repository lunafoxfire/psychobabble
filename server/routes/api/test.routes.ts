var express = require('express');
var router = express.Router();
import { TestController } from '../../controllers/test.controller';

let testCtrl = new TestController();

// GET /api/test
router.get('/', (req, res) => {
  res.send("Hello from our Express API");
});

// GET /api/test/db-time-query
router.get('/db-time-query', (req, res) => {
testCtrl.getTime()
  .then((time) => {
    res.send(time);
  });
});

module.exports = router;

import * as express from 'express';
import { TestController } from '../../controllers/test.controller';

let testCtrl = new TestController();

export let router = express.Router();

// GET /api/test
router.get('/', (req, res) => {
  res.send("Hello from our Express API");
});

// GET /api/test/db-time-query
router.get('/db-time-query', (req, res) => {
  testCtrl.getTime()
    .then((time) => {
      res.send(time);
    })
    .catch((err) => {
      console.log(err);
    });
});

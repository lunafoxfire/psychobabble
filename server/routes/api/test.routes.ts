import * as express from 'express';
import { TestController } from '../../controllers/test.controller';

export let router = express.Router();

// GET /api/test
router.get('/', TestController.getTestMessage);

// GET /api/test/db-time-query
router.get('/db-time-query', TestController.getTimeFromDb);

import * as express from 'express';
import { auth } from './../../config/auth';
import { TestController } from './../../controllers/test.controller';

export let router = express.Router();

// GET /api/test
router.get('/', TestController.getTestMessage);

// GET /api/test/db-time-query
router.get('/db-time-query', TestController.getTimeFromDb);

// GET /api/test/auth-test
router.get('/auth-test', TestController.getTestUserData);

router.get('/pc', TestController.pc);

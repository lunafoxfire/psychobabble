import * as express from 'express';
import { AuthController } from './../../controllers/auth.controller';

export let router = express.Router();

// POST /api/auth/client/register
// Params: username, email, password
router.post('/client/register', AuthController.registerClient);

// POST /api/auth/login
// Params: loginName, password
router.post('/login', AuthController.loginLocal);

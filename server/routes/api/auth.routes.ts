import * as express from 'express';
import { AuthController } from './../../controllers/auth.controller';

export let router = express.Router();

// POST /api/auth/client/register
// Params: email, password
router.post('/client/register', AuthController.registerClient);

// POST /api/auth/login
router.post('/login', AuthController.loginLocal);

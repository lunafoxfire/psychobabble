import * as express from 'express';
import { auth } from './../../config/auth';
import { AuthController } from './../../controllers/auth.controller';

// prefix: /api/auth/...
export let router = express.Router();

// POST /api/auth/client/register
// params: username, email, password
// Registers a new user as a client
router.post('/client/register', AuthController.registerClient);

// POST /api/auth/login
// params: loginName, password
// Logs a user in
router.post('/login', AuthController.loginLocal);

// POST /api/auth/verify
// params: code
// auth: logged in
// Attempts to verify a user's email with the provided code
router.post('/verify', auth, AuthController.verifyUser);

//POST /api/auth/reset
// Params: email
router.post('/reset', AuthController.sendReset);

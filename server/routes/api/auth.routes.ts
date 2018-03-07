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

// POST /api/auth/re-verify
// params: code
// auth: logged in
// Attempts to re-send the verification email
router.get('/re-verify', auth, AuthController.resendVerification);

// POST /api/auth/reset
// Params: email
// Attempts to send a password reset email to the email entered
router.post('/reset', AuthController.sendReset);

// POST /api/auth/change-password
// Params: newPass, userId
// Attempts to change users password to the one entered
router.post('/change-password', AuthController.passChange);

// POST /api/auth/resend
// Params: userId
// Attempts to resend password reset email
router.post('/resend', AuthController.resendResetEmail);

import * as express from 'express';
import { auth } from './../../config/auth';
import { AuthController } from './../../controllers/auth.controller';

// prefix: /api/auth/...
export function loadRoutes() {
  let router = express.Router();
  let authCtrl = new AuthController();

  // POST /api/auth/client/register
  // params: username, email, password
  // Registers a new user as a client
  router.post('/client/register', authCtrl.registerClient);

  // Post /api/auth/subject/register
  // params: username, email, password
  // Registers a new user as a subject
  router.post('/subject/register', authCtrl.registerSubject);

  // Post /api/auth/admin/register
  // params: email
  // Registers a new admin
  router.post('/admin/register', authCtrl.registerAdmin);

  // Post /api/auth/admin/change
  // params: username, email, password
  // Changes admins credentials
  router.post('/admin/change', auth, authCtrl.changeAdmin);

  // POST /api/auth/login
  // params: loginName, password
  // Logs a user in
  router.post('/login', authCtrl.loginLocal);

  // POST /api/auth/verify
  // params: code
  // auth: logged in
  // Attempts to verify a user's email with the provided code
  router.post('/verify', auth, authCtrl.verifyUser);

  // POST /api/auth/verify
  // params: code
  // auth: logged in
  // Attempts to verify a user's email with the provided code
  router.post('/verify-admin', auth, authCtrl.verifyAdmin);

  // POST /api/auth/re-verify
  // params: code
  // auth: logged in
  // Attempts to re-send the verification email
  router.get('/re-verify', auth, authCtrl.resendVerification);

  // POST /api/auth/reset
  // Params: email
  // Attempts to send a password reset email to the email entered
  router.post('/reset', authCtrl.sendResetEmail);

  // POST /api/auth/change-password
  // Params: newPass, userId
  // Attempts to change users password to the one entered
  router.post('/change-password', authCtrl.passChange);

  // POST /api/auth/resend
  // Params: userId
  // Attempts to resend password reset email
  router.post('/resend', authCtrl.resendResetEmail);

  return router;
}

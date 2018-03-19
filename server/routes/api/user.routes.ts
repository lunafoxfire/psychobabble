import * as express from 'express';
import { auth } from './../../config/auth';
import { UserController } from './../../controllers/user.controller';

// prefix: /api/users/...
export function loadRoutes() {
  let router = express.Router();
  let userCtrl = new UserController();

  // GET /api/users/profile
  // auth: logged-in
  // Get user info for profile page
  router.get('/profile', auth, userCtrl.getProfile);

  // GET /api/users/get-clients
  // auth: ADMIN
  // Get all clients for admin
  router.get('/get-clients', auth, userCtrl.getClients);

  // GET /api/users/:userId
  // auth: ADMIN
  // Get details of a specific client for admin
  router.get('/:clientId', auth, userCtrl.getClientDetails);

  return router;
}

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
  router.get('/profile', auth, (req, res) => {res.status(501).send()});

  // GET /api/users/get-clients
  // auth: ADMIN
  // Get all clients for admin
  router.get('/get-clients', auth, userCtrl.getClients);

  return router;
}

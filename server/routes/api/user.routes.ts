import * as express from 'express';
import { auth } from './../../config/auth';
import { UserController } from './../../controllers/user.controller';

// prefix: /api/users/...
export let router = express.Router();

// GET /api/users/:userId/profile
// auth: logged-in
// Get user info for profile page
router.get('/:userId/profile', auth, (req, res) => {res.status(501)});

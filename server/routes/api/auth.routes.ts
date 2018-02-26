import * as express from 'express';
import { AuthController } from '../../controllers/auth.controller';

let authCtrl = new AuthController();

export let router = express.Router();

// GET /api/auth/register
router.post('/register', (req, res) => {
  // Register logic
});

// GET /api/auth/login
router.post('/login', (req, res) => {
  // Login logic
});

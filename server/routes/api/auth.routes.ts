import * as express from 'express';
import { AuthController } from './../../controllers/auth.controller';
import { auth } from './../../config/auth';

export let router = express.Router();

// POST /api/auth/client/register
// Params: username, email, password
router.post('/client/register', AuthController.registerClient);

// POST /api/auth/login
// Params: loginName, password
router.post('/login', AuthController.loginLocal);

//POST /api/auth/verify
// Params: code
router.post('/verify', auth, AuthController.verifyUser);

//Post /api/auth/upload
// Params: null
router.post('/upload', auth, AuthController.getBucket);

//Post /api/auth/videos
// Params: url
router.post('/video', auth, AuthController.uploadVideo);

import * as express from 'express';
import { router as authRoutes } from './auth.routes';
import { router as requestRoutes } from './program-request.routes';
import { router as programRoutes } from './program.routes';
import { router as responseRoutes } from './response.routes';
import { router as userRoutes } from './user.routes';
import { router as videoRoutes } from './video.routes';

// prefix: /api/...
export let router = express.Router();

router.use('/auth', authRoutes);
router.use('/program-requests', requestRoutes);
router.use('/programs', programRoutes);
router.use('/responses', responseRoutes);
router.use('/users', userRoutes);
router.use('/videos', videoRoutes);

import * as express from 'express';
import { router as authRoutes } from './auth.routes';
import { router as testRoutes } from './test.routes';

export let router = express.Router();
router.use('/auth', authRoutes);
router.use('/test', testRoutes);

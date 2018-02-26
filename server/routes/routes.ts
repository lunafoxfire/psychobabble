import * as express from 'express';
import { router as apiRoutes } from './api/api.routes';

export let router = express.Router();
router.use('/api', apiRoutes);

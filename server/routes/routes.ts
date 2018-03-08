import * as express from 'express';
import { router as apiRoutes } from './api/api.routes';

export let router = express.Router();
router.get('/test-route', (req, res) => {res.status(200).json({message: "hello route-testing world"})});
router.get('/test-route-2', (req, res) => {res.status(200).json({message: "beep boop"})});
router.use('/api', apiRoutes);

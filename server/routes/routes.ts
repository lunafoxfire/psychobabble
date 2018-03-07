import * as express from 'express';
import { router as apiRoutes } from './api/api.routes';

export let router = express.Router();
router.get('/test-route', (req, res) => {res.status(200).json({message: "hello route-testing world"})});
router.use('/api', apiRoutes);

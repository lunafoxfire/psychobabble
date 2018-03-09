import * as express from 'express';
import { loadRoutes as loadApiRoutes } from './api/api.routes';

export function loadRoutes() {
  let router = express.Router();

  router.get('/test-route', (req, res) => {res.status(200).json({message: "hello route-testing world"})});
  router.get('/test-route-2', (req, res) => {res.status(200).json({message: "beep boop"})});
  router.use('/api', loadApiRoutes());

  return router;
}

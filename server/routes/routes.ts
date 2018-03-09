import * as express from 'express';
import { loadRoutes as loadApiRoutes } from './api/api.routes';

export function loadRoutes() {
  let router = express.Router();
  
  router.use('/api', loadApiRoutes());

  return router;
}

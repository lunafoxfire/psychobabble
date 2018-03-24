import * as express from 'express';
import { loadRoutes as loadAuthRoutes } from './auth.routes';
import { loadRoutes as loadRequestRoutes } from './program-request.routes';
import { loadRoutes as loadProgramRoutes } from './program.routes';
import { loadRoutes as loadResponseRoutes } from './response.routes';
import { loadRoutes as loadUserRoutes } from './user.routes';
import { loadRoutes as loadVideoRoutes } from './video.routes';
import { loadRoutes as loadSoftSkillRoutes } from './soft-skill.routes';

// prefix: /api/...
export function loadRoutes() {
  let router = express.Router();

  router.use('/auth', loadAuthRoutes());
  router.use('/program-requests', loadRequestRoutes());
  router.use('/programs', loadProgramRoutes());
  router.use('/responses', loadResponseRoutes());
  router.use('/users', loadUserRoutes());
  router.use('/videos', loadVideoRoutes());
  router.use('/soft-skills', loadSoftSkillRoutes());

  return router;
}

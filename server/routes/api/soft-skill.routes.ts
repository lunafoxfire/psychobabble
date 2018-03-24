import * as express from 'express';
import { SoftSkillController } from './../../controllers/soft-skill.controller';

// prefix: /api/soft-skills/...
export function loadRoutes() {
  let router = express.Router();
  let softSkillCtrl = new SoftSkillController();

  // GET /api/soft-skills/get-all
  // Gets all soft skills
  router.get('/get-all', softSkillCtrl.getAll);

  return router;
}

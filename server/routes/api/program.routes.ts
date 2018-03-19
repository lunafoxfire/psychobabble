import * as express from 'express';
import { auth } from './../../config/auth';
import { ProgramController } from './../../controllers/program.controller';

// prefix: /api/programs/...
export function loadRoutes() {
  let router = express.Router();
  let programCtrl = new ProgramController();

  // POST /api/programs/new
  // auth: ADMIN
  // Route for an admin to create a new program for a client
  router.post('/new', auth, programCtrl.makeProgram);

  // GET /api/programs/get-all
  // auth: ADMIN
  // Get all programs for clients (paginated)
  router.get('/get-all', auth, programCtrl.getAllPrograms);

  // GET /api/programs/:programId/get-video
  // auth: SUBJECT
  // Get a video for subject evaluation (paginated)
  router.get('/:programId/get-video', auth, programCtrl.getCurrentVideo);

  // GET /api/programs/client/:programId
  // auth: CLIENT
  // Get the details and results of a particular program for this client
  router.get('/client/:programId', auth, programCtrl.getProgramDetails);

  // GET /api/programs/admin/:programId
  // auth: CLIENT
  // Get the details and results of a particular program for this client
  router.get('/:clientId/:programId', auth, programCtrl.getProgramDetailsAdmin);

  // GET /api/programs/:clientId
  // params: page
  // auth: CLIENT
  // Get all programs created for this client, by page
  router.get('/:clientId', auth, programCtrl.getClientPrograms);

  return router;
}

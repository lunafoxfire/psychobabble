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
  router.post('/new', auth, (req, res) => {res.status(501)});

  // GET /api/programs/:clientId
  // params: page
  // auth: CLIENT
  // Get all programs created for this client, by page
  router.get('/:clientId', auth, (req, res) => {res.status(501)});

  // GET /api/programs/:clientId/:programId
  // auth: CLIENT
  // Get the details and results of a particular program for this client
  router.get('/:clientId/:programId', auth, (req, res) => {res.status(501)});

  return router;
}

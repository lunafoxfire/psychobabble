import * as express from 'express';
import { auth } from './../../config/auth';
import { ProgramRequestController } from './../../controllers/program-request.controller';

// prefix: /api/program-requests/...
export function loadRoutes() {
  let router = express.Router();
  let requestCtrl = new ProgramRequestController();

  // GET /api/program-requests/pending
  // params: page
  // auth: ADMIN
  // Get all unfufilled requests for admin feed, by page
  router.get('/pending', auth,(req, res) => {res.status(501).send("a;sdjf;asdjf")});

  // GET /api/program-requests/get-soft-skills
  // Gets all soft skills for request form
  router.get('/get-soft-skills', requestCtrl.getAllSoftSkills);

  // POST /api/program-requests/make-request
  // params: nameArray
  // auth: CLIENT
  // Make Program Request
  router.post('/make-request', auth, requestCtrl.makeProgramRequest);

  // GET /api/program-requests/:requestId
  // auth: ADMIN
  // Get details of a particular request
  router.get('/:requestId(\\d+)', auth, (req, res) => {res.status(501).send()});

  // GET /api/program-requests/pending/:clientId
  // params: page
  // auth: CLIENT
  // List all unfufilled requests for client feed, by page
  router.get('/pending/:clientId(\\d+)', auth, (req, res) => {res.status(501).send()});

  // POST /api/program-requests/:clientId/submit
  // auth: CLIENT
  // Route for a client to submit a new request
  router.post('/:clientId(\\d+)/submit', auth, (req, res) => {res.status(501).send()});

  // GET /api/program-requests/:clientId/:requestId
  // auth: CLIENT
  // Get client-viewable details of a particular request
  router.get('/:clientId(\\d+)/:requestId(\\d+)', auth, (req, res) => {res.status(501).send()});

  // POST /api/program-requests/:clientId/:requestId/cancel
  // auth: CLIENT
  // Route for a client to cancel a pending request
  router.post('/:clientId(\\d+)/:requestId(\\d+)/cancel', auth, (req, res) => {res.status(501).send()});


  return router;
}

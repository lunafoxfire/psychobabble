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
  router.get('/pending', auth, requestCtrl.getAllRequests);

  // GET /api/program-requests/get-soft-skills
  // Gets all soft skills for request form
  router.get('/get-soft-skills', requestCtrl.getAllSoftSkills);

  // POST /api/program-requests/make-request
  // params: request
  // auth: CLIENT
  // Route for a client to submit a new request
  router.post('/make-request', auth, requestCtrl.makeProgramRequest);

  // GET /api/program-requests/client/pending/
  // params: page
  // auth: CLIENT
  // List all unfufilled requests for client feed, by page
  router.get('/client/pending', auth, requestCtrl.getPendingClientRequests);

  // POST /api/program-requests/:clientId/:requestId/cancel
  // auth: CLIENT
  // Route for a client to cancel a pending request
  router.post('/client/:requestId/cancel', auth, (req, res) => {res.status(501).send()});

  // GET /api/program-requests/client/:requestId
  // auth: CLIENT
  // Get client-viewable details of a particular request
  router.get('/client/:requestId', auth, requestCtrl.getClientRequestDetails);

  // GET /api/program-requests/client/:requestId
  // auth: CLIENT
  // Get client-viewable details of a particular request
  router.get('/admin/:requestId', auth, requestCtrl.getClientRequestDetailsAdmin);

  // GET /api/program-requests/:requestId
  // params: requestId
  // auth: ADMIN
  // Get details of a particular request
  router.get('/:requestId', auth, requestCtrl.getRequestDetails);

  return router;
}

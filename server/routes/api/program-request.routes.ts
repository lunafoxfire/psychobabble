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
  router.get('/pending', auth, (req, res) => {res.status(501).send()});

  // GET /api/program-requests/:requestId
  // auth: ADMIN
  // Get details of a particular request
  router.get('/:requestId', auth, (req, res) => {res.status(501).send()});

  // GET /api/program-requests/pending/:clientId
  // params: page
  // auth: CLIENT
  // List all unfufilled requests for client feed, by page
  router.get('/pending/:clientId', auth, (req, res) => {res.status(501).send()});

  // POST /api/program-requests/:clientId/submit
  // auth: CLIENT
  // Route for a client to submit a new request
  router.post('/:clientId/submit', auth, (req, res) => {res.status(501).send()});

  // GET /api/program-requests/:clientId/:requestId
  // auth: CLIENT
  // Get client-viewable details of a particular request
  router.get('/:clientId/:requestId', auth, (req, res) => {res.status(501).send()});

  // POST /api/program-requests/:clientId/:requestId/cancel
  // auth: CLIENT
  // Route for a client to cancel a pending request
  router.post('/:clientId/:requestId/cancel', auth, (req, res) => {res.status(501).send()});

  // GET /api/program-requests/get-soft-skills
  // auth: CLIENT
  // Gets all soft skills for request form
  router.get('/get-soft-skills', (req, res) => {res.status(501).send()});

  return router;
}

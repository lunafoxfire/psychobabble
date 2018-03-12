import * as express from 'express';
import { auth } from './../../config/auth';
import { ResponseController } from './../../controllers/response.controller';

// prefix: /api/responses/...
export function loadRoutes() {
  let router = express.Router();
  let responseCtrl = new ResponseController();

  // GET /api/responses/pending
  // params: page
  // auth: ADMIN
  // Get all unanalyzed responses for admin feed, by page
  router.get('/pending', auth, (req, res) => {res.status(501).send()});

  // GET /api/responses/:responseId
  // auth: ADMIN
  // Get details of a particular response
  router.get('/:responseId', auth, (req, res) => {res.status(501).send()});

  // POST /api/responses/submit
  // auth: SUBJECT
  // Route for a subject to submit a response to a video
  router.post('/submit', auth, (req, res) => {res.status(501).send()});

  return router;
}

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

  // POST /api/responses/initialize
  // auth: SUBJECT
  // params: videoId, programId
  // Route for a subject to begin the response process
  router.post('/initialize', auth, responseCtrl.beginResponseProcess);

  // GET /api/responses/generate-audio-url
  // auth: SUBJECT
  // params: responseId
  // Gets audio url to save the Subject's recording
  router.get('/generate-audio-url', auth, responseCtrl.generateAudioUrl);

  // POST /api/responses/save-success
  // auth: SUBJECT
  // params: responseId
  // Called when the client successfully saves the audio to the S3 bucket
  router.post('/save-success', auth, responseCtrl.responseCreationSuccess);

  // POST /api/responses/save-failed
  // auth: SUBJECT
  // params: responseId
  // Called if the client fails when saving the audio to the S3 bucket
  router.post('/save-failed', auth, responseCtrl.responseCreationFail);

  // GET /api/responses/:responseId
  // auth: ADMIN
  // Get details of a particular response
  router.get('/:responseId', auth, (req, res) => {res.status(501).send()});

  return router;
}

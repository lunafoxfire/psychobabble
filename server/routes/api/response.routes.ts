import * as express from 'express';
import { auth } from './../../config/auth';
import { ResponseController } from './../../controllers/response.controller';

// prefix: /api/responses/...
export let router = express.Router();

// GET /api/responses/pending
// params: page
// auth: ADMIN
// Get all unanalyzed responses for admin feed, by page
router.get('/pending', auth, (req, res) => {res.status(501)});

// GET /api/responses/:responseId
// auth: ADMIN
// Get details of a particular response
router.get('/:responseId', auth, (req, res) => {res.status(501)});

// POST /api/responses/submit
// auth: SUBJECT
// Route for a subject to submit a response to a video
router.post('/submit', auth, (req, res) => {res.status(501)});

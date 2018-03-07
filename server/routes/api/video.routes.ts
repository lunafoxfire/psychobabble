import * as express from 'express';
import { auth } from './../../config/auth';
import { VideoController } from './../../controllers/video.controller';

// prefix: /api/videos/...
export let router = express.Router();

// GET /api/videos/
// params: page
// auth: ADMIN
// Get list of videos for admin, by page
router.get('/', auth, (req, res) => {res.status(501)});

// POST /api/videos/generate-video-url
// auth: ADMIN
// Creates a new S3 bucket URL with policy and sends it to the user
router.post('/generate-video-url', auth, VideoController.generateVideoUrl);

// POST /api/videos/upload
// params: url, videoId
// auth: ADMIN
// Saves a video to the database using the previously generated URL
router.post('/upload', auth, VideoController.uploadVideo);

import * as express from 'express';
import { router as authRoutes } from './auth.routes';
import { router as testRoutes } from './test.routes';
import { ApiController } from './../../controllers/sendgrid.controller';

export let router = express.Router();
router.use('/auth', authRoutes);
router.use('/test', testRoutes);

//sendgrid api stuff
router.use('/sendMail', ApiController.sendTokenMail);

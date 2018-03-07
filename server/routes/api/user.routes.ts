import * as express from 'express';
import { auth } from './../../config/auth';
import { UserController } from './../../controllers/user.controller';

export let router = express.Router();

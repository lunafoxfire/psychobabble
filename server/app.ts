import * as express from 'express';
import * as path from 'path';
import * as favicon from 'serve-favicon';
import * as logger from 'morgan';
import * as cookieParser from 'cookie-parser';
import * as bodyParser from 'body-parser';
import * as passport from 'passport';
import * as crypto from 'crypto';
import 'reflect-metadata';
import './config/config';
import './config/passport';
import { router } from './routes/routes';

import { createConnection } from 'typeorm';
import { User } from "./models/User";
import { Role, RoleName } from "./models/Role";


export let app = express();

// Get database connection and initialize data
createConnection()
  .then(async connection => {
    console.log("Successfully connected to the database.");
      Role.syncRolesToDbAsync();
      let admin = new User();
      admin.email = process.env.ADMIN_EMAIL;
      admin.normalized_email = process.env.ADMIN_EMAIL.toUpperCase();
      admin.salt = crypto.randomBytes(128).toString('hex');
      admin.hash = crypto.pbkdf2Sync(process.env.ADMIN_PASSWORD, admin.salt, 1000, 64, 'sha512').toString('hex');
      admin.date_created = new Date().getTime();
      admin.role = await connection.manager.getRepository(Role).findOne({name: RoleName.Admin});
      let finder = await connection.manager.getRepository(User).findOne({email:admin.email});
      if(!finder){
        await connection.manager.save(admin);
      }
  })
  .catch((err) => console.error("Error connecting to the database!\n" + err));

// Load middleware
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, '../dist'))); // Add Angular build folder to static files

// load api routes with passport
app.use(passport.initialize());
app.use(router);

// Load Angular and let it handle view routes
app.get('**', function(req, res, next) {
  // If not AJAX request
  if (!(req.xhr || req.headers.accept.indexOf('json') > -1)) {
    res.sendfile('./dist/index.html');
  }
  else {
    next();
  }
});

// ===== Error handling ===== //
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  let err = new Error('The requested route could not be found');
  err["status"] = 404;
  next(err);
});

// Error handler
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.json({"message" : err.name + ": " + err.message});
});

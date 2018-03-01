import * as express from 'express';
import * as path from 'path';
import * as favicon from 'serve-favicon';
import * as logger from 'morgan';
import * as cookieParser from 'cookie-parser';
import * as bodyParser from 'body-parser';
import * as passport from 'passport';
import * as crypto from 'crypto';
import * as cors from 'cors';
import 'reflect-metadata';
import './config/config';
import './config/passport';
import { router } from './routes/routes';
import { createConnection } from 'typeorm';
import { User } from "./models/User";
import { Role, RoleName } from "./models/Role";


export let app = express();

// Get database connection and initialize data
console.log("Connecting to the database...");
createConnection()
  .then(async connection => {
    await Role.syncRolesToDbAsync();
    await User.generateDefaultAdminIfNoAdminAsync();
    console.log("Successfully connected to the database.");
  })
  .catch((err) => console.error("Error connecting to the database!\n" + err));

// Load middleware
app.use(cors());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, '../dist')));
// Add Angular build folder to static files

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

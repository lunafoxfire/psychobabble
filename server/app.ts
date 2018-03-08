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
import { User } from './models/User';
import { Role, RoleType } from './models/Role';
import { SoftSkill, SoftSkillType } from './models/SoftSkill';
import { Tag, TagType } from './models/Tag';

console.log(
`===============================
==           WELCOME         ==
===============================`
);
console.log(`Node environment: ${process.env.NODE_ENV}\n`);

export let app = express();

// Get database connection and initialize data
console.log("Connecting to the database...");
createConnection()
  .then(async connection => {
    await Role.syncRolesToDbAsync();
    await SoftSkill.syncSoftSkillsToDbAsync();
    await Tag.syncTagsToDbAsync();
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
app.use(express.static(path.join(__dirname, '../dist'))); // Add Angular build folder to static files

// Load api routes with passport
app.use(passport.initialize());
app.use(router);

// Load Angular and let it handle view routes
app.get('**', function(req, res, next) {
  // If not AJAX request
  if (!(req.xhr || req.headers.accept.indexOf('json') > -1)) {
    let indexPage = path.join(__dirname, '../dist/index.html');
    res.sendFile(indexPage, (err) => {
      if (err) {
        let errMsg = "index.html could not be found!";
        console.error(errMsg);
        res.status(500);
        res.send(errMsg);
      }
    });
  }
  else {
    next();
  }
});

// ===== Error handling ===== //
// Catch 404 and forward to error handler
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

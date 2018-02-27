import * as express from 'express';
import * as path from 'path';
import * as favicon from 'serve-favicon';
import * as logger from 'morgan';
import * as cookieParser from 'cookie-parser';
import * as bodyParser from 'body-parser';
import 'reflect-metadata';

import './config/config';
import { createConnection } from 'typeorm';
import { router } from './routes/routes';
const crypto = require('crypto');
import { Users } from "./models/Users";
import { Roles } from "./models/Roles";
export let app = express();

// Get database connection
createConnection()
  .then(async connection => {
    console.log("Successfully connected to the database.");
    let role1 = new Roles();
    role1.name = "Admin";
    let role2 = new Roles();
    role2.name = "Employer";
    let role3 = new Roles();
    role3.name = "User";
    let role1finder = await connection.manager.getRepository(Roles).findOne({name:role1.name});
    let role2finder = await connection.manager.getRepository(Roles).findOne({name:role2.name});
    let role3finder = await connection.manager.getRepository(Roles).findOne({name:role3.name});
    if(!role1finder && !role2finder && !role3finder) {
      console.log("%%%%%%%%%%%%%%%%%%%%Hello");
      await connection.manager.save(role1);
      await connection.manager.save(role2);
      await connection.manager.save(role3);
    }
    let admin = new Users();
    admin.email = process.env.ADMIN_EMAIL;
    admin.salt = crypto.randomBytes(128).toString('hex');
    admin.hash = crypto.pbkdf2Sync(process.env.ADMIN_PASSWORD, admin.salt, 1000, 64, 'sha512').toString('hex');
    admin.role = role1;
    let finder = await connection.manager.getRepository(Users).findOne({email:admin.email});
    if(!finder){
      console.log("############HI")
      await connection.manager.save(admin);
    }
  })
  .catch((err) => console.error("Error connecting to the database!\n" + err));

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, '../dist'))); // Add Angular build folder to static files

// load api routes
app.use(router);

// Load Angular and let it handle view routes
app.get('*', function(req, res) {
  if (req.accepts('html')) {
    res.sendfile('./dist/index.html');
  }
});

// TODO: Log errors to console instead of rendering view
// ==================================================================
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  let err = new Error('Not Found');
  err["status"] = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

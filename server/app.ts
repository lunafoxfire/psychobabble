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

export let app = express();

// Get database connection
createConnection()
  .then(() => console.log("Successfully connected to the database."))
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

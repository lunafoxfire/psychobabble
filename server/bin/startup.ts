#!/usr/bin/env node
import * as http from 'http';
import { app } from '../app';
import * as getDebug from 'debug';
let debug = getDebug('expresstest:server');


app.then((app) => {
  let port = normalizePort(process.env.SERVER_PORT);
  app.set('port', port);
  let server = http.createServer(app);

  server.listen(port);
  server.on('error', onError);
  server.on('listening', onListening);


  // Normalize a port into a number, string, or false.
  function normalizePort(val) {
  let port = parseInt(val, 10);
  if (isNaN(port)) { // Is named pipe
    return val;
  }
  if (port >= 0) { // Is port number
    return port;
  }
  return false;
}

// Event listener for HTTP server "error" event.
function onError(error) {
if (error.syscall !== 'listen') {
  throw error;
}
let bind = typeof port === 'string'
? 'Pipe ' + port
: 'Port ' + port;

switch (error.code) { // Friendly messages for listen errors
  case 'EACCES':
  console.error(bind + ' requires elevated privileges');
  process.exit(1);
  break;
  case 'EADDRINUSE':
  console.error(bind + ' is already in use');
  process.exit(1);
  break;
  default:
  throw error;
}
}

// Event listener for HTTP server "listening" event.
function onListening() {
let addr = server.address();
let bind = typeof addr === 'string'
? 'pipe ' + addr
: 'port ' + addr.port;
console.log('\nListening on ' + bind + '\n');
}

})

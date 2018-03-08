import * as http from 'http';
import { App } from '../app';
import * as getDebug from 'debug';
let debug = getDebug('expresstest:server');

App.initAsync()
  .then((app) => {
    app.set('port', process.env.SERVER_PORT);
    let server = http.createServer(app);

    server.listen(process.env.SERVER_PORT);
    server.on('error', onError);
    server.on('listening', onListening);
  })
  .catch((err) => {
    console.error("I just don't know what went wrong...");
    console.error(err);
  });

function onError(err) {
  if (err.syscall !== 'listen') {
    throw err;
  }
  // Friendly messages for listen errors
  switch (err.code) {
    case 'EACCES':
      console.error(`Port ${process.env.SERVER_PORT} requires elevated privileges`);
      process.exit(1);
    break;
    case 'EADDRINUSE':
      console.error(`Port ${process.env.SERVER_PORT} is already in use`);
      process.exit(1);
    break;
    default:
      throw err;
  }
}

function onListening() {
  console.log(`Listening on port ${process.env.SERVER_PORT}...`);
}

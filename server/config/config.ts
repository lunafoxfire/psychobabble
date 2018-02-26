let secrets = null;
try {
  secrets = require('../../secrets.json');
}
// JavaScript apparently can't do inner exceptions, so you get this instead.
catch (e) {
  console.error("Could not load secrets.json. This file is required in the root directory and may be missing. See documentation for details.\n");
  throw e;
}

// Node settings
process.env.NODE_ENV = process.env.NODE_ENV || 'development';
process.env.SERVER_PORT = process.env.SERVER_PORT || '3000';

// Database settings
process.env.POSTGRES_CONNECTION_STRING = secrets.POSTGRES_CONNECTION_STRING;

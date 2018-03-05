// Node settings
process.env.NODE_ENV = process.env.NODE_ENV || 'development';
process.env.SERVER_PORT = process.env.SERVER_PORT || '3000';

// Database options
process.env.DATABASE_GENERATE_TEST_DATA = 'false';

// Load secrets.json
let secrets = null;
try {
  secrets = require('../../secrets.json');
}
catch (e) {
  console.error("Could not load secrets.json. This file is required in the root directory and may be missing. See documentation for details.\n");
  throw e; // JavaScript apparently can't do inner exceptions, so you get this instead.
}

// Assign all secrets to environment variables
Object.keys(secrets).forEach((key) => {
  process.env[key] = secrets[key];
});

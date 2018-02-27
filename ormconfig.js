let secrets = null;
try {
  secrets = require('./secrets.json');
} catch (err) {
  console.log("Could not load secrets.json. This file is required in the root directory and may be missing. See documentation for details.\n")
}

module.exports = {
   "type": "postgres",
   "url": secrets.POSTGRES_CONNECTION_STRING,
   "synchronize": false,
   "logging": false,
   "entities": [
      "server/models/**/*.ts"
   ],
   "migrations": [
      "server/migrations/**/*.ts"
   ],
   "subscribers": [
      "server/subscribers/**/*.ts"
   ],
   "cli": {
      "entitiesDir": "server/models",
      "migrationsDir": "server/migrations",
      "subscribersDir": "server/subscribers"
   }
}

let secrets = null;
try {
  secrets = require('./secrets.json');
} catch (err) {
  console.log("I don't even know how you managed to make this error, what are you, stupid?")
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
      "server/migration/**/*.ts"
   ],
   "subscribers": [
      "server/subscriber/**/*.ts"
   ],
   "cli": {
      "entitiesDir": "server/entity",
      "migrationsDir": "server/migration",
      "subscribersDir": "server/subscriber"
   }
}

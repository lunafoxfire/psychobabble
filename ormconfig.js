require('./server/config/config');

switch (process.env.NODE_ENV) {
  case "production":
      process.env.POSTGRES_PASSWORD = process.env.POSTGRES_PROD_PASSWORD;
      process.env.POSTGRES_DATABASE = process.env.POSTGRES_PROD_DATABASE;
    break;
  case "development":
      process.env.POSTGRES_PASSWORD = process.env.POSTGRES_DEV_PASSWORD;
      process.env.POSTGRES_DATABASE = process.env.POSTGRES_DEV_DATABASE;
    break;
  case "testing":
      process.env.POSTGRES_PASSWORD = process.env.POSTGRES_TEST_PASSWORD;
      process.env.POSTGRES_DATABASE = process.env.POSTGRES_TEST_DATABASE;
    break;
  default:
      console.warn("Current environment has no database credentials");
      process.env.POSTGRES_PASSWORD = null;
      process.env.POSTGRES_DATABASE = null;
}

module.exports = {
   "type": "postgres",
   "host": process.env.POSTGRES_HOST,
   "port": process.env.POSTGRES_PORT,
   "username": process.env.POSTGRES_USERNAME,
   "password": process.env.POSTGRES_PASSWORD,
   "database": process.env.POSTGRES_DATABASE,
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

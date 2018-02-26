var db = require('./db/db.context');

db.query('CREATE TABLE IF NOT EXISTS users (id serial, email varchar(255), salt varchar(255), hash varchar(255));', (err, res) =>
{
  console.log(err)
});

db.query("INSERT INTO users (id, email) VALUES (1, 'fake@gmail.com')", (err, res) => {
  console.log(err);
});

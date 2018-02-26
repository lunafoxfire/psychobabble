const typeorm = require("typeorm");
// models/entities required here

typorm.createConnection({
  url: process.env.POSTGRES_CONNECTION_STRING
}).then(function(connection) {
  console.log("Connection Worked");
}).catch(function(error) {
  console.log("error");
})

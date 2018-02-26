var db = require('../db/db.context');

// Resolve => database time
// Reject => err
module.exports.getTime = function() {
  return new Promise((resolve, reject) => {
    db.query('SELECT NOW()', null, (err, res) => {
      if (err) {
        reject(err);
      }
      else {
        resolve(res.rows[0].now)
      }
    });
  });
}

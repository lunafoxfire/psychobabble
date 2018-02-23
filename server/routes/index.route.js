var express = require('express');
var router = express.Router();
var apiRoutes = require('./api/api.route');

// Mount api routes
router.use('/api', apiRoutes);

module.exports = router;

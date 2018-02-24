var express = require('express');
var router = express.Router();
var apiRoutes = require('./api/api.route');

router.use('/api', apiRoutes);

module.exports = router;

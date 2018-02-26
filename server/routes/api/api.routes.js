var express = require('express');
var router = express.Router();
var testRoutes = require('./test.routes');

router.use('/test', testRoutes);

module.exports = router;

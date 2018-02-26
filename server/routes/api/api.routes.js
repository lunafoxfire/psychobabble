var express = require('express');
var router = express.Router();
var authRoutes = require('./auth.routes');
var testRoutes = require('./test.routes');

router.use('/auth', authRoutes);
router.use('/test', testRoutes);

module.exports = router;

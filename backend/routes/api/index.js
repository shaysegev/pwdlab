var router = require('express').Router();
var usersRouter = require('./users')

router.use('/users', usersRouter);

module.exports = router;

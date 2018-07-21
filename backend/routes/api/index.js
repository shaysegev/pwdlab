var router = require('express').Router();
var usersRouter = require('./users')
var recordsRouter = require('./records')

router.use('/users', usersRouter);
router.use('/records', recordsRouter);

module.exports = router;

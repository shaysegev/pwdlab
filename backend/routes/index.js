var router = require('express').Router();
var path = require('path');
var apiRouter = require('./api')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.sendFile(path.join(__dirname, '/..' + process.env.STATIC_FILES, 'index.html'));
});

router.use('/api', apiRouter);

module.exports = router;

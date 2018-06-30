var router = require('express').Router();

/* GET users listing. */
router.get('/', (req, res, next) => {
  res.send({name: 'shay', age: 30});
});

router.post('/', (req, res, next) => {
  res.send(req.body);
})

module.exports = router;

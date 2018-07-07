const router = require('express').Router();
const _ = require('lodash');
const authenticate = require('../../middleware/authenticate');
const User = require('../../models/user');

/* GET users listing. */
router.get('/', authenticate, (req, res, next) => {
  res.send({name: 'shay', age: 30});
});

router.post('/', async (req, res, next) => {
  const body = _.pick(req.body, ['email', 'password']);
  // 
  try {
    const user = await new User(body).save();
    console.log(user);
    
    const token = await user.generateAuthToken();
    res.header('authorization', token).send(user);
  } catch(e) {
    console.log(e);
    
    res.status(400).send(e);
  }
})

module.exports = router;

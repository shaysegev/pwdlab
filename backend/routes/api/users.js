const router = require('express').Router();
const _ = require('lodash');
const authenticate = require('../../middleware/authenticate');
const User = require('../../models/user');
const crypt = require('../../lib/crypt');

/* GET users listing. */
router.post('/me', authenticate, (req, res, next) => {  
  res.send({success: true, user: req.user});
});

router.post('/', async (req, res, next) => {
  const body = _.pick(req.body, ['email', 'password']);
  
  try {
    const user = await new User(body).save();
    const auth = await user.signUp();
    console.log(auth);
    
    res.header('authorization', auth.token).send({
      success: true,
      email: user.email,
      _id: user._id,
      key: auth.key
    });
  } catch(e) {   
    console.log(e);
    
    res.status(400).send(e);
  }
});

router.post('/verifyToken', async (req, res, next) => {
  const authToken = req.headers.authorization;
  console.log(authToken);
  
  try {
    const user = await User.findByToken(authToken);
    console.log(user);
    
    if (user) {
      res.send({success: true, user});
    }
  } catch (e) {
    // token expired?
    res.status(400).send({success: false});
    
  }
});

router.get('/test', async (req, res, next) => {
  const keys = crypt.generateKeys();
  res.send(keys)
})

router.post('/logout', async (req, res, next) => {

});

module.exports = router;

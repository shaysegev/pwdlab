const router = require('express').Router();
const _ = require('lodash');
const authenticate = require('../../middleware/authenticate');
const User = require('../../models/user');
const Crypt = require('../../models/crypt');
const cryptLib = require('../../lib/crypt');
const logger = require('../../logger');

router.post('/me', authenticate, async (req, res, next) => {  
  pubkey = await Crypt.getUserKey('pubkey', req.user);
  if (pubkey) {
    res.send({
      success: true,
      _id: cryptLib.encryptId(req.user._id),
      email: req.user.email,
      key: pubkey
    });
  } else {
    res.status(500).send({success: false});
  }
});

router.post('/', async (req, res, next) => {
  const body = _.pick(req.body, ['email', 'password']);
  try {
    // todo check if email not exist
    let user = new User(body);
    // const userExists = user.exists(); // todo
    const token = await user.generateAuthToken();
    // generate salt for hashing/encryption
    user.generateSalt();

    // Creating encryption keys
    // todo speed up registration by generating temp RSA keys on visit if user/token is not found
    const crypt = new Crypt();
    const pubkey = await crypt.createKeys(user);
    
    // Return if any of them failed!
    if (!pubkey || !token) {
      logger.error(`Couldn't create token or RSA keys`);
      return res.status(400).send({success: false});
    }

    // After everything is successfully stored
    await user.save();
    
    res.header('authorization', token).send({
      success: true,
      email: user.email,
      _id: cryptLib.encryptId(user._id),
      key: pubkey
    });
  } catch(e) {
    res.status(400).send({success: false});
  }
});

router.post('/login', async (req, res, next) => {
  const body = _.pick(req.body, ['email', 'password']);

  try {
    const user = await User.findByCredentials(body);
    if (!user) {
      res.status(400).send({success: false, msg: 'Incorrect email/password'});
    }
    // Get user's public key
    pubkey = await Crypt.getUserKey('pubkey', user);

    res.header('authorization', user.token).send({
      success: true,
      email: user.email,
      _id: cryptLib.encryptId(user._id),
      key: pubkey
    });
  } catch (e) {
    res.status(400).send({success: false, msg: e});
  }
});

router.post('/verifyToken', async (req, res, next) => {
  const authToken = req.headers.authorization;
  
  try {
    const user = await User.findByToken(authToken);
    
    if (user) {
      res.send({success: true, user});
    }
  } catch (e) {
    // token expired?
    res.status(400).send({success: false});
  }
});

router.get('/test', async (req, res, next) => {
  // general user code testing
})



router.post('/logout', authenticate, async (req, res, next) => {
  await req.user.removeToken(req.token)
  res.send({success: true})
});

module.exports = router;

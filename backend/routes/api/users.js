const router = require('express').Router();
const _ = require('lodash');
const authenticate = require('../../middleware/authenticate');
const User = require('../../models/user');
const Crypt = require('../../models/crypt');
const cryptLib = require('../../lib/crypt');
const device = require('../../lib/device');
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
    let user = new User(body);
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

    // Adding user device information (geo/useragent)
    const userDevice = device.getUserDevice(req);
    await user.addDevice(userDevice);

    // After everything is successfully stored
    await user.save();
    
    res.header('authorization', token).send({
      success: true,
      email: user.email,
      _id: cryptLib.encryptId(user._id),
      key: pubkey
    });
  } catch(e) {
    logger.error('Failed to create user: ' + e);
    res.status(400).send({success: false, msg: 'Error occurred, please try again later.'});
  }
});

router.post('/login', async (req, res, next) => {
  const body = _.pick(req.body, ['email', 'password']);

  try {
    const user = await User.findByCredentials(body);
    if (!user) {
      return res.status(400).send({success: false, msg: 'Incorrect email/password'});
    }

    const pubkey = await Crypt.getUserKey('pubkey', user);

    const currentDevice = device.getUserDevice(req);
    let newDevice = device.compareWithPreviousDevices(currentDevice, user.devices);
    // TODO new device confirmation before sending response below and token

    res.header('authorization', user.token).send({
      success: true,
      email: user.email,
      _id: cryptLib.encryptId(user._id),
      key: pubkey,
      deviceAlert: newDevice ? currentDevice : null
    });
  } catch (e) {
    logger.error('Failed to login user: ' + e);
    res.status(400).send({success: false, msg: 'Error occurred, please try again later.'});
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

router.post('/authDevice', async (req, res, next) => {
  // TODO with 2FA to increase security

  // Once a user authenticates the device, we can add it to the list of auth devices
  // And let the user through to the app
})

router.get('/test', async (req, res, next) => {
  // general user code testing
})

router.post('/logout', async (req, res, next) => {
  const token = req.header('authorization');
  try {
    // Find delete token
    await User.findByToken(token);
    res.send({success: true})
  } catch (e) {
    res.send({success: true, msg: 'Session timed out'})
  }

});

module.exports = router;

const User = require('./../models/user');
const Crypt = require('./../models/crypt');
const cryptLib = require('./../lib/crypt');

/**
 * JWT Authentication middleware
 * 
 * @param req
 * @param res
 * @param next
 * 
 * @return next/error
 */
const authenticate = async (req, res, next) => {
  const token = req.header('authorization');

  try {
    const user = await User.findByToken(token);
    if (!user) {
      return res.status(401).send();
    }

    // Decrypting some user data and making it useable
    user.email = cryptLib.decryptUnique(user.email);
    user.salt = cryptLib.decryptSalt(user.salt);
    // And add it to the crypt lib (accessible for models)
    cryptLib.setUserSalt(user.salt);

    // Requesting the user's private key to be accessible within the app
    await Crypt.getUserKey('privkey', user);
    
    req.user = user;
    req.token = token;
    next();
  } catch (e) {
    if (process.env.NODE_ENV === 'development') {
      console.log(e)
    }
    res.status(401).send();
  }
};

module.exports = authenticate;

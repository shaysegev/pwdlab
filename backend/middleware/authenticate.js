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
 * @returns next/error
 */
const authenticate = async (req, res, next) => {
  const token = req.header('authorization');

  try {
    const user = await User.findByToken(token);
    if (!user) {
      return res.status(401).send();
    }
    user.email = cryptLib.decryptUnique(user.email);
    user.recordSalt = cryptLib.decryptSalt(user.recordSalt);

    // Adding the user's private key to be accessible within the app
    const privateKey = await Crypt.getUserKey('privkey', user);
    cryptLib.addPrivateKey(privateKey);
    
    req.user = user;
    req.token = token;
    next();
  } catch (e) {
    res.status(401).send();
  }
};

module.exports = authenticate;

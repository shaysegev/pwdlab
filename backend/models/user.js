const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const bcrypt = require('bcryptjs');
const cryptLib = require('../lib/crypt');
const logger = require('../logger');

const UserSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    validate: {
      validator: validator.isEmail,
      message: '{VALUE} is not a valid email'
    }
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  salt: {
    type: String,
    required: true
  },
  tokens: [{
    access: {
      type: String,
      required: true
    },
    token: {
      type: String,
      required: true
    }
  }],
  devices: [String]
});

/**
 * Allowed JSON object to return to frontend
 */
UserSchema.methods.toJSON = function() {
  var user = this;
  var userObject = user.toObject();

  return _.pick(userObject, ['_id', 'email']);
};

/**
 * Generating JWT token for user
 * 
 * @return JWT token
 */
UserSchema.methods.generateAuthToken = function() {
  const user = this;
  const access = 'auth';
  const token = jwt.sign(
    {_id: user._id.toHexString(), access}, 
    process.env.JWT_SECRET,
    { expiresIn: '.5h' }
  ).toString();

  user.tokens.push({access, token});
  
  return token;
}

/**
 * Generate user's salt for storing records
 */
UserSchema.methods.generateSalt = function() {
  const user = this;
  let salt = cryptLib.generateUserSalt();
  salt = cryptLib.encryptSalt(salt);

  user.salt = salt;
}

/**
 * Add user device info (agent/geo)
 * 
 * @param object device User device
 */
UserSchema.methods.addDevice = function(device) {
  const user = this;

  device = cryptLib.privateEncrypt(JSON.stringify(device));
  user.devices.push(device);
}

/**
 * Removes token from database
 * 
 * @param token
 * @return promise
 */
UserSchema.methods.removeToken = function(token) {
  var user = this;

  return user.update({
    $pull: {
      tokens: {token}
    }
  });
};

/**
 * Find user by token
 * 
 * @param token
 * @return user
 * @throws error
 */
UserSchema.statics.findByToken = async function(token) {
  var User = this;
  var decoded;

  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET);    
    return await User.findOne({
      '_id': decoded._id,
      'tokens.token': token,
      'tokens.access': 'auth'
    });
  } catch (e) {
    logger.debug(e);
    decoded = jwt.decode(token, process.env.JWT_SECRET);
    const user = await User.findOne({
      '_id': decoded._id,
      'tokens.token': token,
      'tokens.access': 'auth'
    });
    if (user) {
      await user.removeToken(token);
    }
    return Promise.reject('Session timed out');
  }
};

/**
 * Find user by credentials
 * 
 * @param email
 * @param password
 * @return user/false
 */
UserSchema.statics.findByCredentials = async function({email, password}) {
  var User = this;
  email = cryptLib.encryptUnique(email).toString();

  const user = await User.findOne({email});
  if (!user) {
    return;
  }

  const passwordMatch = await bcrypt.compare(password, user.password);

  if (passwordMatch) {
    user.token = user.generateAuthToken();
    user.email = cryptLib.decryptUnique(user.email);
    await user.save();
    // todo find a neater way of doing it, as it encrypted the email again upon saving
    user.email = cryptLib.decryptUnique(user.email);
    return user;
  }
};

/**
 * Encrypt email address and generate salt for password upon saving
 * 
 * @param next
 */
UserSchema.pre('save', function(next) {
  var user = this;

  if (user.isModified('email')) {
    user.email = cryptLib.encryptUnique(user.email);
  }

  if (user.isModified('password')) {
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(user.password, salt, (err, hash) => {
        user.password = hash;
        next();
      });
    });
  } else {
    next();
  }
});

/**
 * Error capture upon saving/updating users
 * 
 * @param error
 * @param doc
 * @param next
 */
UserSchema.post('save', function(error, doc, next) {
  if (!error) {
    next();
  }

  logger.error(`User save error: ${error}`);
 
  // Capture and return a generic error message (Security first)
  next();
});

var User = mongoose.model('User', UserSchema);

module.exports = User

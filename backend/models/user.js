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
    require: true,
    minlength: 6
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
  }]
});

UserSchema.methods.toJSON = function() {
  var user = this;
  var userObject = user.toObject();

  return _.pick(userObject, ['_id', 'email']);
};

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

UserSchema.methods.removeToken = function(token) {
  var user = this;

  return user.update({
    $pull: {
      tokens: {token}
    }
  });
};

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
    throw new Error();
  }
};

UserSchema.statics.findByCredentials = function({email, password}) {
  var User = this;

  return User.findOne({email}).then((user) => {
    if (!user) {
      return Promise.reject();
    }

    return new Promise((resolve, reject) => {
      bcrypt.compare(password, user.password, (err, res) => {
        if (res) {
          user.token = user.generateAuthToken()
          resolve(user);
        } else {
          reject();
        }
      });
    });
  });
};

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

UserSchema.post('save', function(error, doc, next) {
  let msg;
  
  if (!error) {
    next();
  }

  logger.error(`User save error: ${error}`);
  
  if (error.name === 'MongoError' && error.code === 11000) {
    msg = 'Email already registered.';
  } else if (error.errors && 'email' in error.errors) {
    msg = error.errors.email.message
  } else {
    msg = 'Error occurred, please try again later.';
  }
  next({
    success: false,
    msg: msg
  })
});

var User = mongoose.model('User', UserSchema);

module.exports = User

const mongoose = require('mongoose');
const cryptLib = require('../lib/crypt');
const logger = require('../logger');

const CryptSchema = mongoose.Schema({
  cid: {
    type: String,
    required: true,
  },
  pubkey: {
    type: String,
    require: true,
  },
  privkey: {
    type: String,
    require: true,
  }
});

/**
* Creating RSA keys for user
*/
CryptSchema.methods.createKeys = async function(user) {
  const crypt = this;
  crypt.cid = cryptLib.getCryptId(user);

  const RSAkey = cryptLib.generateRSAKeys(user);
  crypt.pubkey = cryptLib.base64Encode(RSAkey.pubkey);
  crypt.privkey = cryptLib.base64Encode(RSAkey.privkey);

  await crypt.save();
  return crypt.pubkey;
};

/**
* Get user's public key
*/
CryptSchema.statics.getPublicKey = async function(user) {
  const Crypt = this;
  const cid = cryptLib.getCryptId(user);

  const keys = await Crypt.findOne({ cid });
  if (!keys) {
    logger.error(`Crypt keys not found for user ${user._id}. Cid: ${cid}`);
    return false;
  }

  return cryptLib.base64Decode(keys.pubkey);
};

const Crypt = mongoose.model('CryptKey', CryptSchema);

module.exports = Crypt
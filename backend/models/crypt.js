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
 *
 * @param user
 * @returns RSA public key
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
 * Get user's key
 * 
 * @param type privkey|pubkey
 * @param user
 * @throws error
 * @returns RSA public/private key
 */
CryptSchema.statics.getUserKey = async function(type, user) {
  const Crypt = this;

  // If we already retrieved the user's keys
  // then try to return early
  if (type === 'pubkey') {
    let publicKey = cryptLib.getPublicKey();
    if (publicKey) {
      return publicKey;
    }
  }

  if (type === 'privkey') {
    let privateKey = cryptLib.getPrivateKey();
    if (privateKey) {
      return privateKey;
    }
  }

  // Continue to get user's keys from database

  const cid = cryptLib.getCryptId(user);

  const keys = await Crypt.findOne({ cid });
  if (!keys) {
    logger.error(`Crypt keys not found for user ${user._id}. Cid: ${cid}`);
    throw 'Error occurred, please try again later.';
  }

  const pubkey = cryptLib.base64Decode(keys.pubkey);
  cryptLib.setPublicKey(pubkey);

  const privkey = cryptLib.base64Decode(keys.privkey);
  cryptLib.setPrivateKey(privkey);

  switch (type) {
    case 'pubkey':
      return pubkey;
    case 'privkey':
      return privkey;
    default:
      logger.error(`Unsupport key type: ${type}`);
      throw new Error();
  }
};

const Crypt = mongoose.model('CryptKey', CryptSchema);

module.exports = Crypt
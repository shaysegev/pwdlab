const CryptoJS = require('crypto-js');
const cryptoNode = require('crypto');
const NodeRSA = require('node-rsa');
const logger = require('../logger');

/**
 * User's private RSA key
 */
let privateKey = null;

/**
 * User's public RSA key
 */
let publicKey = null;

/**
 * User's salt for records encryption
 */
let userSalt = null;

/**
 * Generate RSA keys
 * 
 * @returns RSA key
 */
const generateRSAKeys = () => {
  const key = new NodeRSA({b: 1024});
  const keyPair = key.generateKeyPair();

  const keys = {
    privkey: keyPair.exportKey('pkcs8-private'),
    pubkey: keyPair.exportKey('pkcs8-public') 
  }

  setPrivateKey(keys.privkey);
  setPublicKey(keys.pubkey);

  return keys;
}

/**
 * Generate user's record salt for encryption
 */
const generateUserSalt = () => {
  return cryptoNode.randomBytes(Math.ceil(16 / 2)).toString('hex').slice(0, 16);
}

/**
 * Set user's record salt
 * 
 * @param string salt
 * @returns void
 */
const setUserSalt = (salt) => {
  userSalt = salt;
}

/**
 * get user's record salt
 * 
 * @returns string salt
 */
const getUserSalt = () => {
  return userSalt;
}

/**
 * Set user's private RSA key
 * 
 * @param string private key
 * @returns void
 */
const setPrivateKey = (key) => {
  privateKey = key;
}

/**
 * Set user's public RSA key
 * 
 * @param string key
 */
const setPublicKey = (key) => {
  publicKey = key;
}

/**
 * Get user's private RSA key
 */
const getPrivateKey = () => {
  return privateKey;
}

/**
 * Get user's public RSA key
 */
const getPublicKey = () => {
  return publicKey;
}

/**
 * Encrypt with private key
 * 
 * @param string text
 */
const privateEncrypt = (text) => {
  if (!privateKey) {
    logger.error('Encryption key not added');
    throw new Error('Encryption error');
  }
  
  let enc = cryptoNode.privateEncrypt({
    key: privateKey,
    padding: cryptoNode.RSA_PKCS1_OAEP_PADDING
    }, Buffer.from(text));
  return enc.toString('base64');
}

/**
 * Decrypt with private key
 * 
 * @param string text
 */
const privateDecrypt = (text) => {
  if (!privateKey) {
    logger.error('Encryption key not added');
    throw new Error('Encryption error');
  }

  let dec = cryptoNode.privateDecrypt({
    key: privateKey,
    padding: cryptoNode.RSA_PKCS1_OAEP_PADDING
    }, Buffer.from(text, 'base64'));
  return dec.toString();
}

/**
 * Encrypt with public key
 * 
 * @param string text
 */
const publicEncrypt = (text) => {
  return cryptoNode.publicEncrypt({
    key: publicKey,
    padding: cryptoNode.RSA_PKCS1_OAEP_PADDING
    }, Buffer.from(text)).toString('base64');
}

/**
 * Decrypt with public key
 * 
 * @param string text
 */
const publicDecrypt = (text) => {
  let dec = cryptoNode.publicDecrypt({
    key: publicKey,
    padding: cryptoNode.RSA_PKCS1_OAEP_PADDING
    }, Buffer.from(text, 'base64')).toString();

  return dec;
}

/**
 * Encrypt user record salt with app AES key
 * 
 * @param string userSalt
 * @returns string encrypted userSalt
 */
const encryptSalt = (userSalt) => {
  return encryptWithAppKey(userSalt);
}

/**
 * Decrypt user record salt with app AES key
 * 
 * @param string userSalt
 * @returns string decrypted userSalt
 */
const decryptSalt = (userSalt) => {
  return decryptWithAppKey(userSalt);
}

/**
 * Encrypt a Mongoose ID object
 * 
 * @param object ObjectId
 * @returns string encrypted _id
 */
const encryptId = (id) => {
  return encryptUnique(id.toHexString()).toString();
}

/**
 * Decrypt user record salt with app AES key
 * 
 * @param object ObjectId
 * @returns string decrypted _id
 */
const decryptId = (id) => {
  return decryptUnique(id.toHexString());
}

/**
 * Get AES app key from env
 * 
 * @returns ENV AES key
 */
const getAppAESKey = () => {
  return process.env.AES_KEY;
}

// const generateAESKey = () => {
//   return cryptoNode.randomBytes(Math.ceil(16 / 2)).toString('hex').slice(0, 16);
// }

/**
 * Get/generate crypt id for storing public/private keys
 * 
 * @param Destructured user id/email
 * @returns cid (Crypt ID)
 */
const getCryptId = ({ _id, email }) => {
  return CryptoJS.SHA256(_id + email).toString();
}

/**
 * Get/generate unique record id based on user's id/salt
 */
const getRecordId = ({ _id, userSalt }) => {
  return CryptoJS.SHA256(_id + userSalt).toString();  
}

/**
 * Encode Base64 string
 * 
 * @param string
 * @returns Base64 encoded string
 */
const base64Encode = string => {
  let buff = new Buffer(string);  
  return buff.toString('base64');
}

/**
 * Decode Base64 string
 * 
 * @param decoded string
 * @returns Base64 decoded string
 */
const base64Decode = string => {
  let buff = new Buffer(string, 'base64');  
  return buff.toString('ascii');
}

/**
 * Encrypt AES by app env key
 * 
 * @param text
 * @returns AES encrypted text
 */
const encryptWithAppKey = text => {
  try {
    let enc = CryptoJS.AES.encrypt(text, getAppAESKey());
    return enc.toString()
  } catch (e) {
    logger.error(e);
    throw new Error(e);
  }
}

/**
 * Decrypt AES by app env key
 * 
 * @param ciphered text
 * @returns decrypted text
 */
const decryptWithAppKey = ciphertext => {
  var bytes  = CryptoJS.AES.decrypt(ciphertext, getAppAESKey());
  return bytes.toString(CryptoJS.enc.Utf8);
}

/**
 * Generating a consistent key based on preconfigured iv and salt
 * 
 * @returns key object
 */
const getFixedCipherKey = () => {
  const salt = CryptoJS.enc.Hex.parse(process.env.AES_UNIQUE_SALT);

  return CryptoJS.PBKDF2(getAppAESKey(), salt, {
    keySize: 8,
    iterations: 100
  });
}

/**
 * Get env IV for consistent ciphering
 * 
 * @returns ENV IV
 */
const getFixedIV = () => {
  return CryptoJS.enc.Hex.parse(process.env.AES_UNIQUE_IV);
}

/**
 * Generating unique cipher based on preconfigured iv and salt
 * 
 * @returns Encrypted text
 */
const encryptUnique = text => {
  return CryptoJS.AES.encrypt(text, getFixedCipherKey(), { 
    iv: getFixedIV(),
    padding: CryptoJS.pad.Pkcs7,
    mode: CryptoJS.mode.CBC
  });
}

/**
 * Decrypting cipher based on preconfigured iv and salt
 * 
 * @returns Decrypted text 
 */
const decryptUnique = ciphertext => {
  var decrypted = CryptoJS.AES.decrypt(ciphertext, getFixedCipherKey(), { 
    iv: getFixedIV(),
    padding: CryptoJS.pad.Pkcs7,
    mode: CryptoJS.mode.CBC
    
  })
  return decrypted.toString(CryptoJS.enc.Utf8);
}

module.exports = {
  privateEncrypt,
  privateDecrypt,
  publicEncrypt,
  publicDecrypt,
  generateRSAKeys,
  generateUserSalt,
  getUserSalt,
  setUserSalt,
  encryptSalt,
  decryptSalt,
  encryptId,
  decryptId,
  getCryptId,
  getRecordId,
  base64Encode,
  base64Decode,
  encryptUnique,
  decryptUnique,
  setPrivateKey,
  setPublicKey,
  getPrivateKey,
  getPublicKey,
}
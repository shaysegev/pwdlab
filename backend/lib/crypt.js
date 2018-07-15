const CryptoJS = require('crypto-js');
const NodeRSA = require('node-rsa');

/**
* Generate RSA keys
*/
const generateRSAKeys = () => {
  const key = new NodeRSA({b: 1024});
  const keyPair = key.generateKeyPair();

  const keys = {
    privkey: keyPair.exportKey('pkcs8-private'),
    pubkey: keyPair.exportKey('pkcs8-public') 
  }

  return keys;
}

// const encryptAESKey = AESkey => {
//   return publicKey.encrypt(AESkey, 'utf8').toString();
// }

/**
* Get AES app key from env
*/
const getAppAESKey = () => {
  return process.env.AES_KEY;
}

// const generateAESKey = () => {
//   return cryptoNode.randomBytes(Math.ceil(16 / 2)).toString('hex').slice(0, 16);
// }

/**
* Get/generate crypt id for storing public/private keys
*/
const getCryptId = ({ _id, email }) => {
  return CryptoJS.SHA256(_id + email).toString();
}

/**
* Encode Base64 string
*/
const base64Encode = string => {
  let buff = new Buffer(string);  
  return buff.toString('base64');
}

/**
* Decode Base64 string
*/
const base64Decode = string => {
  let buff = new Buffer(string, 'base64');  
  return buff.toString('ascii');
}

/**
* Encrypt AES by app env key
*/
const encrypt = text => {
  return CryptoJS.AES.encrypt(text, getAppAESKey()).toString();
}

/**
* Decrypt AES by app env key
*/
const decrypt = ciphertext => {
  var bytes  = CryptoJS.AES.decrypt(ciphertext, getAppAESKey());
  return bytes.toString(CryptoJS.enc.Utf8);
}

/**
* Generating a consistent key based on preconfigured iv and salt
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
*/
const getFixedIV = () => {
  return CryptoJS.enc.Hex.parse(process.env.AES_UNIQUE_IV);
}

/**
* Generating unique cipher based on preconfigured iv and salt
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
*/
const decryptUnique = ciphertext => {
  var decrypted = CryptoJS.AES.decrypt(ciphertext, getFixedCipherKey(), { 
    iv: getFixedIV(),
    padding: CryptoJS.pad.Pkcs7,
    mode: CryptoJS.mode.CBC
    
  })
  return decrypted.toString(CryptoJS.enc.Utf8);
}

// const decryptwithUserAESKey = (ciphertext, key) => {
//   var bytes  = CryptoJS.AES.decrypt(ciphertext, key);
//   return bytes.toString(CryptoJS.enc.Utf8);
// }

// const encryptWithUserAESKey = (text, key) => {
//   return CryptoJS.AES.encrypt(text, key).toString();
// }

module.exports = {
  encrypt,
  decrypt,
  generateRSAKeys,
  getCryptId,
  base64Encode,
  base64Decode,
  encryptUnique,
  decryptUnique
}
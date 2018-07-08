const CryptoJS = require('crypto-js');
const cryptoNode = require('crypto');
const NodeRSA = require('node-rsa');

const generateKeys = () => {
  const key = new NodeRSA({b: 1024});
  const keyPair = key.generateKeyPair();
  const userAESKey = generateAESKey();

  let keys = {
    private: keyPair.exportKey('pkcs8-private'),
    public: keyPair.exportKey('pkcs8-public'),
    standard: userAESKey
  };

  // logic
  // public/private/aes keys
  // create keys, send public key to front
  // encrypt AES key with aes app key with two base64 encode
  // encrypt password created with RSA in front, and then with AES in the backend
  // when password being sent to the front, decrypt with AES and send RSA unecrypted to front

  return keys;
}

const encryptKeys = keys => {
  const appAESKey = getAppAESKey();

  // Encrypt the keys
  // keys.public = CryptoJS.AES.encrypt(keys.public, appAESKey).toString();
  // keys.private = CryptoJS.AES.encrypt(keys.private, appAESKey).toString();
  keys.standard = CryptoJS.AES.encrypt(keys.standard, appAESKey).toString();

  return keys;
}

const getAppAESKey = () => {
  return process.env.AES_KEY;
}

const generateAESKey = () => {
  return cryptoNode.randomBytes(Math.ceil(16 / 2)).toString('hex').slice(0, 16);
}

const decryptwithAppAESKey = (ciphertext) => {
  var bytes  = CryptoJS.AES.decrypt(ciphertext, getAppAESKey());
  return bytes.toString(CryptoJS.enc.Utf8);
}

const encryptWithAppAESKey = (text) => {
  return CryptoJS.AES.encrypt(text, getAppAESKey()).toString();
}

const decryptwithUserAESKey = (ciphertext, key) => {
  var bytes  = CryptoJS.AES.decrypt(ciphertext, key);
  return bytes.toString(CryptoJS.enc.Utf8);
}

const encryptWithUserAESKey = (text, key) => {
  return CryptoJS.AES.encrypt(text, key).toString();
}

module.exports = {
  generateKeys,
  encryptKeys
}
import crypto from 'crypto'

let publicKey = null

const encrypt = (text) => {
  return crypto.publicEncrypt({
    key: publicKey,
    padding: crypto.RSA_PKCS1_OAEP_PADDING
    }, Buffer.from(text)).toString('base64')
}

const decrypt = (text) => {
  return crypto.publicDecrypt({
    key: publicKey,
    padding: crypto.RSA_PKCS1_OAEP_PADDING
    }, Buffer.from(text, 'base64'))
}

const addPublicKey = (key) => {
  publicKey = key
}

export {
  encrypt,
  decrypt,
  publicKey,
  addPublicKey
}
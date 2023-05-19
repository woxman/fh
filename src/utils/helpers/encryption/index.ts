import CryptoJS from "crypto-js"

import config from "../../config"

export const encrypt = (password: string): string => {
  const ciphertext = CryptoJS.AES.encrypt(password, config.passwordEncryptionKey).toString()
  return ciphertext
}

export const decrypt = (ciphertext: string): string => {
  var bytes  = CryptoJS.AES.decrypt(ciphertext, config.passwordEncryptionKey)
  var password = bytes.toString(CryptoJS.enc.Utf8)
  return password
}
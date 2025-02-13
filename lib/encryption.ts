import CryptoJS from "crypto-js"

const SECRET_KEY = process.env.ENCRYPTION_KEY || "default-key"

export const encryptMessage = (message: string): string => {
  return CryptoJS.AES.encrypt(message, SECRET_KEY).toString()
}

export const decryptMessage = (ciphertext: string): string => {
  const bytes = CryptoJS.AES.decrypt(ciphertext, SECRET_KEY)
  return bytes.toString(CryptoJS.enc.Utf8)
}

export const generateSecureId = (): string => {
  return CryptoJS.lib.WordArray.random(16).toString()
}


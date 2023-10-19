const crypto = require("crypto")

const SmartCard = require("../models/SmartCard")

const algorithm = process.env.CRYPTO_ALG
const encryptionKey = Buffer.from(process.env.CRYPTO_KEY, "hex")
const iv = Buffer.from(process.env.CRYPTO_IV, "hex")

const encryptCardNumber = (cardNumber) => {

    const cipher = crypto.createCipheriv(algorithm, encryptionKey, iv)
    
    let encrypted = cipher.update(cardNumber, "utf8", "hex")
    encrypted += cipher.final("hex")
    return encrypted

}

const decryptCardNumber = (encryptedCardNumber) => {
    const decipher = crypto.createDecipheriv(algorithm, encryptionKey, iv)

    let decrypted = decipher.update(encryptedCardNumber, "hex", "utf8")
    decrypted += decipher.final("utf8")
    return decrypted
}

const  getLastFourDigits = (cardNumber) => {
  return cardNumber.replace(/\D/g, '').slice(-4)
}

const cardExists = async(cardNumber) => {
    const encryptedCardNumbers = await SmartCard.findAll({
        attributes: ["cardNumber"],
    })

    const exists = encryptedCardNumbers.some((encryptedCard) => {
        const decryptedCardNumber = decryptCardNumber(encryptedCard.dataValues.cardNumber)
        return decryptedCardNumber === cardNumber
    })

    return exists
}

module.exports = {
    encryptCardNumber,
    decryptCardNumber,
    getLastFourDigits,
    cardExists
}
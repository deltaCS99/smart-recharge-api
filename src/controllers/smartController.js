const asyncHandler = require("express-async-handler")
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY)

const { encryptCardNumber, getLastFourDigits, cardExists } = require("../utils/smartCardUtils")
const SmartCard = require("../models/SmartCard")

const getSmartCard = asyncHandler( async(req, res) => {
    const { cardId } = req.params

    if (!cardId){
        return res.status(400).json({
            error: "cardId required"
        })
    }

    try {
        const card = await SmartCard.findByPk(cardId, {
            attributes: { exclude: ["cardNumber", "UserId"] }
        })

        if (!card){
            return res.status(404).json({
                error: "Card not found"
            })
        }

        return res.status(200).json({ card })
    }
    catch(error) {
        console.error(error)
        res.status(500).json({ error: "Internal server error"})}
})

const getSmartCards= asyncHandler( async(req, res) => {
    
    try {
    const cards = await SmartCard.findAll({
        where: {
            UserId: req.user.id
        },
        attributes: { exclude: ["cardNumber", "UserId"] }
    }
    )
        return res.status(200).json({ cards })
    }
    catch(error) {
        console.error(error)
        res.status(500).json({ error: "Internal server error"})}
})

const addSmartCard = asyncHandler( async(req, res) => {

    const { cardNumber, expiryMonth, expiryYear, cvc, nickName } = req.body

    if (!cardNumber || !nickName || !expiryMonth || !expiryYear || !cvc) {
        return res.status(400).json({ error: "Missing field(s)" })
    }

    try {
        const exists = await cardExists(cardNumber)

        if (exists) {
            return res.status(400).json({ error: "Smartcard already exists"})
        }

        const newSmartCard = await SmartCard.create({
            cardNumber: encryptCardNumber(cardNumber),
            lastFour: getLastFourDigits(cardNumber),
            expiryMonth,
            expiryYear,
            cvc,
            nickName,
            UserId: req.user.id
        })

        await req.user.addSmartCard(newSmartCard)
        
        res.status(201).json({
                message: "Smartcard successfully created",
                card: {
                  id: newSmartCard.id,
                  lastFour: newSmartCard.lastFour,
                  expiryMonth: newSmartCard.expiryMonth,
                  expiryYear: newSmartCard.expiryYear,
                  nickName: newSmartCard.nickName,
                  balance: newSmartCard.balance
                },
        })
    }
    catch(error){
        console.error(error)
        res.status(500).json({ error: "Internal server error"})
    }
})

const rechargeSmartCard = asyncHandler( async(req, res) => {
    const { cardId } = req.params
    const { amount, fromCard } = req.body

    const smartcard = await SmartCard.findOne({
        where: { id:cardId },
    })

    if (!smartcard) {
        return res.status(404).json({ error: "SmartCard not found" })
    }

    try {
        smartcard.balance += parseFloat(amount)
        await smartcard.save()
        return res.status(200).json({ message: "SmartCard recharged successfully" })
    }
    catch(error){
        console.error(error)
        res.status(500).json({ error: "Internal server error"})
    }

})

const removeSmartCard = asyncHandler(async(req, res) => {
    const { cardId } = req.params

    if (!cardId){
        return res.status(400).json({
            error: "cardId required"
        })
    }

    try {
        const card = await stripe.customers.deleteSource(
            req.user.stripeId,
            cardId
        )
        return res.status(200).json({ card })
    }
    catch(error) {
        console.error(error)
        res.status(500).json({ error: "Internal server error"})}
})

const updateSmartCard= asyncHandler(async(req, res) => {
})

module.exports = {
    getSmartCard,
    getSmartCards,
    addSmartCard,
    removeSmartCard,
    updateSmartCard,
    rechargeSmartCard
}
const asyncHandler = require("express-async-handler")
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY)

const getCard = asyncHandler( async(req, res) => {
    const { cardId } = req.body

    if (!cardId){
        return res.status(400).json({
            error: "cardId required"
        })
    }

    try {
        const card = await stripe.customers.retrieveSource(
            req.user.stripeId,
            cardId
        )
        return res.status(200).json({ card })
    }
    catch(error) {
        console.error(error)
        res.status(500).json({ error: "Internal server error"})}
})

const getCards= asyncHandler( async(req, res) => {
    
    try {
        const cards = await stripe.customers.listSources(
            req.user.stripeId,
            {object: "card"}
        )
        return res.status(200).json({ cards })
    }
    catch(error) {
        console.error(error)
        res.status(500).json({ error: "Internal server error"})}
})

const addCard = asyncHandler( async(req, res) => {

    const { cardNumber, expiryMonth, expiryYear, cvc, cardName } = req.body

    if (!cardNumber || !cardName || !expiryMonth || !expiryYear || !cvc) {
        return res.status(400).json({ error: "Missing field(s)" })
    }

    try {
        const cardToken =  await stripe.tokens.create({
            card: {
              number: cardNumber,
              exp_month: parseInt(expiryMonth, 10),
              exp_year: parseInt(expiryYear, 10),
              cvc,
            },
        })

        const card = await stripe.customers.createSource(
            req.user.stripeId,
            {source: cardToken}
        )
    
        return res.status(201).json({ card })
    }
    catch(error){
        console.error(error)
        res.status(500).json({ error: "Internal server error"})
    }
})

const removeCard = asyncHandler(async(req, res) => {
    const { cardId } = req.body

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

const updateCard= asyncHandler(async(req, res) => {
})

module.exports = {
    getCard,
    getCards,
    addCard,
    removeCard,
    updateCard
}
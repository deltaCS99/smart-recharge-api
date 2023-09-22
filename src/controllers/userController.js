const asyncHandler = require("express-async-handler")
const { Op } = require("sequelize")
const bcrypt = require("bcrypt")
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY)
const generateToken = require("../utils/generateToken")

const User = require("../models/User")

const loginUser = asyncHandler( async(req, res) => {

    const { email, password } = req.body
    
    try {

        if (!email || !password) {
            return res.status(400).json({ error: "Missing field(s)" })
        }
    
        const existingUser = await User.findOne({
            where: { email }
        })
    
        if (existingUser) {

            const isValidPassword = await bcrypt.compare(password, existingUser.password)

            if (isValidPassword) {
                return res.status(200).json({
                    id: existingUser.id,
                    email: existingUser.email,
                    token: generateToken(existingUser.id)
                })
            }
    
            return res.status(401).json({ error: "Invalid password" })
        }
        
        return res.status(404).json({ error: "User does not exist"})
    }
    catch(error){
        console.error(error)
        res.status(500).json({ error: "Internal server error"})
    }
})

const getUserProfile = asyncHandler( async(req, res) => {

    try {
        const user = await User.findByPk(req.user.id)

        if (user) {
            return res.status(200).json({
                id: user.id,
                email: user.email
            })
        }
    
        return res.status(401).json({ error: "User does not exist" })
    }
    catch(error){
        console.error(error)
        res.status(500).json({ error: "Internal server error"})
    }
})

const registerUser = asyncHandler(async(req, res) => {

    const {email, password } = req.body

    try {

        if (!email || !password) {
            return res.status(400).json({ error: "Missing field(s)" })
        }
    
        const existingUser = await User.findOne({
            where: {
                email 
            }
        })
    
        if (existingUser) {
            return res.status(400).json({ error: "Email already exists"})
        }

        const stripeAcc = await stripe.customers.create({
            email
        })

        if (!stripeAcc) {
            return res.status(400).json({ error: "An error occured while creating stripe acc"})
        }

        const hashedPassword = await bcrypt.hash(password, 12)

        const newUser = await User.create({
            stripeId: stripeAcc.id, 
            email,
            password: hashedPassword
        })
        
        res.status(201).json({
                message: "User registered successfully",
                user: {
                  id: newUser.id,
                  email: newUser.email,
                  token: generateToken(newUser.id)
                },
        })
    }
    catch(error){
        console.error(error)
        res.status(500).json({ error: "Internal server error"})
    }
})

const updateUserProfile = (req, res) => {

}

module.exports = {
    loginUser,
    getUserProfile,
    registerUser,
    updateUserProfile
}
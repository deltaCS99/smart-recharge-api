const asyncHandler = require("express-async-handler")
const { Op } = require("sequelize")
const bcrypt = require("bcrypt")

const User = require("../models/User")

const loginUser = asyncHandler( async(req, res) => {

    const { email, password } = req.body
    
    try {
        console.log(req.user)

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
                    username: existingUser.username,
                    email: existingUser.email,
                    token: "token"
                })
            }
    
            return res.status(401).json({ error: "Invalid password" })
        }
        
        return res.status(404).json({ error: "User does not exist"})
    }
    catch(error){
        console.error(error);
        res.status(500).json({ error: "Internal server error"})
    }
})

const getUserProfile = asyncHandler( async(req, res) => {

    const { id } = req.query
    
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
                    username: existingUser.username,
                    email: existingUser.email,
                    token: "token"
                })
            }
    
            return res.status(401).json({ error: "Invalid password" })
        }
        
        return res.status(404).json({ error: "User does not exist"})
    }
    catch(error){
        console.error(error);
        res.status(500).json({ error: "Internal server error"})
    }
})

const registerUser = asyncHandler(async(req, res) => {

    const { username, email, password } = req.body

    try {

        if (!username || !email || !password) {
            return res.status(400).json({ error: "Missing field(s)" })
        }
    
        const existingUser = await User.findOne({
            where: {
                [Op.or]: [
                    { username },
                    { password }
                ]
            }
        })
    
        if (existingUser) {
            return res.status(400).json({ error: "Username or email already exists"})
        }
    
        const hashedPassword = await bcrypt.hash(password, 12)
    
        const newUser = await User.create({ 
            username,
            password: hashedPassword,
            email
        })
    
        res.status(201).json({
                message: "User registered successfully",
                user: {
                  id: newUser.id,
                  username: newUser.username,
                  email: newUser.email,
                  token: "token"
                },
        })
    }
    catch(error){
        console.error(error);
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
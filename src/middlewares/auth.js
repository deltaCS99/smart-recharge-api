const jwt = require("jsonwebtoken")
const asyncHandler = require("express-async-handler")
const User = require("../models/User")

const auth = asyncHandler( async(req, res, next) => {
    let token

    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        try{
            token = req.headers.authorization.split(" ")[1]
            const decodedToken = jwt.verify(token, process.env.JWT_SECRET)
            req.user = await User.findOne({
                where: { id: decodedToken.id },
                attributes: { exclude: ["password"] }
            })

            next()
        }
        catch(err){
            console.error(err)
            res.status(401)
            throw new Error("Not authorized, token failed")
        }
    }

    if (!token){
        res.status(401)
        throw new Error("Not authorized, no token available")
    }
})

module.exports = auth
const express = require("express")

const { loginUser, getUserProfile, registerUser, updateUserProfile } = require("../controllers/userController")
const auth = require("../middlewares/auth")


const router = express.Router()

// @desc Register new user
// @route GET /api/users
// @access Public
router.post('/', registerUser)

// @desc  Auth user & get token
// @route GET /api/users/login
// @access Public
router.post('/login', loginUser)

// @desc  Get user profile
// @route GET /api/users/profile
// @access Private
router.get('/profile', auth, getUserProfile)

// @desc  Update user profile
// @route PUT /api/users/profile
// @access Private
router.put('/profile', auth, updateUserProfile)

module.exports = router
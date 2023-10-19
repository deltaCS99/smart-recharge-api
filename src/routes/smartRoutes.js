const express = require("express")

const auth = require("../middlewares/auth")
const { getSmartCard, getSmartCards, addSmartCard, rechargeSmartCard, updateSmartCard, removeSmartCard } = require("../controllers/smartController")


const router = express.Router()

// @desc Retrieve card
// @route GET /api/smartcards/:cardId
// @access Private
router.get("/:cardId", auth, getSmartCard)

// @desc Retrieve cards
// @route POST /api/smartcards
// @access Private
router.get("/", auth, getSmartCards)

// @desc Register new card
// @route POST /api/smartcards
// @access Private
router.post("/", auth, addSmartCard)

// @desc Recharge card
// @route POST /api/smartcards/:cardId/recharge
// @access Private
router.post("/:cardId/recharge", auth, rechargeSmartCard)

// @desc Delete card
// @route GET /api/smartcards/:cardId
// @access Private
router.delete("/:cardId", auth, removeSmartCard)


// @desc Update card
// @route GET /api/smartcards/:cardId
// @access Private
router.patch("/:cardId", auth, updateSmartCard)

module.exports = router
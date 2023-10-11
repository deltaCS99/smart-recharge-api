const express = require("express")

const auth = require("../middlewares/auth")
const { getCard, getCards, addCard, updateCard, removeCard } = require("../controllers/cardController")


const router = express.Router()

// @desc Retrieve card
// @route GET /api/cards
// @access Private
router.get("/", auth, getCard)

// @desc Retrieve cards
// @route POST /api/cards
// @access Private
router.get("/", auth, getCards)

// @desc Register new card
// @route POST /api/cards
// @access Private
router.post("/", auth, addCard)

// @desc Delete card
// @route GET /api/cards
// @access Private
router.delete("/:id", auth, removeCard)


// @desc Update card
// @route GET /api/cards
// @access Private
router.patch("/:id", auth, updateCard)

module.exports = router
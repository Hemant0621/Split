const express = require("express");

const router = express.Router();

const userrouter = require("./user")
const partyrouter = require("./party")
const accrouter = require("./account")

router.use("/user",userrouter)
router.use("/party",partyrouter)
router.use("/account",accrouter)

module.exports = router ;

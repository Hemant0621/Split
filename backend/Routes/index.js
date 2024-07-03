const express = require("express");

const router = express.Router();

const userrouter = require("./user")
const partyrouter = require("./party")

router.use("/user",userrouter)
router.use("/party",partyrouter)

module.exports = router ;

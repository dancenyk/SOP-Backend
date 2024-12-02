const express = require("express");
const router = express.Router();
const admin = require("firebase-admin");
const User = require("../models/User");


router.post("/logout",(req, res)=>{
    res.status(200).send("Logged out successfully")
})

module.exports = router;
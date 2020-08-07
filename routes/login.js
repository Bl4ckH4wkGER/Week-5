const { Router, query } = require("express");
var jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const router = Router();

const userDAO = require('../daos/user');

// Signup
router.post("/signup", async (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password || password === ""){
        res.status(400).send('Email and password are required.')
    } else {
        try {
            const newUser = await userDAO.signup(email, password);
            res.json(newUser);
        } catch(e) {
            next(e);
        }
    }
});

// Login
router.post("/", async (req, res, next) => {
});

// Change Password
router.post("/password", async (req, res, next) => {
});

// Error handling middleware
router.use(function (error, req, res, next) {
    if (error.message.includes("duplicate key")){
        res.status(409).send('There is an existing account for this email.')
    } else {
        res.status(500).send('Something broke! Our fault :(')
    } 
});

module.exports = router;
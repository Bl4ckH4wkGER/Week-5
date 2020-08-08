const { Router, query } = require("express");
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv').config()
const bcrypt = require('bcrypt');
const router = Router();

const userDAO = require('../daos/user');

// isAuthorized middleware
const isAuthorized = async (req, res, next) => {
    let authHeader = req.headers.authorization;
    if (!authHeader) {
        res.sendStatus(401);
    } else {
        const token = authHeader.split(' ')[1];
        const jwtSecret = process.env.JWT_SECRET;
        const user = jwt.verify(token, jwtSecret, (err, decodedToken) => {
            if (err) {
                res.sendStatus(401);
            } else {
                req.user = decodedToken;
                next()
            }
        })
    }
};

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
    const {email, password} = req.body;
    const user = await userDAO.getUser(email)
    if (!user) {
        res.status(401).send('User does not exist')
    } else {
        if (!password || password === ""){
            res.status(400).send('Must provide a password.');
        } else {
            const passwordMatch = await bcrypt.compare(password, user.password);
            if (!passwordMatch) {
                res.status(401).send('Wrong password!');
            } else {
                const userWithoutPassword = await userDAO.getUserWithoutPassword(email);
                const jwtSecret = process.env.JWT_SECRET;
                const token = jwt.sign(userWithoutPassword.toJSON(), jwtSecret, { expiresIn: '1h' });
                res.json({token});
            }
        }
    }
});

// Change Password
router.post("/password",
    isAuthorized,
    async (req, res, next) => {
        const { email } = req.user
        const { password } = req.body;
        if (!password || password === ""){
            res.status(400).send('Must provide a password.');
        } else {
            try {
                const updatedUser = await userDAO.updateUserPassword(email, password);
                res.sendStatus(200)
            } catch (e) {
                res.sendStatus(401);
            }
        }
    }
);

// Error handling middleware
router.use(function (error, req, res, next) {
    if (error.message.includes("duplicate key")){
        res.status(409).send('There is an existing account for this email.')
    } else {
        res.status(500).send('Something broke! Our fault :(')
    } 
});

module.exports = router;
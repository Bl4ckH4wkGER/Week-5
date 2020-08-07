const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const User = require('../models/user');

module.exports = {};

module.exports.signup = async (email, password) => {
    const passwordHash = await bcrypt.hash(password, 10);
    try {
        const newUser = await User.create({
            email: email,
            password: passwordHash
        });
        return newUser;
    } catch (e) {
        throw e;
    }
};

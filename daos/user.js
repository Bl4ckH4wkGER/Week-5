const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const User = require('../models/user');

module.exports = {};

module.exports.signup = async (email, password) => {
    const passwordHash = await bcrypt.hash(password, 10);
    try {
        const newUser = await User.create({
            email: email,
            password: passwordHash,
            roles: ['user']
        });
        return newUser;
    } catch (e) {
        throw e;
    }
};

module.exports.getUser = async (email) => {
    try {
        const user = await User.findOne({ email: email });
        return user
    } catch (e) {
        throw e;
    }
};

module.exports.getUserWithoutPassword = async (email) => {
    try {
        const user = await User.findOne(
            { email: email },
            { _id: 1, email: 1, roles: 1 }
        );
        return user
    } catch (e) {
        throw e;
    }
};

module.exports.updateUserPassword = async (email, password) => {
    try {
        const newPasswordHash = await bcrypt.hash(password, 10);
        const updatedUser = User.update({ email: email }, {  password: newPasswordHash });
        return updatedUser;
    } catch (e) {
        throw e;
    }
};

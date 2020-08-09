const mongoose = require('mongoose');
// const bcrypt = require('bcrypt');

const Order = require('../models/order');
// const User = require('../models/user');

module.exports = {};

// module.exports.create = async() => {};

module.exports.getMyOrder = async(userId) => {
    try {
        const myOrder = await Order.find({ userId: userId }).lean();
        return myOrder
    } catch (e) {
        throw e;
    }
};

module.exports.getAllOrders = async() => {
    try {
        const orders = await Order.find({}).lean();
        return orders
    } catch (e) {
        throw e;
    }
};

// module.exports.getOrderId = async(orderId) => {};

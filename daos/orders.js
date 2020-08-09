const mongoose = require('mongoose');

const Order = require('../models/order');

module.exports = {};

// module.exports.create = async(userId, items) => {};

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

module.exports.adminGetOrderId = async(orderId) => {
    const validId = await mongoose.Types.ObjectId.isValid(orderId);
    try{
        if (validId) {
            // write aggregation that includes match on orderId only
            const order = await Order.aggregate([
                { $match: {orderId: orderId}},
                // rest goes here
            ]);
            return order
        }
    } catch (e) {
        throw e;
    }
};

module.exports.userGetOrderId = async(userId, orderId) => {
    const validId = await mongoose.Types.ObjectId.isValid(orderId);
    try{
        if (validId) {
            // write aggregation that includes match on userId and orderId
            const order = await Order.aggregate([
                { $match: {userId: userId}},
                { $match: {orderId: orderId}},
                // rest goes here
            ]);
            return order
        }
    } catch (e) {
        throw e;
    }
};

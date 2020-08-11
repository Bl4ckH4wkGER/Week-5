const mongoose = require('mongoose');

const Order = require('../models/order');

module.exports = {};

module.exports.create = async(userId, items, total) => {
    try {
        const newOrder = await Order.create({
            userId: userId,
            items: items,
            total: total
        });
        return newOrder
    } catch (e) {
        throw e;
    }
};

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

module.exports.getAssociatedUserIdFromOrderId = async (orderId) => {
    const validId = await mongoose.Types.ObjectId.isValid(orderId);
    try{
        if (validId) {
            const order = await Order.findOne({ _id: orderId });
            return order.userId
        }
    } catch (e) {
        throw e;
    }
};

module.exports.getOrderId = async (orderId) => {
    const validId = await mongoose.Types.ObjectId.isValid(orderId);
    try{
        if (validId) {
            let idToSearch = mongoose.Types.ObjectId(orderId)
            const order = await Order.aggregate([
                { $match : { _id : idToSearch } },
                { $lookup: {
                    from: "items",
                    localField: "items",
                    foreignField: "_id",
                    as: "items"
                }},
                { $project: {
                    "items.price": 1,
                    "items.title": 1,
                    total: 1,
                    userId: 1
                } },
                { $project: {
                    _id: 0
                }}
            ]);
            return order[0]
        }
    } catch (e) {
        throw e;
    }
};

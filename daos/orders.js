const mongoose = require('mongoose');

const Order = require('../models/order');
const item = require('../models/item');

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
            // write aggregation that includes match on orderId only
            const order = await Order.findOne({ _id: orderId });
            // const order = await Order.aggregate([
            //     { $match: { _id : orderId } },
                // { $map {
                //     input: items,
                //     as: _id,
                //     in: { $lookup: {
                //         from: "items",
                //         localField: "_id",
                //         foreignField: "_id",
                //         as "item":
                //         }
                //     }
                // }}
            // ]);
            return order
        }
    } catch (e) {
        throw e;
    }
};

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const Item = require('../models/item');

module.exports = {};

module.exports.create = async (title, price) => {
    try {
        const newItem = await Item.create({
            title: title,
            price: price
        });
        return newItem;
    } catch (e) {
        throw e;
    }
};

module.exports.getAll = async () => {
    try {
        const items = await Item.find({}).lean();
        return items
    } catch (e) {
        throw e;
    }
};

module.exports.getById = async (itemId) => {
    try {
        const validId = await mongoose.Types.ObjectId.isValid(itemId);
        if (validId) {
            const item = await Item.findOne({ _id: itemId });
            return item
        }
    } catch (e) {
        throw e;
    }
};

module.exports.updateItem = async (itemId, price) => {
    try {
        const validId = await mongoose.Types.ObjectId.isValid(itemId);
        if (validId) {
            const updatedItem = await Item.update({ _id: itemId }, {  price: price });
            return updatedItem
        }
    } catch (e) {
        throw e;
    }
};

module.exports.calcTotal = async (items) => {
    try {
        let total = 0;
        for (let i = 0; i < items.length; i++) {
            const validId = await mongoose.Types.ObjectId.isValid(items[i]);
            if (validId) {
                const item = await Item.findOne({ _id: items[i] });
                total += item.price
            } else {
                return undefined;
            }
        }
        return total
    } catch (e) {
        throw e;
    }   
}

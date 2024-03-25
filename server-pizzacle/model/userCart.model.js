const mongoose = require('mongoose');

const cartItemSchema = new mongoose.Schema({
    image: String,
    name: String,
    price: Number,
    productId: String,
    quantity: Number
});

const userCartSchema = new mongoose.Schema({
    userId: {type: String,  ref: 'User', unique:true},
    items: [cartItemSchema]
});

const UserCart = mongoose.model('UserCart', userCartSchema);

module.exports = UserCart;

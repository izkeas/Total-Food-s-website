const mongoose = require('mongoose')

const FoodModel = mongoose.model('Food', {
    name: String,
    description: String,
    type: String,
    price: Number
});

module.exports = FoodModel
const mongoose = require('mongoose');

// Declarar o esquema
const UserSchema = new mongoose.Schema({
    name: {type: String, required: true},
    description: String,
    money: Number
})

const UserModel = mongoose.model('Home', UserSchema);
module.exports = UserModel;
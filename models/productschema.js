const mongoose = require('mongoose')
const { Schema } = mongoose


const product = new Schema({
    name: String,
    price: Number,
    id: Number,
    descripation: String
})
// mongoose.model('products',product)

const p = mongoose.model('products', product)

module.exports = p





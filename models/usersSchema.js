const mongoose = require('mongoose')
const { Schema } = mongoose


const users = new Schema({
    name: String,
    password: String,
    email: String,
    role:{type:String,default:"user"}
})
// mongoose.model('products',product)

const user = mongoose.model('users', users)

module.exports = user


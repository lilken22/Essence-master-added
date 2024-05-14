const mongoose = require('mongoose');
// const bcrypt = require("bcrypt")

const cartSchema = new mongoose.Schema({
    userId: {
       type:mongoose.Schema.Types.ObjectId,
       ref: "user"
    },
    productId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product"
    },
    quantity:{
        type:Number,
        default:1
    },
    date:{
        type: Date,
        default: Date.now()
    } 
});
module.exports = mongoose.model("cart", cartSchema)
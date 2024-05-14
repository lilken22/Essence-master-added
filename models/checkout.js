const mongoose = require('mongoose');
// const bcrypt = require("bcrypt")

const checkoutSchema = new mongoose.Schema({
    userId: {
       type:mongoose.Schema.Types.ObjectId,
       ref: "user"
    },
    productId:[
        {type:mongoose.Schema.Types.ObjectId,
            ref: "product"
        }],
    date:{
        type: Date,
        default: Date.now()
    } 
});
module.exports = mongoose.model("checkout", checkoutSchema)
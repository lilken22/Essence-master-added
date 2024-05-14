const mongoose = require('mongoose');
// const bcrypt = require("bcrypt")

const favouriteSchema = new mongoose.Schema({
    userId: {
       type:mongoose.Schema.Types.ObjectId,
       ref: "user"
    },
    productId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product"
    },
    date:{
        type: Date,
        default: Date.now()
    } 
});
module.exports = mongoose.model("favourite", favouriteSchema)
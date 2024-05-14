const mongoose = require('mongoose');


const productSchema = new mongoose.Schema({
    name:{
        type: String
    },
    postBy:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    price:{
        type:Number,
    },
    displayImage:{
        type: String,
    },
    displayImageTwo:{
        type: String,
    },
    images:[{
        type: String,
    }],
    description:{
        type: String
    },
    size:[{
        type: String
    }],
    color: [
        {type: String}
    ],
    checkout:{
        type: Boolean,
        enum:[true, false],
        default: false
    }, 
    fav: {
      type:Boolean,
      enum:[true,false],
      default:false,
    },
    date:{
        type: Date,
        default: Date.now()
    }
})



module.exports = mongoose.model("Product", productSchema)
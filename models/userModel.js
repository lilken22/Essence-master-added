const mongoose = require("mongoose")
const bcrypt = require("bcrypt")


const userSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    email:{
        type: String,
        unique: true,
        require: true
    }, 
    password:{
        type:String,
        minLength: 6,
        maxLength: 15
    },
    date:{
        type: Date,
        default: Date.now()
    }
})

userSchema.pre("save", async function(next){
    const salt = 11;
    let password = this.password
    const hashedPassword = await bcrypt.hash(password, salt);
    this.password = hashedPassword;
    next()
})

module.exports = mongoose.model("User", userSchema)
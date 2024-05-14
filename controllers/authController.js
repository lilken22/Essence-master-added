const userModel = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
// const {MailSending} = require("../middleware/email")

const postRegister = async (req, res) => {
  const { name, email, password } = req.body;
  if (name != "" && email != "" && password != "") {
    const user = await userModel.findOne({ email: email });
    console.log(user);
    if (!user) {
      await userModel.create({
        name: name,
        email: email,
        password: password,
      });
       
      const message = "Registered Successfully";
      res.render("index", {message});
    }else{
      const error = "Email already exist";
      res.render("orangelogin", {error});
    }
  }
  // }else {
  //   const err = "Please fill all the necessary field"
  // }    res.render("orangelogin", { err });
      // const token = jwt.sign({email}, "Godisgood", {expiresIn: "1h"})
      // console.log(token)
  //     res.cookie("essence", token)
  //     const message = "You have successfully registered to our website Essence Master"
  //     const option = {
  //         email:email,
  //         message:message,
  //         subject:"Essence Registration status"
  //     }
  //     await MailSending(option)
  //     res.render("index", { message:"Registered successfully" });
  //   } else {
  //     const error = "Email already exist";
  //     res.render("orangelogin", { error });
  //   }
  // } else {
  //   const error = "Please fill in all the neccessary field";
  //   res.render("orangelogin", { error });
  // }
};

const postLogin = async (req, res) => {
  const { email, password } = req.body;
  if (email != "" && password != "") {
    const user = await userModel.findOne({ email: email });
    // console.log(user)
    if (user) {
      const checkPassword = await bcrypt.compare(password, user.password);
       // console.log(checkPassword)
    if (checkPassword) {
      const token = jwt.sign({email}, "Godisgood", {expiresIn: "1h"})
      // console.log(token)
      const message = "You have successfully signed up on the server"
      res.cookie("essence", token)
      const option = {
        email:email,
        message:message,
        subject:"Essence register"
      }
      //  await MailSending(option)
      res.redirect("/");
    } else {
      res.render("orangelogin", { error: "Email/Password mismatch" });
    }  
    }
  } else {
    const error = "Email or Password cannot be empty";
    res.render("orangelogin", { error });
  }
};

const logout = (req, res)=>{
  res.clearCookie("essence")
  res.redirect('/')
}

module.exports = { postRegister, postLogin, logout };

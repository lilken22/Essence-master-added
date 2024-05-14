const nodemailer = require("nodemailer");

const MailSending = (options)=>{
    const transporter = nodemailer.createTransport({
       host:"sandbox.smtp.mailtrap.io",
       port:587,
       auth:{
         user:"67e429f7c43480",
         pass:"eef85fea548fcd",
       },
    //    secure:false      
    })

    const emailOptions = {
        from:"codarhq@gmail.com",
        to:options.email,
        subject:options.subject,
        text:options.message
    }

    transporter.sendMail(emailOptions, (err, info)=>{
        if(err){
          console.log(err)
        }else{
            console.log("Email sent: " + info.response)
        }
    })
}


module.exports = (MailSending)
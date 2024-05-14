const express = require("express")
const app = express()
const mongoose = require("mongoose")
const exphb = require("express-handlebars")
const cookieparser = require("cookie-parser")
const expfileupload = require("express-fileupload")
require("dotenv").config();
const homeRoutes = require("./routes/home")
const auth = require("./routes/auth")
const payment = require("./routes/payment")

mongoose.connect(process.env.MONGO_URL).then(()=>{
    console.log("DB connected successfully");
}).catch((err)=>{
    console.log(err.message)
    console.log("error connecting to mongodb");
})

app.engine("hbs", exphb.engine({
    extname:".hbs",
    defaultLayout:"main",
    runtimeOptions:{
        allowProtoMethodsByDefault:true,
        allowProtoPropertiesByDefault: true
    }
}))
app.set("view engine", "hbs");
app.use(cookieparser())
app.use(expfileupload())
app.use(express.static("public"))
app.use(express.urlencoded({extended: false}))
app.use(express.json());
app.use("/", homeRoutes)
app.use("/", auth)
app.use("/", payment)


const port = process.env.PORT
app.listen(port, ()=>{
    console.log("listening on port "+ port);
})
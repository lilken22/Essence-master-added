const jwt = require("jsonwebtoken")

function verify(req, res, next){
    const token = req.cookies.essence
    if(!token){
        return res.redirect("/login")
    }

    jwt.verify(token, "Godisgood", (err, decoded)=>{
        if(err){
        return res.redirect("/login")
        }

        req.user = decoded
        next();
    })
}

function checkUser(req, res, next){
    const token = req.cookies.essence
    const decoded = jwt.decode(token, "Godisgood")
    req.user = decoded
    next();
}



module.exports = {verify, checkUser}
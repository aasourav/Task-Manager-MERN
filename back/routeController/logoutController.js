const dotenv = require('dotenv')
const jwt = require('jsonwebtoken')
dotenv.config()

const logoutController = (req,res)=>{
    const cookies = req.header.cookie;
    try{
        if(!cookies){
            return res.status(500).send("empty cookie")
        }

        const token = cookies.split("=")[1]
        const verifyToken = jwt.verify(token,process.env.JWT)
        if(!verifyToken){
            return res.status(500).send("Token Invalid")
        }

        res.clearCookie(`${verifyToken.id}`)
        req.cookies[`${verifyToken.id}`] = ''
        res.status(200).send("successfully logged out")
    }
    catch(e){
        console.log("something Error in catch in logout")
    }
}


module.exports = logoutController
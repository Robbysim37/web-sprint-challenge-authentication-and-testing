const {JWT_SECRET} = require("../../secret")
const jwt = require("jsonwebtoken")

const restrict = (req, res, next) => {
  const token = req.headers.authorization
  if(!token) { 
    res.status(401).json({message: "Token required"})
  }else{
    jwt.verify(token,JWT_SECRET, (err,decodedToken) => {
      if (err){
        res.status(401).json({message:"Token invalid"})
      }else{
        req.decodedToken = decodedToken
        next()
      }
    })    
  }
}

module.exports = {
  restrict
};

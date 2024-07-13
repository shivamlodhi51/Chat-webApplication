const jwt = require('jsonwebtoken');
const User = require('../Models/userModel');


const authMiddleware =async (req, res, next) =>{

        
    
    const token = req.header('Authorization');

    if(!token){
        return res.status(400).json({message : "Unauthorized HTTP, Token not provided"});
    }
    
    // removing Bearer
    
    const jwttoken = token.replace("Bearer", "").trim();
    console.log("token form auth middleware", jwttoken);
    try {
        const isVerified = jwt.verify(jwttoken, process.env.JWT_SECRET);
        console.log(isVerified);
        const userData = await User.findOne({email:isVerified.email}).select({password: 0,});
        console.log(userData);

        req.user = userData;
        req.token = token;
        req.userID = userData._id;
} catch (error) {
        return res.status(400).json({message: "Invalid Token"});
}
    next();
};
module.exports = {authMiddleware}
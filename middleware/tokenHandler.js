
const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const validateToken = asyncHandler (async (req,res,next) =>{
    const authHandler = req.headers.authorization
    if(authHandler && authHandler.startsWith("Bearer")){
        const token = authHandler.split(" ")[1];
        jwt.verify(token,process.env.ACCESS_TOKEN_SECRET,(err,decoded)=>{
            if(err){
                res.status(401);
                throw new Error("User is not authorized");
            }
            req.user = decoded.userDetails;
            next();
        });
    }
    else{
        res.status(401);
        throw new Error("User is not authenticated");
    }
})

module.exports = validateToken
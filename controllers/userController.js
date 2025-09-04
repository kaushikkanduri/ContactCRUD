
const asyncHandler = require('express-async-handler');
/** @type {import("mongoose").Model<import("mongoose").Document>} */
const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


//@desc Register User
//@route POST /api/users/register
//@access public
const registerUser = asyncHandler (async(req,res)=>{
    
    const {username,email,password} = req.body;
    const existUser = await User.findOne({email});
    if(existUser){
        res.status(400);
        throw new Error("Email already exists.");
    }

    const hashedPassword = await bcrypt.hash(password,10);
    const newUser = await User.create({
        username,
        email,
        password:hashedPassword
    })

    res.status(201).json({_id:newUser._id,
        username:newUser.username,
        email:newUser.email
    });
})

//@desc Login User
//@route POST /api/users/login
//@access public
const loginUser = asyncHandler (async(req,res)=>{
    const {email,password} = req.body;
    if(!email || !password){
        res.status(400);
        throw new Error("All fields are necessary");
    }

    const user = await User.findOne({email});
    const isMatch = await bcrypt.compare(password,user.password);

    if(user && isMatch){
        const accessToken = jwt.sign({
            userDetails : {
                id: user._id,
                username: user.username,
                email: user.email
            }
        },
        process.env.ACCESS_TOKEN_SECRET,
        {expiresIn: "10m"})

        res.json({accessToken})
    }
    else{
        res.status(401);
        throw new Error("Email or password is incorrect");
    }

})

//@desc Curretn User info
//@route GET /api/users/current
//@access private
const currentUserInfo = asyncHandler (async(req,res)=>{
    res.json(req.user);
})

module.exports = {
    registerUser,
    loginUser,
    currentUserInfo
}
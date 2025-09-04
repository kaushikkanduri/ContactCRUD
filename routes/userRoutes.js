const express = require("express");
const { registerUser,loginUser,currentUserInfo } = require("../controllers/userController");
const router = express.Router();
const validateToken =require('../middleware/tokenHandler');

router.post('/register',registerUser);

router.post('/login',loginUser);

router.get('/current',validateToken, currentUserInfo);

module.exports = router
const CryptoJS = require("crypto-js");
const dotenv = require("dotenv");

const User = require("../models/user");
const { createToken } = require('./jwtService')

const session = require('express-session'); 

async function registerUser(req, res) {
    
    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) {
        throw new Error("Email already exists");
    }
    
    const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: CryptoJS.AES.encrypt(req.body.password, process.env.PASS_SECRETKEY).toString(),
    });

    try {
        const savedUser = await newUser.save();
        return savedUser;
    } catch (error) {
        throw error;
    }
}

async function loginUser(req, res) {
    try {
        const user = await User.findOne({ email: req.body.email});
        if(!user) {
            throw new Error("Wrong Credentials");
        }

        const hashedPassword = CryptoJS.AES.decrypt(user.password, process.env.PASS_SECRETKEY);
        const ogPassword = hashedPassword.toString(CryptoJS.enc.Utf8);
        if(ogPassword !== req.body.password) {
            throw new Error("Wrong Credentials");
        }

        const accessToken = createToken(user);

        const { password, ...others } = user._doc;

        // req.session.user = {
        //     id: others._id,
        //     name: others.name,
        //     email: others.email,
        //     token: accessToken,
        // };
        const userDetails = {
            name: others.name,
            email: others.email,
            token: accessToken,
        }

        return userDetails;

    } catch (err) {
        throw err;
    }
}

module.exports = {
    registerUser,
    loginUser,
}
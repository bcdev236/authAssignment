const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");

const createToken = (user) => {
    const accessToken = jwt.sign(
        {
            id: user._id,
            email: user.email
        },
        process.env.JWT_SECRETKEY,
        {expiresIn: "1d"}
    );

    return accessToken;
}

const verifyToken = (req, next) => {
    const authHeader = req.headers.token;
    if(authHeader){
        const token = authHeader.split(" ")[1];
        jwt.verify(token, process.env.JWT_SECRETKEY, (err,user) => {
            if(err) res.status(403).json("Token is not valid !");
            req.user = user;
            next();
        })
    } else{
        res.status(401).json("You are not authenticated");
    }
}

module.exports = {
    createToken,
    verifyToken
}
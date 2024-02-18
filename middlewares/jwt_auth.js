//verify jwt
const jwt = require("jsonwebtoken");
const userModel = require('../models/user_model');

const verifyToken = async (req, res, next) => {
    try {
        const token = req.headers.authorization || req.query.token || false;
        console.log("token", token)
        if (token) {
            let decodedToken = jwt.verify(token, process.env.JWT_SECRET);
            console.log("decoded token", decodedToken)
            if (!decodedToken) {
                return res.status(401).json({
                    "message": "authentication error"
                });
            }
            let mobileNumber = decodedToken.mobileNumber || false;
            if (mobileNumber) {
                let user = await userModel.findOne({ mobileNumber });
                if (user && user.token && user.token == token) {
                    req.mobileNumber = mobileNumber;
                    return next();
                }
            }
        }
        return res.status(401).json({
            "message": "unauthorized client"
        });
    } catch (err) {
        return next(err);
    }
};

module.exports = {
    verifyToken
}


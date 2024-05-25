const  User = require('../models/Users/userModel')
const Vendor = require('../models/Users/vendorModel')
const Admin = require('../models/Users/adminModel')


const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');

const authMiddleware =asyncHandler(async (req, res, next) => {
    let token;
    if(req.cookies && req.cookies.token){
        token = req.cookies.token;
        try {
            if(token){
                const decoded = jwt.verify(token, process.env.JWT_SECRET);
                // console.log(decoded);
                const id = decoded.userId;
                let user;

                user= await User.findById(id);
                if(user){
                    req.user = user;
                    return next();
                }
                user = await Vendor.findById(id);
                if(user){
                    req.user = user;
                    return next();
                }
                user =await Admin.findById(id);
                if(user){
                    req.user = user;
                    return next();
                }
                throw new Error ('User not found');   
            }
        } catch (error) {
            throw new Error("Not authorized token expired, plz login again");
        }
    }else{
        throw new Error('There is no token attached to header');
    }
});

module.exports = authMiddleware;
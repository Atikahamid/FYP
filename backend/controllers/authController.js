// const { validationResult } = require("express-validator");
const User = require('../models/Users/userModel');
const UserAdress = require('../models/Users/userAddressModel');
const Vendor = require('../models/Users/vendorModel')
const VendorAddress = require('../models/Users/vendorAddressModel')
const Admin = require('../models/Users/adminModel')
const { hashPassword, comparePassword } = require('../helpers/authPassword')
const jwt = require('jsonwebtoken');
const generateToken = require('../helpers/jwt')
const nodemailer = require('nodemailer')
const validateMongoId = require('../helpers/validateId')
const { google } = require('googleapis')
const generateUniqueToken = require('../helpers/uniqueToken')
const generateRefreshToken = require('../helpers/refreshToken')

const test = (req, res) => {
    res.json('test is working')
}
//Register user endpoint
const registerUser = async (req, res) => {
    try {
        const { fullName, gender, email, password, dateOfBirth, phoneNumber, streetName, regestrationDate, city, postalCode, country } = req.body;

        // to check that if user has already registered
        const isExistsinUser = await User.findOne({ email });
        const isExistsinVendor = await Vendor.findOne({ email });
        if (isExistsinUser || isExistsinVendor) {
            return res.status(409).json({
                success: false,
                msg: 'Email allready exist plz try with another email',
            });
        }
        //create Address
        const address = await UserAdress.create({
            streetName, city, postalCode, country
        });

        //hashed password
        const hashedPassword = await hashPassword(password)

        //to create new user
        const user = await User.create({
            fullName, email, gender,
            password: hashedPassword,
            dateOfBirth, phoneNumber,
            addressId: address._id,
            regestrationDate
        })

        return res.json({ success: true, user });

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            msg: 'Registeration failed plz try again later',
            error: error
        });
    }
}

//register vendor endpoint
const registerVendor = async (req, res) => {
    4
    try {
        const { fullName, gender, email, password, dateOfBirth, phoneNumber, streetName, regestrationDate, city, postalCode, entity, country } = req.body;

        //to check if user has already exist
        const existsinVendor = await Vendor.findOne({ email });
        const existsinUser = await User.findOne({ email });
        if (existsinVendor || existsinUser) {
            return res.status(408).json({
                success: false,
                msg: 'Email already exist plz try with another email',
                error: 'email already existed',
            });
        }

        //create address
        const address = await VendorAddress.create({
            streetName, city, postalCode, country
        });

        //hashed password
        const hashedPassord = await hashPassword(password)

        //to create new vendor
        const vendor = await Vendor.create({
            fullName, email, gender,
            password: hashedPassord,
            dateOfBirth, phoneNumber,
            addressId: address._id,
            entity,
            regestrationDate
        })

        return res.json({ success: true, vendor });

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            msg: 'Registeration failed plz try again later',
            error: error
        });
    }
}

//register  Admin endpoint
const registerAdmin = async (req, res) => {
    try {
        const { fullName, gender, email, password, phoneNumber, regestrationDate } = req.body;

        // to check if user has alreay registered
        const isExists = await Admin.findOne({ email });
        if (isExists) {
            return res.status(409).json({
                success: false,
                msg: 'Email allready exist',
            });
        }
        //hashed password
        const hashedPassword = await hashPassword(password)

        //to create new user
        const admin = await Admin.create({
            fullName, email, gender,
            password: hashedPassword,
            phoneNumber,
            regestrationDate
        })

        return res.json({ success: true, admin });

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            msg: 'Registeration failed plz try again later',
            error: error
        });
    }
}


//login endpioint
const loginUser = async (req, res) => {

    try {
        const { email, password } = req.body;

        // check if user exist in vendor table 
        let user = await Vendor.findOne({ email });
        let role = 'vendor';

        //if not found in vemndor tavble check customer table
        if (!user) {
            user = await User.findOne({ email });
            role = 'customer';
        }

        //check in admin table
        if (!user) {
            user = await Admin.findOne({ email });
            role = 'admin';
        }

        if (!user) {
            return res.status(404).json({
                error: 'No user found with this email'
            });
        }
        //check if password matches
        const match = await comparePassword(password, user.password);

        if (match) {
            const token = generateToken(user._id, user.email, role, user.fullName);
            res.cookie('token', token, {
                httpOnly: true,
                maxAge: 72 * 60 * 60 * 1000,
            }).json({ success: true, token, role, userId: user._id, email: user.email, fullName: user.fullName });
        } else {
            res.status(401).json({
                success: false, error: 'Password do not match'
            });
        }

    } catch (error) {
        console.log(error);
        return res.status(501).json({
            success: false,
            msg: 'Login failed plz try again later '
        });
    }

}



//refresh token 
const handleRefreshToken = async (req, res) => {
    const cookie = req.cookies;
    console.log("cookie: ", cookie);
    if (!cookie?.token) throw new Error('No Refresh Token in cookies');
    const refreshToken = cookie.token;
    console.log("refreshToken", refreshToken);
    let user = await User.findOne({ refreshToken });
    if (!user) {
        user = await Vendor.findOne({ refreshToken });
    }
    if (!user) throw new Error('No user found')
    jwt.verify(refreshToken, process.env.JWT_SECRET, (err, decoded) => {
        console.log("decoded1: ", decoded);
        if (err || user.id !== decoded.id) {
            console.log("decoded : ", decoded);
            throw new Error('There is something wrong with refresh Token');
        }
        const accessToken = generateToken(user?._id);
        res.json({ accessToken });
    })
}

//get all user endpoint
const getAllUser = async (req, res) => {
    try {
        const getUsers = await User.find().populate('addressId');
        res.json(getUsers);
    } catch (error) {
        throw new Error(error);
    }
}

//get all vendors endpoint
const getAllVendor = async (req, res) => {
    try {
        const getVendors = await Vendor.find().populate('addressId');
        res.json(getVendors);
    } catch (error) {
        throw new Error(error);
    }
}

//get a single user

const getaUser = async (req, res) => {
    const { _id } = req.user;
    try {
        const getaUser = await User.findById(_id).populate('addressId');
        if(!getaUser){
            return res.status(404).json({error: 'User not found'});
        }
        const address = await UserAdress.findById(getaUser.addressId);
        if(!address){
            return res.status(404).json({
                error: 'Address not fund'
            });
        }
        res.json({
            getaUser,
            address
        });
    } catch (error) {
        throw new Error(error);
    }
}

//get user based on id from params
const getaUserID = async (req, res) => {
    const { id } = req.params;
      validateMongoId(id);
    try {
        const getaUser = await User.findById(id);
        if(!getaUser){
            return res.status(404).json({error: 'User not found'});
        }
        const address = await UserAdress.findById(getaUser.addressId);
        if(!address){
            return res.status(404).json({
                error: 'Address not fund'
            });
        }
        res.json({
            getaUser,
            address
        });
    } catch (error) {
        throw new Error(error);
    }
}

//get a vendor

const getaVendor = async (req, res) => {
    const { _id } = req.user;
    // validateMongoId(id);
    try {
        const getaVendor = await Vendor.findById(_id);
        if(!getaVendor){
            return res.status(404).json({
                error:'seller not found'
            });
        }
        const address = await VendorAddress.findById(getaVendor.addressId);
        if(!address){
            return res.status(404).json({
                error:'Address not found'
            });
        }
        res.json({
            getaVendor,
            address
        });
    } catch (error) {
        throw new Error(error);
    }
}

//to delete a single user 
const deleteaUser = async (req, res) => {
    const { id } = req.params;
    validateMongoId(id);
    try {
        const deleteaUser = await User.findByIdAndDelete(id);
        if (!deleteaUser) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json({
            deleteaUser,
        });
    } catch (error) {
        throw new Error(error);
    }
}

//delete vendor
const deleteaVendor = async (req, res) => {
    const { id } = req.params;
    validateMongoId(id);
    try {
        const deleteaVendor = await Vendor.findByIdAndDelete(id);
        if (!deleteaVendor) {
            return res.status(404).json({ error: 'Vendor not found' });
        }
        res.json({
            deleteaVendor,
        });
    } catch (error) {
        throw new Error(error);
    }
}

//to update a user
const updateaUser = async (req, res) => {
    const { _id } = req.user;
    // validateMongoId(_id);
    try {
        // Fetch the user to get the addressId
        const user = await User.findById(_id);
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        // Update the user information
        const updateUser = await User.findByIdAndUpdate(
            _id,
            {
                fullName: req.body.fullName,
                email: req.body.email,
                dateOfBirth: req.body.dateOfBirth,
                phoneNumber: req.body.phoneNumber,
            },
            {
                new: true,
            }
        );

        // Update the address information
        const updateAddress = await UserAdress.findByIdAndUpdate(
            user.addressId,
            {
                streetName: req.body.streetName,
                city: req.body.city,
                postalCode: req.body.postalCode,
                country: req.body.country,
            },
            {
                new: true,
            }
        );

        res.json({ success: true, data: { updateUser, updateAddress } });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}


//update -vendor endpoint
const updateaVendor = async (req, res) => {
    const { _id } = req.user;
    // validateMongoId(_id);
    try {
        const updateVendor = await Vendor.findByIdAndUpdate(
            _id,
            {
                fullName: req?.body?.fullName,
                email: req?.body?.email,
                dateOfBirth: req?.body?.dateOfBirth,
                phoneNumber: req?.body?.phoneNumber,
                streetName: req?.body?.streetName,
                city: req?.body?.city,
                postalCode: req?.body?.postalCode,
                country: req?.body?.country,
            },
            {
                new: true,
            }
        );
        res.json({success: true, data: updateVendor});
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}

// find vendor by id
const getaVendorID = async (req, res) => {
    const { id } = req.params;
      validateMongoId(id);
    try {
        const getaUser = await Vendor.findById(id);
        if(!getaUser){
            return res.status(404).json({error: 'User not found'});
        }
        const address = await VendorAddress.findById(getaUser.addressId);
        if(!address){
            return res.status(404).json({
                error: 'Address not fund'
            });
        }
        res.json({
            getaUser,
            address
        });
    } catch (error) {
        throw new Error(error);
    }
}

const forgetPassword = async (req, res) => {

    try {
        const { email } = req.body;
        let user = await Vendor.findOne({ email });

        if (!user) {
            user = await User.findOne({ email });
        }
        if (!user) {
            return res.json({
                message: 'user not registered'
            })
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '5m' });

        //send email through nodemailer

        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'hafizaatika965@gmail.com',
                pass: 'uuvf vjtk oudd dawg'
            }
        });

        var mailOptions = {
            from: 'hafizaatika965@gmail.com',
            to: email,
            subject: 'Password reset',
            text: `http://localhost:3000/resetPassword/${token}`
        };

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                return res.json({ message: 'error sending email', error: error })
            } else {
                return res.json({
                    success: true,
                    msg: 'email sent', info
                })
            }
        });
    } catch (error) {
        console.log(error);
    }
}


//reset password endpoint
const resetPassword = async (req, res) => {
    const token = req.params.token;
    const { password } = req.body;
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const id = decoded.id;
        // console.log(decoded);
        let user = await User.findById(id);
        if (user) {
            //Id exists in user table
            const hashedPassword = await hashPassword(password);
            await User.findByIdAndUpdate({ _id: id }, { password: hashedPassword })
            return res.json({ status: true, msg: "password updated" })
        }

        let vendor = await Vendor.findById(id);
        if (vendor) {
            const hashedPassword = await hashPassword(password);
            await Vendor.findByIdAndUpdate({ _id: id }, { password: hashedPassword })
            return res.json({ status: true, msg: "password updated" })
        }

        let admin = await Admin.findById(id);
        if (admin) {
            const hashedPassword = await hashPassword(password);
            await Admin.findByIdAndUpdate({ _id: id }, { password: hashedPassword })
            return res.json({ status: true, msg: "password updated" })
        }
    } catch (error) {
        return res.json({ msg: "invalid token" })
    }
}

//verify token endpoint
const verifyToken = async (req, res) => {
    return res.json({
        status: true,
        msg: 'Authorized'
    })
};

//logout end point

const logout = async (req, res) => {
    res.clearCookie('token');
    return res.json({ status: true, msg: 'Logout successfully' });

    // const cookie = req.cookies;
    // console.log(cookie);
    // if(!cookie?.token) throw new Error("No refreshToken in cookie");
    // const refreshToken = cookie.token;
    // const user= await User.findOne({refreshToken});
    // if(!user){
    //     res.clearCookie("refresToken", {
    //         hhtpOnly: true,
    //         secure: true,
    //     });
    //     return res.status(204);
    // }
    // await User.findOneAndUpdate(refreshToken, {
    //     refreshToken: "",
    // });
    // res.clearCookie("refresToken", {
    //     hhtpOnly: true,
    //     secure: true,
    // });
    // return res.status(204);


};


module.exports = {
    test,
    registerUser,
    loginUser,
    registerVendor,
    registerAdmin,
    getAllUser,
    getAllVendor,
    getaUser,
    forgetPassword,
    deleteaUser,
    updateaUser,
    handleRefreshToken,
    logout,
    resetPassword,
    verifyToken,
    getaVendor,
    deleteaVendor,
    updateaVendor,
    getaUserID,
    getaVendorID
}
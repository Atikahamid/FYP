const { validationResult } = require("express-validator");
const User= require('../models/userModel');


const test = (req, res)=>{
    res.json('test is working')
}

const registerUser = async(req, res) => {
    try {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({
                success: false,
                msg:'Errors',
                errors: errors.array()
            });
           }
        
        
        const { firstName, lastName, email, password, dateOfBirth, phoneNumber, addressId, regestrationDate} = req.body;

        // to check that if user has already registered
        const isExists= await User.findOne({email});
        if(isExists){
            return res.status(400).json({
                success: false,
                msg:'Email already exist'
            });
        }
        //to create new user
        const user = await User.create({
            firstName, lastName, email, password, dateOfBirth, phoneNumber, addressId, regestrationDate  
        })

        return res.json(user);
        
    } catch (error) {
        console.log(errors)
    }
}

module.exports = {
    test,
    registerUser
}
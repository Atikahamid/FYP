const { check } = require('express-validator');

const validateUserRegistration = [
    check('firstName').notEmpty().withMessage("First name is required"),
    check('lastName').notEmpty().withMessage("Last name is required"),
    check('email').isEmail().normalizeEmail({gmail_remove_dots:true}).withMessage("Invalid Email address"),
    check('password').isStrongPassword({
        minLength:6,
        minUppercase:1,
        minLowercase:1,
        minNumbers:1
    }).withMessage('Password must be at least 6 characters long and must contain 1 uppercase and 1 lowercase 1 number and 1 special character'),
    check('dateOfBirth').isISO8601().withMessage('Invalid date format for date of birth'),
    check('phoneNumber').isMobilePhone('any').isLength({min: 11, max: 11}).withMessage('Invalid phone number')
    
]

module.exports = {
    validateUserRegistration
}
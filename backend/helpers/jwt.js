const jwt = require('jsonwebtoken');

const generateToken = (userId, role, email, fullName) =>{
    const payload = {
        userId,
        role,
        email,
        fullName
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: '3d'});

    return token;
};

module.exports = generateToken;

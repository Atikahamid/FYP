const jwt = require('jsonwebtoken');


const verifyUser = async (req, res, next)=>{
    try {
        const token = req.cookie.token;
        if(!token){
            return res.json({
                status:false,
                msg: 'No token'
            })
        }
        const decoded = await jwt.verify(token, process.env.JWT_SECRET);
        next();
    } catch (error) {
        return res.json(error);
    }
};

module.exports = verifyUser;
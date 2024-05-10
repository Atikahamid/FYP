const bcryppt = require('bcrypt');

const hashPassword =(password) =>{
    return new Promise((resolve, reject)=>{
        bcryppt.genSalt(12,(err, salt)=>{
            if(err){
                reject(err)
            }
            bcryppt.hash(password, salt, (err, hash)=>{
                if(err){
                    reject(err)
                }
                resolve(hash)
            })
        })
    })
}

const comparePassword = (password, hashed) =>{
    return bcryppt.compare(password, hashed)
}

module.exports = {
    hashPassword, 
    comparePassword
}
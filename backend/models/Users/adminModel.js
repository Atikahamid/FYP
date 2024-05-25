const mongoose = require('mongoose')
const {Schema} = mongoose


const adminSchema = new Schema ({
    fullName: {
        type: String,
        required: true,
        trim: true
    },
    gender:{
        type: String,
        enum: ['male', 'female', 'other']
    },
    email:{
        type: String,
        required:true,
        unique: true,
        trim: true,
        lowercase: true
    },
    password:{
        type: String,
        required:true,
        trim: true
    },
    phoneNumber:{
        type: String,
        required:true,
        trim: true
    },
    refreshToken:{
        type: String
    },
    regestrationDate:{
        type: Date,
        default:Date.now
    }
});

const Admin = mongoose.model('Admin', adminSchema);

module.exports = Admin;
const mongoose = require('mongoose')
const { Schema } = mongoose
const ObjectId = Schema.Types.ObjectId;

const userShema = new Schema({
    firstName:{
        type: String,
        required:true,
        trim: true
    },
    lastName:{
        type: String,
        required:true,
        trim: true
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
    dateOfBirth:{
        type: Date,
        required:true
    },
    phoneNumber:{
        type: String,
        required:true,
        trim: true
    },
    addressId:{
        type: ObjectId,
        ref:'Address'
    },
    regestrationDate:{
        type: Date,
        default:Date.now
    }
});

const User = mongoose.model('User', userShema);

module.exports = User;
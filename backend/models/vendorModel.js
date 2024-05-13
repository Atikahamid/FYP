const mongoose = require('mongoose')
const {Schema} = mongoose
const ObjectId = Schema.Types.ObjectId;

const vendorSchema = new Schema({
    fullName:{
        type: String,
        required:true,
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
    dateOfBirth:{
        type: Date,
        required:true
    },
    phoneNumber:{
        type: String,
        required:true,
        trim: true
    },
    entity:{
        type: String,
        enum: ['independent seller', 'Business owner']
    },
    addressId:{
        type: ObjectId,
        ref:'Vendor_Adress'
    },
    refreshToken:{
        type: String
    },
    regestrationDate:{
        type: Date,
        default:Date.now
    }
});

const Vendor = mongoose.model('Vendor', vendorSchema);

module.exports = Vendor;
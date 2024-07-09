const mongoose = require('mongoose')
const { Schema } = mongoose
const ObjectId = Schema.Types.ObjectId;

const userShema = new Schema({
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
    addressId:{
        type: ObjectId,
        ref:'User_Adress'
    },
    regestrationDate:{
        type: Date,
        default:Date.now
    },
    cart: [{
        productId: {
            type: ObjectId,
            ref: 'Product'
        },
        quantity: {
            type: Number,
            default: 1
        },
        offer_price: {
          type: Number,
          default: 0
        }
    }],
    refreshToken:{
        type: String
    }
},{
    timestamps:true
});

const User = mongoose.model('User', userShema);

module.exports = User;
const mongoose = require('mongoose')
const { Schema } = mongoose 

const addressUserSchema = new Schema({
    streetName:{
        type: String,
        required:true,
        trim: true
    },
    city:{
        type: String,
        enum: ['Karachi', 'Lahore', 'Islamabad', 'Faislabad']
    },
    postalCode:{
        type: Number,
        required:true
    },
    country:{
        type: String,
        default: 'Pakistan'
    }
});

const UserAdress = mongoose.model('User_Adress', addressUserSchema);

module.exports = UserAdress;
const mongoose = require('mongoose')
const { Schema } = mongoose 

const addressVendorSchema = new Schema({
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

const VendorAddress = mongoose.model('Vendor_Adress', addressVendorSchema);

module.exports = VendorAddress;
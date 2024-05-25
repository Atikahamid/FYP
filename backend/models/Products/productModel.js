const mongoose = require('mongoose')
const { Schema } = mongoose
const ObjectId = Schema.Types.ObjectId;

const productShema = new Schema({
    title:{
        type: String,
        required:true,
    },
    description:{
        type: String,
        required: true
    },
    price:{
        type: Number,
        required:true,
    },
    quantity:{
        type: Number,
        required:true,
    },
    condition:{
        type: String,
        enum:['used', 'new']
    },
    makes_model_year:{
        type: String,
        required:true,
        trim: true
    },
    brand:{
        type: string,
        required:true
    },
    regestrationDate:{
        type: Date,
        default:Date.now
    },
    vendor_id:{
        type: ObjectId,
        ref: 'Vendor'
    },
    category_id:{
        type: ObjectId,
        ref: 'Category'
    }
},{
    timestamps:true
});

const Product = mongoose.model('Product', productShema);

module.exports = Product;
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
        type: String,
        required:true
    },
    sold:{
        type: Number,
        default: 0,
        // select:false
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
    },
    subcategory_id:{
        type: ObjectId,
        ref:'Subcategory'
    },
    images:[{
       public_id: {
        type: String,
        required: true
       },
       url: {
        type: String,
        required: true
       }
    }]
},{
    timestamps:true
});

const Product = mongoose.model('Product', productShema);

module.exports = Product;
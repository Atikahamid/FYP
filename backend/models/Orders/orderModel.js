const mongoose = require('mongoose');
const {Schema} = mongoose;
const ObjectId = Schema.Types.ObjectId;

const orderSchema = new Schema({
    user:{
        type: ObjectId,
        ref: 'User',
        required: true
    },
    vendor:{
        type: ObjectId,
        ref:'Vendor',
        required: true
    },
    items:[{
       product: {
        type: ObjectId,
        ref: 'Product',
        required: true
       },
        quantity: {
            type: Number,
            required: true
        },
        price: {
            type: Number,
            required: true
        },
        offerPrice: {
            type: Number,

        }
    }],
    totalAmount: {
        type: Number,
        required: true
    },
    paymentMethod: {
        type: String,
        enum: ['Cash on Delivery'],
        default:'Cash on Delivery',
        
    },
    status: {
        type: String,
        enum:['Pending', 'Delivered', 'Cancelled' ],
        default: 'Pending'
    },
    shippingAddress: {
        type: String,
        required: true
    },
    orderDate: {
        type: Date,
        default: Date.now
    },
    deliveryDate: {
        type: Date
    }
}, {
    timestamps: true
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
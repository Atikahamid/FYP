const mongoose = require('mongoose');
const {Schema} = mongoose;
const ObjectId = Schema.Types.ObjectId;

const offerSchema = new Schema({
    offer_price: {
        type: Number,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    vendor_id: {
        type: ObjectId,
        ref:'Vendor',
        required: true

    },
    user_id: {
        type: ObjectId,
        ref:'User',
        required: true
    },
    product_id: {
        type: ObjectId,
        ref:'Product',
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'accept', 'reject'],
        default:'pending'
    }

});

module.exports = mongoose.model('Offer', offerSchema);
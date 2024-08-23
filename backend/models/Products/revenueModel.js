const mongoose = require('mongoose');
const { Schema } = mongoose;
const ObjectId = Schema.Types.ObjectId;

const revenueSchema = new Schema({
    vendor_id: {
        type: ObjectId,
        required: true,
        trim: true
    },
    total_Revnue: {
        type: number,
        default:0
       
    },
   
}, {
    timestamps: true
});

const Revenue = mongoose.model('Revenue', revenueSchema);

module.exports = Revenue;
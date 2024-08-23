import mongoose, {model} from 'mongoose';
const {Schema} = mongoose;

const PaymentSchema = new Schema ({
    order_id: {
        type: String,
        required: true
    },
    payment_id:{
        type: String,
        required: true
    },
    signature:{
        type: String,
        required:true
    },
    date: {
        type: Date,
        default:Date.now
    }
});

export default model('payment', PaymentSchema);
const mongoose = require('mongoose');
const { Schema } = mongoose;

const categorySchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        trim: true
    },
    regestrationDate:{
        type: Date,
        default:Date.now
    }

}, {
    timestamps: true
});

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;
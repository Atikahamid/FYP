const mongoose = require('mongoose');
const { Schema } = mongoose;

const ImageSchema = new mongoose.Schema({
    public_id: {
      type: String,
      required: true
    },
    url: {
      type: String,
      required: true
    }
  });
  

const subcategorySchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    category_id: {
        type: Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },
    description: {
        type: String,
        trim: true
    },
    image: ImageSchema 
}, {
    timestamps: true
});

const Subcategory = mongoose.model('Subcategory', subcategorySchema);

module.exports = Subcategory;
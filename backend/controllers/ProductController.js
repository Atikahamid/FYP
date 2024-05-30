const upload = require('../helpers/gridfs')
const Product = require('../models/Products/productModel');
const Vendor = require('../models/Users/vendorModel')
const Category = require('../models/Products/category');
const Subcategory = require('../models/Products/subcategory');



const createProduct = async (req, res) =>{
   try {
    const {title, description, price,  quantity, condition, makes_model_year, brand, vendor_id, category_name, subcategory_name } = req.body;
    
    //check if vendor exist
    const vendor = await Vendor.findById(vendor_id);
    if(!vendor){
        return res.status(404).json({msg: 'vendor not found'});
    }

    //find category by name
    const category = await Category.findOne({name: category_name});
    if(!category){
        return res.status(404).json({msg: 'category not found'});
    }

    //find sub category by name
    const subcategory = await Subcategory.findOne({name: subcategory_name, category_id: category._id });
    if(!subcategory){
        return res.status(404).json({msg: 'subcategory not found'});
    }

    //get the image file IDS
    const images = req.files.map(file => file.id);
    
    const newProduct = new Product({
        title,
        description,
        price,
        quantity,
        condition,
        makes_model_year,
        brand,
        vendor_id,
        category_id: category._id,
        subcategory_id: subcategory._id,
        images
    });

    const saveedProduct = await newProduct.save();
    res.status(201).json(saveedProduct);

   } catch (error) {
    throw new Error("error: ", error);
   }
}




module.exports= {
    createProduct
}
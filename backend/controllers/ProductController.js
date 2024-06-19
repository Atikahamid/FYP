const upload = require('../helpers/gridfs')
const Product = require('../models/Products/productModel');
const Vendor = require('../models/Users/vendorModel')
const Category = require('../models/Products/category');
const Subcategory = require('../models/Products/subcategory');
const validateMongoId = require('../helpers/validateId');
const slugify = require('slugify');
const cloudinary = require('../helpers/cloudinary');

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

    
    // Upload images to Cloudinary
    const images = [];
    for (const file of req.files) {
      const result = await cloudinary.uploader.upload(file.path, {
        folder: 'products',
      });
      images.push({ public_id: result.public_id, url: result.secure_url });
    }

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
        console.error('Error creating product:', error);
        res.status(500).json({ msg: 'Error creating product', error: error.message });
   }
}

//get a single product
const getaProduct = async(req, res) =>{
    const {id} =req.params;
    validateMongoId(id);
    try {
        const getaproduct = await Product.findById(id).populate('category_id subcategory_id vendor_id');
        res.json(getaproduct);
    } catch (error) {
        throw new Error(error);
    }
}

//get all products
const getAllProducts = async (req, res) =>{
    try {
        const getallproducts = await Product.find();
        res.json(getallproducts);
    } catch (error) {
        throw new Error(error);
    }
}

//update product endpoint
const updateProduct= async(req, res) =>{
    const {id} = req.params;
    validateMongoId(id);
    try {
        const updateproduct = await Product.findByIdAndUpdate(id, req.body, {new: true});
        res.json({
            success: true, 
            data: updateproduct
        });
    } catch (error) {
        throw new Error(error);
    }
}

//delete a product
const deleteProduct = async(req, res) =>{
    const {id} = req.params;
    validateMongoId(id);
    try {
        const deleteproduct = await Product.findByIdAndDelete(id);
        res.json({
            success: true, 
            msg:'folllowing data will be deleted',
            data: deleteproduct
        });
    } catch (error) {
        throw new Error(error);
    }
}

//get product based on subCategory id
const getProductsOnsubcategoryId = async(req, res) =>{
    const {id} =req.params;
    // validateMongoId(id);
    try {
        const getproductonsubcategory = await Product.find({subcategory_id:id});
        res.json(getproductonsubcategory);
    } catch (error) {
        throw new Error(error);
    }
}

//get product based on vendor id
const getProductOnvendorId = async(req, res) =>{
    const {id} =req.params;
    // validateMongoId(id);
    try {
        const getproductonsubcategory = await Product.find({vendor_id:id}).populate('category_id subcategory_id');
        res.json(getproductonsubcategory);
    } catch (error) {
        throw new Error(error);
    }
}



module.exports= {
    createProduct,
    getAllProducts,
    getProductsOnsubcategoryId,
    getaProduct,
    updateProduct,
    deleteProduct,
    getProductOnvendorId
}
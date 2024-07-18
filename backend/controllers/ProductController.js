// const upload = require('../helpers/gridfs')
const Product = require('../models/Products/productModel');
const Vendor = require('../models/Users/vendorModel')
const Category = require('../models/Products/category');
const Subcategory = require('../models/Products/subcategory');
const validateMongoId = require('../helpers/validateId');
// const slugify = require('slugify');
const cloudinary = require('../helpers/cloudinary');

const createProduct = async (req, res) =>{
   try {
    const vendor_id = req.user;
    const {title, description, price,  quantity, condition, makes_model_year, brand, category_name, subcategory_name } = req.body;
    
    // console.log("Vendor ID received:", vendor_id);
    //check if vendor exist
    const vendor = await Vendor.findById(vendor_id);
    // console.log(vendor_id)
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

    
    // Use the uploaded images from Cloudinary directly
    const images = req.files.map(file => ({
        public_id: file.filename,
        url: file.path,
      }));
  
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

//get single product
const getAProduct = async(req,res) =>{
  try {
    const { productIds } = req.body;
    const products = await Product.find({ _id: { $in: productIds } });
    res.json({ products });
  } catch (error) {
    console.error('Error fetching products', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

//get all products
const getAllProducts = async (req, res) =>{
    try {
        const getallproducts = await Product.find().populate('category_id subcategory_id vendor_id');
        res.json(getallproducts);
    } catch (error) {
        throw new Error(error.message);
    }
}

//get all sold products
const getAllSoldProducts = async (req, res) => {
  try {
    const getallproducts = await Product.find({ sold: { $gt: 0 } })
    .select('sold title description price quantity condition makes_model_year brand vendor_id category_id subcategory_id images')
    .populate('category_id subcategory_id vendor_id');
      res.json(getallproducts);
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
}; 

//update product endpoint
const updateProduct = async (req, res) => {
    try {
      const { id } = req.params;
      const { title, description, price, quantity, condition, makes_model_year, brand, vendor_id, category_name, subcategory_name } = req.body;
  
      // Find the existing product by ID
      const product = await Product.findById(id);
      if (!product) {
        return res.status(404).json({ success: false, msg: 'Product not found' });
      }
  
      // Find category and subcategory by name
      const category = await Category.findOne({ name: category_name });
      if (!category) {
        return res.status(404).json({ msg: 'Category not found' });
      }
      const subcategory = await Subcategory.findOne({ name: subcategory_name, category_id: category._id });
      if (!subcategory) {
        return res.status(404).json({ msg: 'Subcategory not found' });
      }
  
      // Initialize the update object
      const data = {
        title,
        description,
        price,
        quantity,
        condition,
        makes_model_year,
        brand,
        vendor_id,
        category_id: category._id,
        subcategory_id: subcategory._id
      };
  
      // If new image files are provided, handle the upload and deletion of the old images
      if (req.files && req.files.length > 0) {
        // Delete old images from Cloudinary
        for (const image of product.images) {
          if (image.public_id) {
            await cloudinary.uploader.destroy(image.public_id);
          }
        }
  
        // Collect new images
        const images = req.files.map(file => ({
          public_id: file.filename,
          url: file.path
        }));
  
        // Update the images data in the update object
        data.images = images;
      }
  
      // Update the product
      const updatedProduct = await Product.findByIdAndUpdate(id, data, { new: true });
  
      res.status(200).json({
        success: true,
        product: updatedProduct
      });
    } catch (error) {
      res.status(500).json({ success: false, msg: 'Product not updated', error: error.message });
    }
  };
  

//delete a product
const deleteProduct = async (req, res) => {
    const { id } = req.params;
    validateMongoId(id);
  
    try {
      // Find the product to get the images' public IDs
      const product = await Product.findById(id);
      if (!product) {
        return res.status(404).json({ msg: 'Product not found' });
      }
  
      // Delete images from Cloudinary
      for (const image of product.images) {
        await cloudinary.uploader.destroy(image.public_id);
      }
  
      // Delete the product from the database
      await Product.findByIdAndDelete(id);
  
      res.json({
        success: true,
        msg: 'Product and its images have been deleted',
        data: product
      });
    } catch (error) {
      console.error('Error deleting product:', error);
      res.status(500).json({ msg: 'Error deleting product', error: error.message });
    }
 };
  
//get product based on subCategory id
const getProductsOnsubcategoryId = async(req, res) =>{
    const {id} =req.params;
    // validateMongoId(id);
    try {
        const getproductonsubcategory = await Product.find({subcategory_id:id}).populate('category_id subcategory_id vendor_id');
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
        const getproductonsubcategory = await Product.find({vendor_id:id})
        .select('sold title description price quantity condition makes_model_year brand vendor_id category_id subcategory_id images')
        .populate('category_id subcategory_id');
        res.json(getproductonsubcategory);
    } catch (error) {
        throw new Error(error);
    }
}

//get all product on vendor id with middleware
const getProductOnvendorIdMiddleware = async(req, res) =>{
  const vendorId =req.user;
  // validateMongoId(id);
  try {
      const getproductonsubcategory = await Product.find({vendor_id:vendorId}).populate('category_id subcategory_id');
      res.json(getproductonsubcategory);
  } catch (error) {
      throw new Error(error);
  }
}


//get sold products\
const getSoldProductOnvendorId = async(req, res) =>{
  const vendorId =req.user;
  // validateMongoId(id);
  try {
      const getproductonsubcategory = await Product.find({vendor_id:vendorId,  sold: { $gt: 0 } }).populate('category_id subcategory_id');
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
    getProductOnvendorId,
    getAProduct,
    getAllSoldProducts,
    getProductOnvendorIdMiddleware,
    getSoldProductOnvendorId
}
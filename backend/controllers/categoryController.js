const Category = require('../models/Products/category');
const Subcategory= require('../models/Products/subcategory');
const validateMongoId = require('../helpers/validateId');
const { get } = require('mongoose');
const  cloudinary = require('../helpers/cloudinary');


//create category endpoint
const createCategory = async(req, res) =>{
    try {
        const {name, description} = req.body;
        const isExistincategory= await Category.findOne({name});
        if(isExistincategory){
            return res.status(409).json({
                success: false,
                msg:'Category already exists'
            })
        }

        const category = await Category.create({
            name, description
        })
        
        return res.json({
            success:true,
            category
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            msg: 'category not created ',
            error: error
        });   
    }
}

//get category endpoint
const getAllCategory = async(req,res) =>{
    try {
        const getcategories= await Category.find();
        res.json(getcategories)
    } catch (error) {
         throw new Error(error);  
    }
}

//delete category endpoint
const deleteCategory = async (req,res) =>{
    const {id} = req.params;
    validateMongoId(id);
    try {
        const deletecategory = await Category.findByIdAndDelete(id);
        if(!deletecategory) {
            return res.status(404).json({error:"Category not found"});
        }
        res.json({
           msg: 'category deleted successfully'
        });
    } catch (error) {
        throw new Error (error);
    }
}

// update category endpoint
const updateCategory = async (req, res) => {
    const {id} = req.params;
    validateMongoId(id);
    try {
        const updatecategory = await Category.findByIdAndUpdate(id, {
            name:req?.body?.name,
            description: req?.body?.description
        },{
            new: true,
        });
        res.json({success: true, data: updatecategory});
    } catch (error) {
        res.status(500).json({succes: false, message: error.message});
    }
}


//create sub category end point
const createSubCategory = async (req, res) => {
    try {
      const { name, description, category_id } = req.body;
  
      // Check if subcategory exists
      const isExistingSubcategory = await Subcategory.findOne({ name });
      if (isExistingSubcategory) {
        return res.status(409).json({
          success: false,
          msg: 'Sub category already exists'
        });
      }
  
      // Get the image from the request
      let image = null;
      if (req.file) {
        image = {
          public_id: req.file.filename,
          url: req.file.path
        };
      }
  
      // Create the subcategory
      const subcategory = await Subcategory.create({
        name,
        description,
        category_id,
        image
      });
  
      return res.json({
        success: true,
        subcategory
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        msg: 'Sub category not created',
        error: error.message
      });
    }
  };
  

//get all sub category endpoint
const getAllSubcategory = async(req, res) =>{
    try {
        const getsubcategories = await Subcategory.find();
        res.json(getsubcategories);
    } catch (error) {
      res.status(500).json({ success: false, msg: 'Failed to get subcategories', error: error.message });
    }
} 


//get all subcategory based on specific category id
const getsubcategoryOnCatId = async(req, res) =>{
    const {id } =req.params;
    validateMongoId(id);
    try {
        const getsubcategoronid = await Subcategory.find({category_id:id});
        res.json(getsubcategoronid);
    } catch (error) {
        throw new Error(error);
    }
}


//delete sub category endpoint
const deleteSubCategory = async (req,res) =>{
    const {id} = req.params;
    validateMongoId(id);
    try {
        const subcategory = await Subcategory.findById(id);
    
        if (!subcategory) {
          return res.status(404).json({ msg: 'Subcategory not found' });
        }
    
        // Assuming the image is stored in subcategory.image array as per your previous example
        const image = subcategory.image;
        if (image && image.public_id) {
          // Delete the image from Cloudinary
          await cloudinary.uploader.destroy(image.public_id);
        }
    
        // Delete the subcategory from the database
        await Subcategory.findByIdAndDelete(id);
    
        res.status(200).json({ msg: 'Subcategory and image deleted successfully' });
      } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Server error' });
      }
}

//update sub category endpoint
const updateSubCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, category_id } = req.body;

    // Find the existing subcategory by ID
    const subcategory = await Subcategory.findById(id);
    if (!subcategory) {
      return res.status(404).json({ success: false, msg: 'Sub category not found' });
    }

    // Initialize the update object
    const data = {
      name,
      description,
      category_id
    };

    // If a new image file is provided, handle the upload and deletion of the old image
    if (req.file) {
      // Check if subcategory has an existing image
      if (subcategory.image && subcategory.image.public_id) {
        const imageId = subcategory.image.public_id;
        if (imageId) {
          await cloudinary.uploader.destroy(imageId);
        }
      }

      // The new image is already uploaded by multer, no need to re-upload
      const newImage = {
        public_id: req.file.filename,
        url: req.file.path
      };

      // Update the image data in the update object
      data.image = newImage;
    }

    // Update the subcategory
    const updatedSubcategory = await Subcategory.findByIdAndUpdate(id, data, { new: true });

    res.status(200).json({
      success: true,
      subcategory: updatedSubcategory
    });
  } catch (error) {
    res.status(500).json({ success: false, msg: 'Sub category not updated', error: error.message });
  }
};

  

module.exports = {
    createCategory,
    createSubCategory,
    getAllCategory,
    deleteCategory,
    deleteSubCategory,
    getAllSubcategory,
    updateCategory,
    updateSubCategory,
    getsubcategoryOnCatId
}
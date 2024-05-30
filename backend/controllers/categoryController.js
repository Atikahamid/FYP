const Category = require('../models/Products/category');
const Subcategory= require('../models/Products/subcategory');
const validateMongoId = require('../helpers/validateId')



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
const createSubCategory = async(req, res) =>{
    try {
        const {name, description , category_id} = req.body;
        const isExistinSubcategory = await Subcategory.findOne({name });
        if(isExistinSubcategory){
            return res.status(409).json({
                success: false,
                msg:'Sub category alresdy exists'
            })
        }
        const subcategory = await Subcategory.create({
            name, description, category_id
        })
        return res.json({
            success:true,
            subcategory
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            msg: 'sub category not created ',
            error: error
        });   
    }
}

//get all sub category endpoint
const getAllSubcategory = async(req, res) =>{
    try {
        const getsubcategories = await Subcategory.find();
        res.json(getsubcategories);
    } catch (error) {
        throw new Error( error);
    }
} 



//delete sub category endpoint
const deleteSubCategory = async (req,res) =>{
    const {id} = req.params;
    validateMongoId(id);
    try {
        const deletesubcategory = await Subcategory.findByIdAndDelete(id);
        if(!deletesubcategory) {
            return res.status(404).json({error:"Sub Category not found"});
        }
        res.json({
            deletesubcategory
        });
    } catch (error) {
        throw new Error (error);
    }
}

//update sub category endpoint
const updateSubCategory = async (req, res) => {
    const {id} = req.params;
    validateMongoId(id);
    try {
        const updatesubcategory = await Category.findByIdAndUpdate(id, {
            name:req?.body?.name,
            description: req?.body?.description
        },{
            new: true,
        });
        res.json({success: true, data: updatesubcategory});
    } catch (error) {
        res.status(500).json({succes: false, message: error.message});
    }
}


module.exports = {
    createCategory,
    createSubCategory,
    getAllCategory,
    deleteCategory,
    deleteSubCategory,
    getAllSubcategory,
    updateCategory,
    updateSubCategory
}
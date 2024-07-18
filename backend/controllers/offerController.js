const Offer = require('../models/Offers/offerModel');
const Vendor = require('../models/Users/vendorModel');
const validateMongoId = require('../helpers/validateId');
const User = require('../models/Users/userModel');
const Product = require('../models/Products/productModel');

//create offer
const createOffer = async(req, res) =>{
    try {
        const user_id = req.user;
        const {offer_price, quantity, vendor_id, product_id } = req.body;

        //check if user exist
        const user = await User.findById(user_id);
        if(!user){
            return res.status(404).json({msg: 'User not found'});
        }

        // check if vendor exist
        const vendor = await Vendor.findById(vendor_id);
        if(!vendor){
            return res.status(404).json({msg: 'Vendor not found'});
        }

        //cehck if product exist
        const product = await Product.findById(product_id);
        if(!product){
            return res.status(404).json({msg: 'Product not found'});
        }


        const newOffer= new Offer({
            offer_price,
            quantity,
            vendor_id,
            user_id,
            product_id,
            status:'pending'
        });

        const savedOffer= await newOffer.save();
        res.status(201).json({success: true, data: savedOffer});

    } catch (error) {
        console.error('Error creating offer', error );
        res.status(500).json({msg: 'Error creating offer', error: error.meassage});   
    }
}

//get single offer by offer id
const getOfferByOId = async(req, res) => {
    const {id} = req.params;
    validateMongoId(id);
    try {
        const getaOffer = await Offer.findById(id).populate('vendor_id user_id product_id');
        if(!getaOffer){
            return res.json({msg: 'no data available with this id'});
        }
        res.json(getaOffer);
    } catch (error) {
        return res.status(500).json({ success: false, msg: 'error getting offer data', error: error.message});
    }
}

const getAllOffers= async(req,res) =>{
    try {
        const getalloffers = await Offer.find().populate('vendor_id user_id product_id');
        res.json(getalloffers);
    } catch (error) {
        return res.status(500).json({ success: false, msg: 'error getting  all offers data', error: error.message});
    }
}

//get offer by user id
const getOfferByUId = async(req,res) => {
    try {
        const userId = req.user;
        const getofferonuserId = await Offer.find({user_id:userId}).populate('vendor_id user_id product_id');
        if(!getofferonuserId){
            return res.json({msg: 'no offer get on this user'})
        }
        res.json(getofferonuserId);
    } catch (error) {
        return res.status(500).json({ success: false, msg: 'error getting offers data on userId', error: error.message});
    }
}

//getpffer by vendor id
const getOfferByVId = async(req, res) => {
    try {
        const vendorId = req.user;
        const getofferonvendorid = await Offer.find({vendor_id : vendorId,  status: 'pending' }).populate('vendor_id user_id product_id');
        res.json(getofferonvendorid);
    } catch (error) {
        return res.status(500).json({ success: false, msg: 'error getting offers data on vendorId', error: error.message});
    }
}

//update offer endpoint
const updateOffer = async(req, res) => {
    try {
        const {id} = req.params;
        const {offer_price, quantity } = req.body;
        
        const offer = await Offer.findById(id);
        if(!offer){
            return res.status(404).json({success: false, msg: 'Offer not found'});
        }
        
        const newOffer = {
            offer_price,
            quantity
        };
        const updateOffer = await Offer.findByIdAndUpdate(id, newOffer, {new: true});

        res.status(200).json({
            success: true,
            offer: updateOffer
        });
    } catch (error) {
        res.status(500).json({success: false, msg: 'offer not updated', error: error.message});
    }
} 

//delete offer
const deleteOffer = async(req, res) => {
    const {id} = req.params;
    validateMongoId(id);
    try {
        const deleteoffer = await Offer.findByIdAndDelete(id);
        if(!deleteoffer){
            return res.status(404).json({error: 'offer not found'});
        }
        res.json({
            msg:'offer deleted successfully'
        })
    } catch (error) {
        return res.status(500).json({success: false, error:error.message});
    }
}

//get offer on status = pending
const getOfferPending = async(req, res) => {
    try {
        const getOffer = await Offer.find({status: 'pending'}).populate('vendor_id user_id product_id');
        if(!getOffer){
            res.json({msg: 'No data Available'});
        }
        res.json(getOffer);
    } catch (error) {
        return res. status(404).json({msg:'internal server error', success: false, error: error.message});
    }
}

//get offer pending on user id
const getOfferPendingMiddleware = async(req, res) => {
    const userId = req.user;
    try {
        const getOffer = await Offer.find({user_id: userId, status: 'pending'}).populate('vendor_id user_id product_id');
        if(!getOffer){
            res.json({msg: 'No data Available'});
        }
        res.json(getOffer);
    } catch (error) {
        return res. status(404).json({msg:'internal server error', success: false, error: error.message});
    }
}

//get offer on status = accept
const getOfferAccept = async(req, res) => {
    try {
        const getOffer = await Offer.find({status: 'accept'}).populate('vendor_id user_id product_id');
        if(!getOffer){
            res.json({msg: 'No data Available'});
        }
        res.json(getOffer);
    } catch (error) {
        return res. status(404).json({msg:'internal server error', success: false, error: error.message});
    }
}

//get offer on status= reject
const getOfferReject = async(req, res) => {
    try {
        const getOffer = await Offer.find({status: 'reject'}).populate('vendor_id user_id product_id');
        if(!getOffer){
            res.json({msg: 'No data Available'});
        }
        res.json(getOffer);
    } catch (error) {
        return res. status(404).json({msg:'internal server error', success: false, error: error.message});
    }
}

//accept offer
const acceptOffer = async(req, res) => {
    const {offerId} = req.params;
    try {
        const offer = await Offer.findById(offerId);
        if(!offer){
            return res.status(404).json({msg: 'Offer not found'});
        }

        offer.status= 'accept';
        await offer.save();

        const user = await User.findById(offer.user_id);
        if(!user){
            return res.status(404).json({msg:'No user found'});
        }

        const product = await Product.findById(offer.product_id);
        if(!product){
            return res.status(404).json({msg: 'Product not found'});
        }

        //logic
        const cartItemIndex = user.cart.findIndex(item => item.productId.toString() === offer.product_id.toString());
        if(cartItemIndex !== -1){
            user.cart[cartItemIndex].quantity= offer.quantity;
            user.cart[cartItemIndex].offer_price = offer.offer_price;
        }else{
            user.cart.push({
                productId: offer.product_id,
                quantity: offer.quantity,
                offer_price: offer.offer_price
            });
        }
        await user.save();
        res.json({msg: 'offer accepted successfully', user});
    } catch (error) {
        return res.status(500).json({msg: 'Internal server error', success: false, error: error.message });
    }
}

//reject offer
const rejectOffer = async (req, res) => {
    const { offerId } = req.params;

    try {
        const offer = await Offer.findById(offerId);

        if (!offer) {
            return res.status(404).json({ message: 'Offer not found' });
        }

        offer.status = 'reject';
        await offer.save();

        res.status(200).json({ message: 'Offer rejected successfully', offer });
    } catch (error) {
        console.error('Error rejecting offer:', error);
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};


module.exports = {
    createOffer,
    getOfferByOId,
    getAllOffers,
    getOfferByUId,
    getOfferByVId,
    updateOffer,
    deleteOffer,
    getOfferPending,
    getOfferAccept,
    getOfferReject,
    acceptOffer,
    rejectOffer,
    getOfferPendingMiddleware
}
const Product = require('../models/Products/productModel')
const User = require('../models/Users/userModel')

//add to cart

const addToCart = async (req, res) => {
    try {
        const userId = req.user;
        const { productId, quantity } = req.body;

        if (!userId || !productId || !quantity) {
            return res.status(400).json({ message: 'User ID, product ID, and quantity are required' });
        }

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        const cartItem = user.cart.find(item => item.productId.toString() === productId);

        if (cartItem) {
            cartItem.quantity += quantity;
            // console.log(`Updated quantity for product ${productId}: ${cartItem.quantity}`);
        } else {
            user.cart.push({ productId, quantity });
            // console.log(`Added new product ${productId} with quantity: ${quantity}`);
        }

        await user.save();
        res.status(200).json({ message: 'Product added to cart', cart: user.cart });
    } catch (error) {
        console.error('Error adding to cart', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};



//get user cart items
const getUserCart = async (req, res) => {
    try {
        const userId = req.user;
        const user = await User.findById(userId).populate('cart.productId');
        if(!user){
            return res.status(404).json({message:'User not found'});
        }
        res.status(200).json({cart: user.cart});
    } catch (error) {
        console.error('Error fetching cart items', error);
        res.status(500).json({message:'Internal server error'});
    }
}


//update cart item
const updateCart = async(req, res) => {
    try {
        const userId = req.user;
        const{productId, quantity} = req.body;

        if(quantity < 1 ){
            return res.status(400).json({message: 'Quantity must be atleast greater than 1'});

        }

        const user= await User.findById(userId);
        if(!user){
            return res.status(404).json({message:'User not found'
            });
        }

        const cartItem = user.cart.find(item => item.productId.toString() === productId);
        if(cartItem){
            cartItem.quantity= quantity;
            await user.save();
            res.status(200).json({message:'cart item updated', cart: user.cart});
        }else{
            res.status(404).json({message:'Product not found in cart'});
        }
    } catch (error) {
        console.error('Error updating cart', error);
        res.status(500).json({message: 'Internal server error'});
    }
};

//delete cart
const deleteCart = async(req, res) =>{
    try {
        const userId= req.user;
        const {productId} = req.body;

        const user= await User.findById(userId);
        if(!user){
            return res.status(404).json({ message: 'User not found' });
        }

        const cartIndex= user.cart.findIndex(item => item.productId.toString() === productId);
        if(cartIndex > -1){
            user.cart.splice(cartIndex, 1);
            await user.save();
            res.status(200).json({ message: 'Cart item deleted', cart: user.cart });
        }else{
            res.status(404).json({ message: 'Product not found in cart' }); 
        }
    } catch (error) {
        console.error('Error deleting cart item', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}


//delete single cart item by id
const deleteaSingle = async(req,res ) => {
    try {
        const userId = req.user._id; // Assuming the authenticate middleware sets req.user
        const productId = req.params.id;
    
        if (!productId) {
          return res.status(400).json({ message: 'Product ID is required' });
        }
    
        const user = await User.findById(userId);
        if (!user) {
          return res.status(404).json({ message: 'User not found' });
        }
    
        const cartItemIndex = user.cart.findIndex(item => item.productId.toString() === productId);
        if (cartItemIndex === -1) {
          return res.status(404).json({ message: 'Product not found in cart' });
        }
    
        user.cart.splice(cartItemIndex, 1);
        await user.save();
    
        res.status(200).json({ message: 'Cart item deleted successfully', cart: user.cart });
      } catch (error) {
        console.error('Error deleting cart item', error);
        res.status(500).json({ message: 'Internal server error' });
      }

}
module.exports ={
    addToCart,
    getUserCart,
    updateCart,
    deleteCart,
    deleteaSingle

}
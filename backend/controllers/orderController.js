const User = require('../models/Users/userModel');
const Product = require('../models/Products/productModel');
const Order = require('../models/Orders/orderModel');
const validateMongoId = require('../helpers/validateId');


//create order
const createOrder = async (req, res) => {
    try {
        const userId = req.user;
        const { items, shippingAddress } = req.body;

        const user = await User.findById(userId).populate('cart.productId');

        if (!user || user.cart.length === 0) {
            return res.status(400).json({ msg: 'No items in the cart' });
        }

        const orderItems = [];
        for (const item of items) {
            const cartItem = user.cart.find(cartItem => cartItem.productId._id.toString() === item.productId);
            if (!cartItem) {
                return res.status(400).json({ msg: 'Product is not in the cart' });
            }

            if (cartItem.quantity < item.quantity) {
                return res.status(400).json({ msg: 'Insufficient product quantity in the cart' });
            }

            orderItems.push({
                product: cartItem.productId._id,
                quantity: item.quantity,
                price: cartItem.productId.price,
                offerPrice: cartItem.offer_price,
                vendor: cartItem.productId.vendor_id
            });

            cartItem.quantity -= item.quantity;
            if (cartItem.quantity === 0) {
                user.cart = user.cart.filter(cartItem => cartItem.productId._id.toString() !== item.productId);
            }
        }

        const totalAmount = orderItems.reduce((sum, item) => {
            const price = item.offerPrice > 0 ? item.offerPrice : item.price;
            return sum + price * item.quantity;
        }, 0);

        const order = new Order({
            user: userId,
            items: orderItems,
            totalAmount,
            paymentMethod: 'Cash on Delivery',
            shippingAddress,
            vendor: orderItems[0].vendor
        });
        await order.save();

        await user.save();

        for (const item of items) {
            const product = await Product.findById(item.productId);
            product.quantity -= item.quantity;
            product.sold = item.quantity;
            await product.save();
        }

        res.status(201).json({ msg: 'Order placed successfully', order });
    } catch (error) {
        console.error('Error creating order', error);
        res.status(500).json({ msg: 'Internal server error', error: error.message });
    }
};

//get all orders
const getAllOrders = async(req, res) => {
    try {
        const getallorders= await Order.find().populate('items.product user vendor');
        res.status(200).json(getallorders);
    } catch (error) {
        return res.status(500).json({success: false, msg: 'internal server error', error: error.message});
    }
}

//get order by userId
const getOrderByUId = async(req, res) => {
    try {
        const userId = req.user;
        const getorderuid = await Order.find({user:userId}).populate('user vendor items.product');
        if(!getorderuid){
            return res.status(200).json({success: false,  msg: 'this user has no order'});
        }
        if (getorderuid.length === 0) {
            return res.status(200).json({ success: false, msg: 'This user has no orders' });
        }
        res.status(300).json({success: true, getorderuid});
    } catch (error) {
        return res.status(500).json({success: false, msg: 'error geeting user order', error: error.message});
    }
}

//get order on vendor id
const getOrderByVId = async(req, res) => {
    try {
        const userId = req.user;
        const getorderuid = await Order.find({vendor:userId}).populate('user vendor items.product');
        if(!getorderuid){
            return res.status(200).json({success: false,  msg: 'this vendor has no order'});
        }
        res.json(getorderuid);
    } catch (error) {
        return res.status(500).json({success: false, msg: 'error geeting vendor order', error: error.message});
    }
}

//get all orders by status pending

const getOrderPending = async(req, res) => {
    try {
        const getorder = await Order.find({status: 'Pending'}).populate('user vendor items.product');
        if(!getorder){
            res.json({msg: 'No data available'});
        }
        res.json(getorder);
    } catch (error) {
        return res.status(404).json({msg: 'Internal server error', error: error.message});
    }
}

//get status cancelled
const getOrderCancel = async(req, res) => {
    try {
        const getorder = await Order.find({status: 'Cancelled'}).populate('user vendor items.product');
        if(!getorder){
            res.json({msg: 'No data available'});
        }
        res.json(getorder);
    } catch (error) {
        return res.status(404).json({msg: 'Internal server error', error: error.message});
    }
}

//get status delivered
const getOrderDeliver = async(req, res) => {
    try {
        const getorder = await Order.find({status: 'Delivered'}).populate('user vendor items.product');
        if(!getorder){
            res.json({msg: 'No data available'});
        }
        res.json(getorder);
    } catch (error) {
        return res.status(404).json({msg: 'Internal server error', error: error.message});
    }
}

//get single order by id
const getOrderDeatils = async(req, res) => {
    const {id} = req.params;
    validateMongoId(id);
    try {
        const getorder = await Order.findById(id).populate('vendor user items.product');
        if(!getorder){
            return res.json({msg: 'no data available with this order id'});
        }
        res.json(getorder);
    } catch (error) {
        return res.status(500).json({success: false, msg: 'internal server error', error: error.message});
    }
}

// update status of order
const updateStatus = async(req, res) => {
    const {id} = req.params;
    const {status} = req.body;
    try {
        const getorder = await  Order.findById(id);
        if(!getorder){
            return res.json({msg: 'no order with this id available'});
        }
        getorder.status = status;
        await getorder.save();
        res.status(200).json({success: true, msg: 'order status updated successfully', getorder});
    } catch (error) {
        return res.status(500).json({success: false, msg: 'internal  server error', error: error.message}); 
    }
}

//cancel order
const cancelOrder = async(req, res) => {
    const {id} = req.params;
    validateMongoId(id);
    try {
        const getorder = await  Order.findById(id);
        if(!getorder){
            return res.json({msg: 'no order with this id available'});
        }
        if(getorder.status === 'Delivered'){
            return res.json({msg: 'order cannot be cancelled'});
        }
        getorder.status = 'Cancelled';
        await getorder.save();
        res.status(200).json({success: true, msg: 'order cancelled successfully', getorder});
    } catch (error) {
        return res.status(500).json({success: false, msg: 'internal  server error', error: error.message}); 
    }
}



module.exports = {
    createOrder,
    getOrderByUId,
    getOrderByVId,
    getOrderPending,
    getOrderDeatils,
    updateStatus,
    cancelOrder,
    getOrderCancel,
    getOrderDeliver,
    getAllOrders
}
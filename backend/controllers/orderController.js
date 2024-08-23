const User = require('../models/Users/userModel');
const Product = require('../models/Products/productModel');
const Order = require('../models/Orders/orderModel');
const Vendor= require('../models/Users/vendorModel')
const validateMongoId = require('../helpers/validateId');
const nodemailer = require('nodemailer');

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
            if(item.offerPrice > 0){
                const price = item.offerPrice;
                return sum + price;
            }else{
                const price = item.price;
                return sum+ price * item.quantity;
            }
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
const getOrderByUId = async (req, res) => {
    const { id: userId } = req.params;
    validateMongoId(userId);
    try {
        const getorderuid = await Order.find({ user: userId }).populate('user vendor items.product');
        if (!getorderuid) {
            return res.status(200).json({ success: false, msg: 'This user has no orders' });
        }
        if (getorderuid.length === 0) {
            return res.status(200).json({ success: false, msg: 'This user has no orders' });
        }
        res.status(200).json({ success: true, getorderuid });
    } catch (error) {
        return res.status(500).json({ success: false, msg: 'Error getting user order', error: error.message });
    }
};

const getPendingOrderByUId = async(req, res) => {
    try {
        const {id} = req.params;
        validateMongoId(id);
        const getorderuid = await Order.find({user:id, status:'Pending'}).populate('user vendor items.product');
        if(getorderuid.length === 0){
            return res.status(200).json({success: false, msg: 'This user has no pending orders'});
        }
        res.json({success: true, getorderuid});
    } catch (error) {
        return res.status(500).json({success: false, msg: 'Error getting user pending order', error: error.message});
    }
}

const getCancelledOrderByUId = async(req, res) => {
    try {
        const {id} = req.params;
        validateMongoId(id);
        const getorderuid = await Order.find({user:id, status:'Cancelled'}).populate('user vendor items.product');
        if(getorderuid.length === 0){
            return res.status(200).json({success: false, msg: 'This user has no cancelled orders'});
        }
        res.json({success: true, getorderuid});
    } catch (error) {
        return res.status(500).json({success: false, msg: 'Error getting user cancel order', error: error.message});
    }
}

const getDeliveredOrderByUId = async(req, res) => {
    try {
        const{id} = req.params;
        validateMongoId(id);
        const getorderuid = await Order.find({user:id, status:'Delivered'}).populate('user vendor items.product');
        if(getorderuid.length === 0){
            return res.status(200).json({success: false, msg: 'This user has no delivered orders'});
        }
        res.json({success: true, getorderuid: getorderuid});
    } catch (error) {
        return res.status(500).json({success: false, msg: 'Error getting user deliver order', error: error.message});
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
        const getorder = await Order.find({
            $or: [{ status: 'Delivered' }, { status: 'Payment Completed' }]
        }).populate('user vendor items.product');

        if(!getorder){
            res.json({msg: 'No data available'});
        }
        res.json(getorder);
    } catch (error) {
        return res.status(404).json({msg: 'Internal server error', error: error.message});
    }
}

//get order complete by middleware
const getOrderDeliverMiddleware = async(req, res) => {
    const userId = req.user;
    try {
        const getorder = await Order.find({user: userId, status: 'Delivered'}).populate('user vendor items.product');
        if(!getorder){
            res.json({msg: 'No data available'});
        }
        res.json(getorder);
    } catch (error) {
        return res.status(404).json({msg: 'Internal server error', error: error.message});
    }
}


//get order pending by middleware
const getOrderPendingMiddleware = async(req, res) => {
    const userId = req.user;
    try {
        const getorder = await Order.find({user: userId, status: 'Pending'}).populate('user vendor items.product');
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
    validateMongoId(id);
    try {
        const getorder = await  Order.findById(id);
        if(!getorder){
            return res.json({msg: 'no order with this id available'});
        }
        getorder.status = 'Delivered';
        await getorder.save();
        res.status(200).json({success: true, msg: 'order completed successfully', getorder});
    } catch (error) {
        return res.status(500).json({success: false, msg: 'internal  server error', error: error.message}); 
    }
}

//cancel order
const cancelOrder = async (req, res) => {
    const { id } = req.params;
    validateMongoId(id);
    try {
        const getorder = await Order.findById(id).populate('items.product');
        if (!getorder) {
            return res.status(404).json({ msg: 'no order with this id available' });
        }
        if (getorder.status === 'Delivered') {
            return res.status(400).json({ msg: 'order cannot be cancelled' });
        }

        // Update the order status to 'Cancelled'
        getorder.status = 'Cancelled';
        await getorder.save();

        // Increment the quantity of each product in the order
        const updatePromises = getorder.items.map(async item => {
            const product = item.product;
            product.quantity += item.quantity;
            return product.save();
        });
        await Promise.all(updatePromises);

        res.status(200).json({ success: true, msg: 'order cancelled successfully', getorder });
    } catch (error) {
        return res.status(500).json({ success: false, msg: 'internal server error', error: error.message });
    }
};


//get revenue of vendor
const revenueCalculation = async(req, res) => {
    try {
        const userId = req.user;
        const orders = await Order.find({vendor: userId, status:'Delivered'});
        if(!orders || orders.length === 0){
            return res.status(200).json({  msg: 'this vendor has no order', totalAmount: 0});
        }

        // Calculate the total amount
        const totalAmount = orders.reduce((sum, order) => sum + order.totalAmount, 0);

        res.json({
            success: true,
            msg: 'Total revenue calculated successfully',
            totalAmount: totalAmount
        });
    } catch (error) {
        return res.status(500).json({success: false, msg: 'error getting vendor orders revenue', error: error.message});
    }
}

//bsed on params
const revenueCalculationParams = async(req, res) => {
    try {
        const {id: userId} = req.params;
        validateMongoId(userId);
        const orders = await Order.find({vendor: userId, status:'Delivered'});
        if(!orders || orders.length === 0){
            return res.status(200).json({  msg: 'this vendor has no order', totalAmount: 0});
        }

        // Calculate the total amount
        const totalAmount = orders.reduce((sum, order) => sum + order.totalAmount, 0);

        res.json({
            success: true,
            msg: 'Total revenue calculated successfully',
            totalAmount: totalAmount
        });
    } catch (error) {
        return res.status(500).json({success: false, msg: 'error getting vendor orders revenue', error: error.message});
    }
}

// mail transfer
const revenueCalculationAndTransfer = async (req, res) => {
    try {
        const { id: userId } = req.params;
        validateMongoId(userId);

        const orders = await Order.find({ vendor: userId, status: 'Delivered' });
        if (!orders || orders.length === 0) {
            return res.status(200).json({ msg: 'This vendor has no delivered orders', totalAmount: 0 });
        }

        // Calculate the total amount
        const totalAmount = orders.reduce((sum, order) => sum + order.totalAmount, 0);

        if (totalAmount === 0) {
            return res.status(200).json({ msg: 'There is no money to be transferred', totalAmount: 0 });
        }

        // Find the vendor
        const vendor = await Vendor.findOne({ _id: userId });
        if (!vendor) {
            return res.status(404).send('Vendor not found');
        }

        // Here we simulate the manual transfer process
        const transactionRef = `TRANS-${Date.now()}`;

        // Update the status of all orders to 'Payment Completed'
        await Order.updateMany(
            { vendor: userId, status: 'Delivered' },
            { $set: { status: 'Payment Completed', paymentDetails: { amount: totalAmount, date: new Date(), transactionRef } } }
        );

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'hafizaatika965@gmail.com',
                pass: 'uuvf vjtk oudd dawg'
            }
        });

        // Send email notification to the vendor
        const mailOptions = {
            from: 'hafizaatika965@gmail.com',
            to: vendor.email,
            subject: 'Payment Notification',
            text: `Dear ${vendor.fullName},

            Your payment for the delivered orders has been processed successfully.
            Total Amount Transferred: Rs. ${totalAmount}
            Payment Method: Manual Transfer
            Date of Transfer: ${new Date().toDateString()}
            Transaction Reference: ${transactionRef}

            Thank you for using our platform.

            Best Regards,
            Moto Parts`
        };

        await transporter.sendMail(mailOptions);

        res.json({
            success: true,
            msg: 'Total revenue calculated and transferred successfully. Email notification sent.',
            totalAmount: totalAmount,
            transactionRef: transactionRef
        });
    } catch (error) {
        return res.status(500).json({ success: false, msg: 'Error calculating vendor orders revenue or processing payment', error: error.message });
    }
};



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
    getAllOrders,
    revenueCalculation,
    getOrderDeliverMiddleware,
    getOrderPendingMiddleware,
    getPendingOrderByUId,
    getCancelledOrderByUId,
    getDeliveredOrderByUId,
    revenueCalculationParams,
    revenueCalculationAndTransfer
}
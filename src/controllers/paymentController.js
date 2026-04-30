const SSLCommerzPayment = require('sslcommerz-lts');
const { ObjectId } = require('mongodb');

// SSLCommerz Credentials (আপাতত টেস্টের জন্য এগুলোই থাক)
const store_id = 'testbox'; 
const store_passwd = 'qwerty'; 
const is_live = false; 

const initiatePayment = async (req, res) => {
    const order = req.body;
    const tran_id = new ObjectId().toString(); // ইউনিক ট্রানজ্যাকশন আইডি

    const data = {
        total_amount: order.totalAmount,
        currency: 'BDT',
        tran_id: tran_id,
        success_url: `http://localhost:5000/api/payment/success/${tran_id}`,
        fail_url: `http://localhost:5000/api/payment/fail/${tran_id}`,
        cancel_url: 'http://localhost:5000/api/payment/cancel',
        ipn_url: 'http://localhost:5000/api/payment/ipn',
        shipping_method: 'Courier',
        product_name: 'Food Items',
        product_category: 'Food',
        product_profile: 'general',
        cus_name: order.customerName,
        cus_email: order.email,
        cus_add1: order.address,
        cus_phone: order.phone,
        ship_name: order.customerName,
        ship_add1: order.address,
        ship_city: 'Dhaka',
        ship_country: 'Bangladesh',
    };

    const sslcz = new SSLCommerzPayment(store_id, store_passwd, is_live);
    
    try {
        const apiResponse = await sslcz.init(data);
        // এখান থেকে পেমেন্ট গেটওয়ে লিঙ্ক ফ্রন্টএন্ডে পাঠাচ্ছি
        res.send({ url: apiResponse.GatewayPageURL });
    } catch (error) {
        res.status(500).send({ message: "Payment Initiation Failed" });
    }
};

const paymentSuccess = async (req, res) => {
    const { tranId } = req.params;
    // এখানে তুমি ডাটাবেজে অর্ডারের স্ট্যাটাস 'Paid' আপডেট করবে
    // আপডেট করার পর ইউজারকে ফ্রন্টএন্ডের সাকসেস পেজে রিডাইরেক্ট করবে
    res.redirect(`http://localhost:5173/dashboard/payment/success/${tranId}`);
};

module.exports = { initiatePayment, paymentSuccess };
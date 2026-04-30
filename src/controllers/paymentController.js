const SSLCommerzPayment = require('sslcommerz-lts');
const { ObjectId } = require('mongodb');
const connectDB = require('../config/db'); // আপনার db ফাইলটি রিকয়ার করে নিলাম

const store_id = process.env.STORE_ID; 
const store_passwd = process.env.STORE_PASS; 
const is_live = false; 

const initiatePayment = async (req, res) => {
    const db = await connectDB(); // ডাটাবেজ কানেকশন নিলাম
    const orderCollection = db.collection('orders'); // 'orders' নামে কালেকশন ধরলাম
    
    const order = req.body;
    const tran_id = new ObjectId().toString(); 

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
        
        // --- ডাটাবেজে অর্ডারটি পেন্ডিং হিসেবে সেভ করা ---
        const finalOrder = {
            ...order,
            transactionId: tran_id,
            paidStatus: false,
            createdAt: new Date()
        };
        await orderCollection.insertOne(finalOrder);

        res.send({ url: apiResponse.GatewayPageURL });
    } catch (error) {
        console.error("SSL Error:", error);
        res.status(500).send({ message: "Payment Initiation Failed" });
    }
};

const paymentSuccess = async (req, res) => {
    const { tranId } = req.params;
    const db = await connectDB();
    const orderCollection = db.collection('orders');

    // ডাটাবেজে paidStatus আপডেট করা
    const result = await orderCollection.updateOne(
        { transactionId: tranId },
        { $set: { paidStatus: true } }
    );

    // পেমেন্ট সাকসেস হলে ফ্রন্টএন্ডে রিডাইরেক্ট (এখানে ফ্রন্টএন্ডে সাকসেস পেজ থাকতে হবে)
    res.redirect(`http://localhost:5173/dashboard/payment/success/${tranId}`);
};

module.exports = { initiatePayment, paymentSuccess };
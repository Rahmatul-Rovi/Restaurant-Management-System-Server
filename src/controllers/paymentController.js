const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

// পেমেন্ট শুরু করার ফাংশন
const initiatePayment = async (req, res) => {
    const { price } = req.body;
    const amount = Math.round(price * 100); 

    try {
        const paymentIntent = await stripe.paymentIntents.create({
            amount: amount,
            currency: 'usd',
            payment_method_types: ['card'],
        });
        res.send({ clientSecret: paymentIntent.client_secret });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};

// পেমেন্ট সাকসেস হওয়ার পর ডাটাবেজে সেভ করার ফাংশন
const saveOrderData = async (req, res) => {
    try {
        const orderInfo = req.body; // ফ্রন্টএন্ড থেকে আসা নাম, ঠিকানা, ট্রানজেকশন আইডি
        
        // আপনার ডাটাবেজ কানেকশন অনুযায়ী এখানে সেভ করবেন
        // উদাহরণ: const result = await orderCollection.insertOne(orderInfo);
        
        console.log("Order Received:", orderInfo);
        res.send({ success: true, message: "Order saved successfully!" });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};

module.exports = { initiatePayment, saveOrderData };
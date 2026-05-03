const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

// এটার নাম রাউটারের সাথে মিলিয়ে 'initiatePayment' দিন
const initiatePayment = async (req, res) => {
    const { price } = req.body;
    
    // সেফটি চেক: প্রাইস না থাকলে এরর দিবে
    if (!price) {
        return res.status(400).send({ error: "Price is required" });
    }

    const amount = Math.round(price * 100); 

    try {
        const paymentIntent = await stripe.paymentIntents.create({
            amount: amount,
            currency: 'usd',
            payment_method_types: ['card'],
        });

        res.send({
            clientSecret: paymentIntent.client_secret,
        });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};

// আপাতত খালি ফাংশন যেন এরর না দেয়
const paymentSuccess = async (req, res) => {
    res.send({ message: "Success logic goes here" });
};

module.exports = { initiatePayment, paymentSuccess };
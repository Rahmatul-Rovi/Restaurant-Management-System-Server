const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const { ObjectId } = require('mongodb');

// Staring payment Function
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

// Order Save & Cart Clear &  Showing History
const saveOrderData = async (req, res, db) => {
    try {
        const orderInfo = req.body;
        const ordersCollection = db.collection("orders");
        const cartCollection = db.collection("carts");

        // Database Order Save
        const result = await ordersCollection.insertOne(orderInfo);
        
        // User Cart Empty after successfully Checkout
        if (result.insertedId) {
            await cartCollection.deleteMany({ email: orderInfo.email });
        }

        res.send({ success: true, insertedId: result.insertedId });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};

const getUserOrders = async (req, res, db) => {
    try {
        const email = req.query.email;
        const ordersCollection = db.collection("orders");
        const result = await ordersCollection.find({ email: email }).toArray();
        res.send(result);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};

const getAllOrders = async (req, res, db) => {
    try {
        const ordersCollection = db.collection("orders");
        const result = await ordersCollection.find().toArray();
        res.send(result);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};

// Order Database Update (Pending -> Shipped/Confirmed)
const updateOrderStatus = async (req, res, db) => {
    try {
        const id = req.params.id;
        const { status } = req.body;
        const ordersCollection = db.collection("orders");
        const filter = { _id: new ObjectId(id) };
        const updateDoc = { $set: { status: status } };
        const result = await ordersCollection.updateOne(filter, updateDoc);
        res.send(result);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};

module.exports = { initiatePayment, saveOrderData, getUserOrders, updateOrderStatus, getAllOrders };
const { getDb } = require('../config/db');
const { ObjectId } = require('mongodb');

// ১. নতুন ইউজার সেভ করা
const saveUser = async (req, res) => {
    try {
        const db = getDb();
        if (!db) {
            return res.status(500).json({ message: "Database connection not established" });
        }

        const userCollection = db.collection('users');
        const user = req.body;

        if (!user.email) {
            return res.status(400).json({ message: "Email is required" });
        }

        const query = { email: user.email };
        const existingUser = await userCollection.findOne(query);

        if (existingUser) {
            // ✅ Already exists হলেও photoURL update করো (Google pic sync)
            await userCollection.updateOne(query, {
                $set: {
                    photoURL: user.photoURL || user.image || existingUser.photoURL || ""
                }
            });
            return res.send({ message: 'User already exists', insertedId: null });
        }

        const newUser = {
            name: user.name,
            email: user.email,
            photoURL: user.photoURL || user.image || "", // ✅ Google photoURL
            role: 'user',
            createdAt: new Date()
        };

        const result = await userCollection.insertOne(newUser);
        res.send(result);

    } catch (error) {
        console.error("SAVE USER ERROR:", error);
        res.status(500).send({ message: "Internal Server Error", error: error.message });
    }
};

// ২. সব ইউজার দেখা
const getAllUsers = async (req, res) => {
    try {
        const db = getDb();
        const result = await db.collection('users').find().toArray();
        res.send(result);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

// ৩. Admin বানানো
const makeAdmin = async (req, res) => {
    try {
        const db = getDb();
        const userCollection = db.collection('users');
        const id = req.params.id;

        if (!ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid User ID" });
        }

        const filter = { _id: new ObjectId(id) };
        const updateDoc = { $set: { role: 'admin' } };

        const result = await userCollection.updateOne(filter, updateDoc);
        res.send(result);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

// ৪. ইউজার ডিলিট
const deleteUser = async (req, res) => {
    try {
        const db = getDb();
        const id = req.params.id;

        if (!ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid User ID" });
        }

        const query = { _id: new ObjectId(id) };
        const result = await db.collection('users').deleteOne(query);
        res.send(result);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

// ৫. Email দিয়ে ইউজার খোঁজা
const getUserByEmail = async (req, res) => {
    try {
        const db = getDb();
        const email = req.params.email;

        if (!email) {
            return res.status(400).json({ message: "Email is required" });
        }

        const user = await db.collection('users').findOne({ email });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.send(user);
    } catch (error) {
        console.error("GET USER ERROR:", error);
        res.status(500).send({ message: error.message });
    }
};

// ৬. Profile Update
const updateUserProfile = async (req, res) => {
    try {
        const db = getDb();
        const email = req.params.email;
        const { name, phone, photoURL } = req.body;

        const filter = { email: email };

        const updatedData = {};
        if (name) updatedData.name = name;
        if (phone) updatedData.phone = phone;
        if (photoURL) updatedData.photoURL = photoURL;

        const updateDoc = { $set: updatedData };

        const result = await db.collection('users').updateOne(filter, updateDoc);

        if (result.matchedCount === 0) {
            return res.status(404).json({ message: "User not found in database" });
        }

        res.send(result);
    } catch (error) {
        console.error("UPDATE ERROR:", error);
        res.status(500).send({ message: "Update failed", error: error.message });
    }
};

module.exports = { saveUser, getAllUsers, makeAdmin, deleteUser, getUserByEmail, updateUserProfile };
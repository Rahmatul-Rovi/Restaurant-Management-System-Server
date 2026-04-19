const { getDb } = require('../config/db');
const { ObjectId } = require('mongodb');

// ১. নতুন ইউজার ডাটাবেজে সেভ করা
const saveUser = async (req, res) => {
    try {
        const db = getDb();
        if (!db) {
            return res.status(500).json({ message: "Database connection not established" });
        }
        
        const userCollection = db.collection('users');
        const user = req.body;

        // চেক করা হচ্ছে ইমেইল আছে কি না (ইমেইল ছাড়া সেভ করা যাবে না)
        if (!user.email) {
            return res.status(400).json({ message: "Email is required" });
        }

        // চেক করা হচ্ছে ইউজার আগে থেকে ডাটাবেজে আছে কি না
        const query = { email: user.email };
        const existingUser = await userCollection.findOne(query);

        if (existingUser) {
            return res.send({ message: 'User already exists', insertedId: null });
        }

        /**
         * সমাধান: এখানে আমরা ম্যানুয়ালি রোল সেট করছি।
         * নতুন ইউজার সেভ হওয়ার সময় সবসময় 'user' রোল পাবে।
         */
        const newUser = {
            name: user.name,
            email: user.email,
            photoURL: user.photoURL || user.image || "",
            role: 'user', // ডিফল্ট রোল সবসময় 'user'
            createdAt: new Date()
        };

        const result = await userCollection.insertOne(newUser);
        res.send(result);

    } catch (error) {
        console.error("SAVE USER ERROR:", error);
        res.status(500).send({ message: "Internal Server Error", error: error.message });
    }
};

// ২. সব ইউজারদের লিস্ট দেখা
const getAllUsers = async (req, res) => {
    try {
        const db = getDb();
        const result = await db.collection('users').find().toArray();
        res.send(result);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

// ৩. ইউজারকে অ্যাডমিন বানানো
const makeAdmin = async (req, res) => {
    try {
        const db = getDb();
        const userCollection = db.collection('users');
        const id = req.params.id;

        if (!ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid User ID" });
        }

        const filter = { _id: new ObjectId(id) };
        const updateDoc = {
            $set: {
                role: 'admin' // শুধু এই ফাংশনটি কল করলেই কেউ অ্যাডমিন হবে
            },
        };

        const result = await userCollection.updateOne(filter, updateDoc);
        res.send(result);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

// ৪. ইউজার ডিলিট করা
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

// Get user with email
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

const updateUserProfile = async (req, res) => {
    try {
        const db = getDb();
        const email = req.params.email; // ইমেইল দিয়ে ইউজার খুঁজে আপডেট করবো
        const { name, phone, photoURL } = req.body; // ফ্রন্টএন্ড থেকে যা যা পাঠাবে

        const filter = { email: email };
        const updateDoc = {
            $set: {
                name: name,
                phone: phone,
                photoURL: photoURL // ইমেজ আপডেট হওয়ার মূল জায়গা
            },
        };

        const result = await db.collection('users').updateOne(filter, updateDoc);
        res.send(result);
    } catch (error) {
        console.error("UPDATE ERROR:", error);
        res.status(500).send({ message: "Update failed", error: error.message });
    }
};



module.exports = { saveUser, getAllUsers, makeAdmin, deleteUser, getUserByEmail, updateUserProfile };
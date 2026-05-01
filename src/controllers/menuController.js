const { getDb } = require('../config/db');
const { ObjectId } = require('mongodb');

// Add New Item
const addMenuItem = async (req, res) => {
    try {
        const db = getDb();

        if (!db) {
            return res.status(500).json({ message: "Database not connected" });
        }

        const menuCollection = db.collection('menu');

        const newItem = req.body;

        //  Validation
        if (!newItem.name || !newItem.price || !newItem.category) {
            return res.status(400).json({ message: "সব ফিল্ড দিতে হবে (name, price, category)" });
        }

        const result = await menuCollection.insertOne(newItem);

        res.status(201).json({
            success: true,
            message: "Menu item added successfully",
            data: result
        });

    } catch (error) {
        console.error("ADD MENU ERROR:", error); // 🔥 important
        res.status(500).json({ message: "Internal Server Error" });
    }
};

// All Menu Data
const getMenu = async (req, res) => {
    try {
        const db = getDb();
        if (!db) return res.status(500).json({ message: "Database not connected" });

        const menuCollection = db.collection('menu');
        const result = await menuCollection.find().toArray();

        res.json(result);

    } catch (error) {
        console.error("GET MENU ERROR:", error);
        res.status(500).json({ message: "Error fetching data" });
    }
};

// Popular Menu
const getPopularMenu = async (req, res) => {
    try {
        const db = getDb();
        if (!db) return res.status(500).json({ message: "Database not connected" });

        const menuCollection = db.collection('menu');

        // improved query
        const query = {
            category: { $regex: "biryani|fish", $options: "i" }
        };

        const result = await menuCollection.find(query).toArray();

        res.json(result);

    } catch (error) {
        console.error("POPULAR MENU ERROR:", error);
        res.status(500).json({ message: "Error fetching popular data" });
    }
};

// ৪. ক্যাটাগরি অনুযায়ী ডাটা
const getMenuByCategory = async (req, res) => {
    try {
        const db = getDb();
        if (!db) return res.status(500).json({ message: "Database not connected" });

        const menuCollection = db.collection('menu');
        const categoryName = req.params.category;

        const query = {
            category: { $regex: new RegExp(categoryName, 'i') }
        };

        const result = await menuCollection.find(query).toArray();

        res.json(result);

    } catch (error) {
        console.error("CATEGORY ERROR:", error);
        res.status(500).json({ message: "Error fetching category data" });
    }
};

// ৫. সার্চ ফাংশন
const searchMenu = async (req, res) => {
    try {
        const db = getDb();
        if (!db) return res.status(500).json({ message: "Database not connected" });

        const menuCollection = db.collection('menu');
        const searchText = req.query.search;

        let query = {};

        if (searchText) {
            query = {
                name: { $regex: searchText, $options: 'i' }
            };
        }

        const result = await menuCollection.find(query).toArray();

        res.json(result);

    } catch (error) {
        console.error("SEARCH ERROR:", error);
        res.status(500).json({ message: "Error searching food" });
    }
};

// ৬. ডিলিট ফাংশন
const deleteMenuItem = async (req, res) => {
    try {
        const db = getDb();
        if (!db) return res.status(500).json({ message: "Database not connected" });

        const menuCollection = db.collection('menu');
        const id = req.params.id;

        // ✅ safe ObjectId
        if (!ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid ID" });
        }

        const query = { _id: new ObjectId(id) };

        const result = await menuCollection.deleteOne(query);

        res.json({
            success: true,
            message: "Item deleted",
            data: result
        });

    } catch (error) {
        console.error("DELETE ERROR:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

// ৭. UPDATE ITEM
const updateMenuItem = async (req, res) => {
    try {
        const db = getDb();
        if (!db) return res.status(500).json({ message: "Database not connected" });

        const menuCollection = db.collection('menu');

        const id = req.params.id;

        if (!ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid ID" });
        }

        const updatedData = req.body;

        const result = await menuCollection.updateOne(
            { _id: new ObjectId(id) },
            { $set: updatedData }
        );

        res.json({
            success: true,
            message: "Item updated successfully",
            data: result
        });

    } catch (error) {
        console.error("UPDATE ERROR:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

module.exports = {
    getMenu,
    getPopularMenu,
    getMenuByCategory,
    searchMenu,
    addMenuItem,
    deleteMenuItem,
    updateMenuItem
};
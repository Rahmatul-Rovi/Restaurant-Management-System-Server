// menuController.js - All logic for Menu

// All Menu Data Showing
const getMenu = async (req, res, menuCollection) => {
    try {
        const result = await menuCollection.find().toArray();
        res.send(result);
    } catch (error) {
        res.status(500).send({ message: "Error to Data fetch", error });
    }
};

// For Home page Biyani items
const getPopularMenu = async (req, res, menuCollection) => {
    try {
        // Searching Biryani Items
        const query = { category: { $in: ['Biryani', 'biryani', 'Fish', 'fish'] } }; 
        const result = await menuCollection.find(query).toArray();
        res.send(result);
    } catch (error) {
        res.status(500).send({ message: "Error to Popular data fetch", error });
    }
};

const getMenuByCategory = async (req, res, menuCollection) => {
    try {
        const categoryName = req.params.category;
        // Using Regrex. for case sentitive 
        const query = { category: { $regex: new RegExp(categoryName, 'i') } };
        const result = await menuCollection.find(query).toArray();
        res.send(result);
    } catch (error) {
        res.status(500).send({ message: "Error fetching category data", error });
    }
};

// ৪. Search Functionality for navbar search function
const searchMenu = async (req, res, menuCollection) => {
    try {
        const searchText = req.query.search;
        let query = {};
        if (searchText) {
            query = { name: { $regex: searchText, $options: 'i' } };
        }
        const result = await menuCollection.find(query).toArray();
        res.send(result);
    } catch (error) {
        res.status(500).send({ message: "Error searching food", error });
    }
};

const addMenuItem = async(req, res) => {
    try{
        const db = getDb();
        const menuCollection = db.collection('menu');
        const newItem = req.body;
        const result = await menuCollection.insertOne(newItem);
        res.send(result);
    }
    catch (error){
       res.status(500).send({message:error.message});
    }
};


const { ObjectId } = require('mongodb');

const deleteMenuItem = async (req, res) => {
    try {
        const db = getDb();
        const menuCollection = db.collection('menu');
        const id = req.params.id;
        const query = { _id: new ObjectId(id) };
        const result = await menuCollection.deleteOne(query);
        res.send(result);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};



module.exports = { 
    getMenu, 
    getPopularMenu, 
    getMenuByCategory, 
    searchMenu ,
    addMenuItem,
    deleteMenuItem
};
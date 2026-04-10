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
        const query = { category: 'Biryani' }; 
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

module.exports = { 
    getMenu, 
    getPopularMenu, 
    getMenuByCategory, 
    searchMenu 
};
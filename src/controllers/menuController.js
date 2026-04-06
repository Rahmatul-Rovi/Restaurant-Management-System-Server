// menuController.js - Shob logic eikhane thakbe
const getMenu = async (req, res, menuCollection) => {
    try {
        const result = await menuCollection.find().toArray();
        res.send(result);
    } catch (error) {
        res.status(500).send({ message: "Error to Data fetch", error });
    }
};

const getPopularMenu = async (req, res, menuCollection) => {
    try {
        const query = { category: 'popular' };
        const result = await menuCollection.find(query).toArray();
        res.send(result);
    } catch (error) {
        res.status(500).send({ message: "Error to Popular data fetch", error });
    }
};

module.exports = { getMenu, getPopularMenu };
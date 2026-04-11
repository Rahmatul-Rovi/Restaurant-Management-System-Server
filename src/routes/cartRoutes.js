
const {addToCart, getCartByEmail, deleteCartItem} = require('../controllers/cartController');


const cartRoutes = (app, db) => {
    const cartCollection = db.collection("carts");
    
    app.post('/carts', (req,res)=> addToCart(req,res,cartCollection));
    app.get('/carts', (req,res)=> getCartByEmail(req,res,cartCollection));
    app.delete('/carts/:id', (req,res)=> deleteCartItem(req,res,cartCollection));
};

module.exports = cartRoutes;

const addToCart = async (req,res,cartCollection) => {
  try{
    const cartItem = req.body;
    const result = await cartCollection.insertOne(cartItem);
    res.send(result);

  }
  catch (error){
   res.status(500).send({mesage: "Error adding to cart", error});
  }
};


const getCartByEmail = async (req, res, cartCollection) => {
    try{
      const email = req.query.email;
      const query = {email: email};
      const result = await cartCollection.findOne(query).toArray();
      res.send(result);
    }
    catch(error){
        res.status(500).send({error:"Error fetching Cart", error});
    }
};
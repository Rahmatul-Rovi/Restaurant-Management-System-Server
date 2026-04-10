
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
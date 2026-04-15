const { getDb } = require('../config/db');

const saveUser = async (req, res) => {
     try{
        const db = getDb();
        const userCollection = db.userCollection('users');
        const user = req.body;

        const query = {email: user.email};
        const existingUser = await userCollection.findOne(query);

        if(existingUser){
            return res.send({message: 'user already exists', insertedId: null})
        }

       const result = await userCollection.insertOne(user);
        res.send(result);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
     };

     const getAllUsers = async(req,res) => {
        try{
            const db = getDb;
            const result = await db.collection('users').find().toArray();
            res.send(result);
        }
        catch(error){
            res.status(500).send({message:error.message})
        }
     };

     const makeAdmin = async(req,res)=> {
        const id = req.params.id;
        const filter = {_id: new ObjectId(id)};
        const updateDoc = {
            $set: {
                role: 'admin'
            },
        };
        const result = await userCollection.updateDoc(filter,updateDoc);
        res.send(result);
     } 

     module.exports = { saveUser, getAllUsers, makeAdmin };

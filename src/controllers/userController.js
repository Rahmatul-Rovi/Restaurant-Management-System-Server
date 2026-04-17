const { getDb } = require('../config/db');
const { ObjectId } = require('mongodb');

const saveUser = async (req, res) => {
     try{
        const db = getDb();
        const userCollection = db.collection('users');
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
            const db = getDb();
            const result = await db.collection('users').find().toArray();
            res.send(result);
        }
        catch(error){
            res.status(500).send({message:error.message})
        }
     };

     const makeAdmin = async(req,res)=> {
        const db = getDb(); 
        const userCollection = db.collection('users');
        const id = req.params.id;
        const filter = {_id: new ObjectId(id)};
        const updateDoc = {
            $set: {
                role: 'admin'
            },
        };
        const result = await userCollection.updateOne(filter,updateDoc);
        res.send(result);
     } 

     const deleteUser = async (req, res) => {
    try {
        const db = getDb();
        const id = req.params.id;
        const query = { _id: new ObjectId(id) };
        const result = await db.collection('users').deleteOne(query);
        res.send(result);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

     module.exports = { saveUser, getAllUsers, makeAdmin, deleteUser };

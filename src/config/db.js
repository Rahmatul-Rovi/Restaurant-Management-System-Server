const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.bou0ahg.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

let db; 

const connectDB = async () => {
    try {
        await client.connect();

        db = client.db("Tasty_Twists_DB"); 

        console.log("MongoDB Connected Successfully! ✅");

        return db;
    } catch (error) {
        console.error("MongoDB Connection Failed! ❌", error);
        process.exit(1); 
    }
};

// 🔥 THIS WAS MISSING
const getDb = () => {
    if (!db) {
        throw new Error("Database not initialized!");
    }
    return db;
};

module.exports = connectDB;
module.exports.getDb = getDb;
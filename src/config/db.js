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

const connectDB = async () => {
    try {
        await client.connect();
        console.log("MongoDB Connected Successfully! ✅");
        return client.db("Tasty_Twists_DB");
    } catch (error) {
        console.error("MongoDB Connection Failed! ❌", error);
        process.exit(1); 
    }
};

module.exports = connectDB;
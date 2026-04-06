const express = require('express');
const cors = require('cors');
const connectDB = require('./src/config/db');
const menuRoutes = require('./src/routes/menuRoutes');

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Main Function to Start Server
async function startServer() {
    const db = await connectDB(); 

    if (db) {
        // Routes Setup
        app.use('/menu', menuRoutes(db));

        app.get('/', (req, res) => {
            res.send('TastyTwists Server is Running Modularly..');
        });

        app.listen(port, () => {
            console.log(`Server running on port: ${port}`);
        });
    }
}

startServer();
const express = require('express');
const cors = require('cors');
const connectDB = require('./src/config/db');
const menuRoutes = require('./src/routes/menuRoutes');
const cartRoutes = require('./src/routes/cartRoutes');
const userRoutes = require('./src/routes/userRoutes');
const paymentRoutes = require('./src/routes/paymentRoutes');

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

async function startServer() {
    const db = await connectDB(); 

    if (db) {
      
        app.use('/menu', menuRoutes());
   
       cartRoutes(app,db);

        app.get('/', (req, res) => {
            res.send('TastyTwists Server is Running Modularly..');
        });

        app.use('/users', userRoutes);

       paymentRoutes(app, db);

        app.listen(port, () => {
            console.log(`Server running on port: ${port}`);
        });
    }
}

startServer();
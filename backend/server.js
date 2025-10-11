const express = require('express');
const connectDB = require('./config/db');
const api = require('./routes/api')
const helmet = require('helmet')
const app = express();
connectDB();
app.use(helmet());

const PORT = 5000;


app.use('/scan',api)
app.listen(PORT,() =>{
console.log(" server is running on port " + PORT);
});
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();
async function connectDB() {
    mongoose.connect(process.env.MONGO_URL,
    ).then(() => {
        console.log("DB connection successful");
    }).catch((err) => {
    console.log("DB connection error: " + err);
});
}
module.exports = connectDB;
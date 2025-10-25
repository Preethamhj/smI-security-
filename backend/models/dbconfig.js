// Phase 1: Sequelize PostgreSQL connection
require('dotenv').config();
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
    process.env.DB_NAME, 
    process.env.DB_USER, 
    process.env.DB_PASS, 
    {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        dialect: process.env.DB_DIALECT,
        logging: false, // Set to console.log for query debugging
        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000
        }
    }
);

// Connection check (optional but useful for quick debug)
// sequelize.authenticate()
//     .then(() => console.log('DB Connection successful.'))
//     .catch(err => console.error('DB Connection error:', err));

module.exports = sequelize;
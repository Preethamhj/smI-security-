import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import  { pool } from './models/dbconfig.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());


// Simple test route
app.get('/', async (req, res) => {
  try {
   
    const { rows } = await pool.query('SELECT NOW()');
    console.log('✅ Server connected to the database');
    console.log('DB Time:', rows[0].now);

    res.json({ serverTime: rows[0].now });
  } catch (err) {
    res.status(500).json({ error: 'DB query failed' });
  }
});

// Start server
app.listen(port, () => {
  console.log(`🚀 Server running on port: ${port}`);
});

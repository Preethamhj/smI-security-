// Load environment variables
import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { pool } from './models/dbconfig.js';
import apiRoutes from './routes/api.js'; // assuming you have this file

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(helmet());
app.use(cors({
  origin: process.env.NODE_ENV === 'development'
    ? 'http://localhost:5173'
    : 'https://yourdomain.com',
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/v1', apiRoutes);

// Health check route
app.get('/', async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT NOW()');
    console.log('✅ Database connected | Time:', rows[0].now);
    res.status(200).json({
      status: 'API is running',
      version: 'v1',
      dbTime: rows[0].now,
    });
  } catch (err) {
    console.error('❌ Database connection failed:', err.message);
    res.status(500).json({ error: 'Database connection failed' });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port: ${PORT}`);
});

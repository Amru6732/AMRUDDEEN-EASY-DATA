'use strict';

const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/auth');
const walletRoutes = require('./routes/wallet');
const dataRoutes = require('./routes/data');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());  // Parse JSON bodies
app.use(express.urlencoded({ extended: true }));  // Parse URL-encoded bodies

// Database connection
mongoose.connect('mongodb://localhost:27017/easy_data', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/wallet', walletRoutes);
app.use('/api/data', dataRoutes);

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

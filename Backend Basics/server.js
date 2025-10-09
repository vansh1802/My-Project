const express = require('express');
const connectDB = require('./config/db');
const logger = require('./middleware/logger');
const protectedRoutes = require('./routes/protectedRoutes');
const authRoutes = require('./routes/authRoutes');
const bankingRoutes = require('./routes/bankingRoutes');
const transferRoutes = require('./routes/transferRoutes');

const app = express();
connectDB();
app.use(express.json());
app.use(logger);

app.use('/api', authRoutes);
app.use('/api', bankingRoutes);
app.use('/api', transferRoutes);
app.use('/', protectedRoutes);

const PORT = 3000;
app.listen(PORT, () => console.log(`🚀 Server running at http://localhost:${PORT}`));
const dotenv = require('dotenv');
dotenv.config(); // Loads .env from current directory (backend/.env)

const express = require('express');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const db = require('./config/db');

const app = express();

// Allowed origins for CORS
const allowedOrigins = [
  'http://localhost:3000',  // React development
  'http://localhost:5173',  // Vite development
  process.env.FRONTEND_URL, // From .env
  // Add your production domain here when deploying
].filter(Boolean); // Remove undefined values

// CORS Configuration - Must come BEFORE helmet
app.use((req, res, next) => {
  const origin = req.headers.origin;

  // Check if the origin is in the allowed list
  if (allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }

  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS, PATCH');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');
  res.setHeader('Access-Control-Allow-Credentials', 'true');

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }

  next();
});

// Security Middleware (comes after CORS)
app.use(helmet({
  crossOriginResourcePolicy: { policy: "cross-origin" }
}));

// Body Parser Middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Cookie Parser Middleware
app.use(cookieParser());

// Additional Security Headers
app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  if (process.env.NODE_ENV === 'production') {
    res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
  }
  next();
});

// Routes
const authRoutes = require('./routes/auth');
const refundRoutes = require('./routes/refunds');
const deliveryRoutes = require('./routes/delivery');

app.use('/api/auth', authRoutes);
app.use('/api/refunds', refundRoutes);
app.use('/api/delivery', deliveryRoutes);

app.get('/', (req, res) => {
  res.json({ message: 'Welcome to Redragon Shop API' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(500).json({ msg: 'Internal server error' });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
});

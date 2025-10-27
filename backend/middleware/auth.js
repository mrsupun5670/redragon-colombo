const jwt = require('jsonwebtoken');

// Middleware to verify JWT token from cookies or Authorization header
const auth = (req, res, next) => {
  try {
    // Get token from cookie first, then from Authorization header
    let token = req.cookies.token;
    
    if (!token) {
      const authHeader = req.header('Authorization') || req.headers.authorization;
      if (authHeader && authHeader.startsWith('Bearer ')) {
        token = authHeader.substring(7);
      }
    }
    

    // Debug logging for token issues
    if (!token) {
      console.log('❌ No token found in:', {
        cookies: !!req.cookies.token,
        authHeader: req.header('Authorization') || req.headers.authorization,
        headers: Object.keys(req.headers)
      });
      return res.status(401).json({ 
        success: false,
        message: 'No token, authorization denied' 
      });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // Add user from payload to request object
    req.user = decoded;
    next();
  } catch (err) {
    console.error('❌ Auth middleware error:', err.message);
    res.status(401).json({ 
      success: false,
      message: 'Token is not valid' 
    });
  }
};

// Middleware to check if user is admin
const adminAuth = (req, res, next) => {
  auth(req, res, () => {
    if (req.user.type !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Access denied. Admin privileges required.'
      });
    }
    next();
  });
};

// Optional middleware - doesn't require auth but sets req.user if token is valid
const optionalAuth = (req, res, next) => {
  try {
    // Get token from cookie first, then from Authorization header
    let token = req.cookies.token;
    
    if (!token) {
      const authHeader = req.header('Authorization') || req.headers.authorization;
      if (authHeader && authHeader.startsWith('Bearer ')) {
        token = authHeader.substring(7);
      }
    }
    
    // If no token, continue without setting req.user
    if (!token) {
      return next();
    }

    // Verify token if present
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    // If token is invalid, continue without setting req.user (don't block request)
    next();
  }
};

module.exports = { auth, adminAuth, optionalAuth };
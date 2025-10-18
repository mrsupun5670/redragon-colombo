const jwt = require('jsonwebtoken');

// Middleware to verify JWT token from cookies
const auth = (req, res, next) => {
  try {
    // Get token from cookie (most secure method)
    const token = req.cookies.token;

    // Check if token exists
    if (!token) {
      return res.status(401).json({ msg: 'No token, authorization denied' });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Add user from payload to request object
    req.user = decoded.user;
    next();
  } catch (err) {
    console.error('Auth middleware error:', err.message);
    res.status(401).json({ msg: 'Token is not valid' });
  }
};

module.exports = auth;
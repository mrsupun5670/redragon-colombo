const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Customer = require('../models/Customer');

exports.getMe = async (req, res) => {
  try {
    // Get user ID from authenticated request (set by auth middleware)
    const userId = req.user.id;

    const user = await Customer.findById(userId);
    if (user.length === 0) {
      return res.status(404).json({ msg: 'User not found' });
    }

    // Return user data without password hash
    const { password_hash, ...userData } = user[0];
    res.json({
      success: true,
      user: {
        id: userData.customer_id,
        firstName: userData.first_name,
        lastName: userData.last_name,
        email: userData.email,
        phone: userData.phone,
        isActive: userData.is_active
      }
    });
  } catch (err) {
    console.error('Get user error:', err);
    res.status(500).json({ msg: 'Server error' });
  }
};

exports.logout = async (req, res) => {
  try {
    // Clear the authentication cookie
    res.clearCookie('token', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict'
    });

    res.json({
      success: true,
      msg: 'Logged out successfully'
    });
  } catch (err) {
    console.error('Logout error:', err);
    res.status(500).json({ msg: 'Server error' });
  }
};


exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find customer by email
    const users = await Customer.findByEmail(email.toLowerCase());

    if (users.length === 0) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    const user = users[0];

    // Check if account is active
    if (!user.is_active) {
      return res.status(403).json({ msg: 'Account has been deactivated. Please contact support.' });
    }

    // Compare password with hash
    const isMatch = await bcrypt.compare(password, user.password_hash);

    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    // Create JWT payload with minimal user info
    const payload = {
      user: {
        id: user.customer_id,
        email: user.email,
        firstName: user.first_name,
        lastName: user.last_name
      }
    };

    // Generate JWT token with 7 days expiration
    const token = jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    // Set secure HTTP-only cookie
    res.cookie('token', token, {
      httpOnly: true, // Prevents XSS attacks
      secure: process.env.NODE_ENV === 'production', // HTTPS only in production
      sameSite: 'strict', // CSRF protection
      maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    });

    // Return success response
    res.json({
      success: true,
      msg: 'Login successful',
      user: {
        id: user.customer_id,
        firstName: user.first_name,
        lastName: user.last_name,
        email: user.email,
        phone: user.phone
      }
    });

  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ msg: 'Server error. Please try again later.' });
  }
};

exports.register = async (req, res) => {
  const { firstName, lastName, email, phone, password } = req.body;

  try {
    // Check if user with email already exists
    const existingUserByEmail = await Customer.findByEmail(email);
    if (existingUserByEmail.length > 0) {
      return res.status(400).json({ msg: 'An account with this email already exists' });
    }

    // Check if user with phone already exists
    const existingUserByPhone = await Customer.findByPhone(phone);
    if (existingUserByPhone.length > 0) {
      return res.status(400).json({ msg: 'An account with this phone number already exists' });
    }

    // Hash password with bcrypt (12 rounds for enhanced security)
    const salt = await bcrypt.genSalt(12);
    const password_hash = await bcrypt.hash(password, salt);

    // Create new customer object
    const newCustomer = {
      first_name: firstName,
      last_name: lastName,
      email: email.toLowerCase(), // Store email in lowercase
      phone,
      password_hash
    };

    // Insert customer into database
    const result = await Customer.create(newCustomer);

    // Create JWT payload with minimal user info
    const payload = {
      user: {
        id: result.insertId,
        email: email.toLowerCase(),
        firstName: firstName,
        lastName: lastName
      }
    };

    // Generate JWT token with 7 days expiration
    const token = jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    // Set secure HTTP-only cookie
    res.cookie('token', token, {
      httpOnly: true, // Prevents XSS attacks
      secure: process.env.NODE_ENV === 'production', // HTTPS only in production
      sameSite: 'strict', // CSRF protection
      maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    });

    // Return success response
    res.status(201).json({
      success: true,
      msg: 'Registration successful',
      user: {
        id: result.insertId,
        firstName: firstName,
        lastName: lastName,
        email: email.toLowerCase()
      }
    });

  } catch (err) {
    console.error('Registration error:', err);
    res.status(500).json({ msg: 'Server error. Please try again later.' });
  }
};
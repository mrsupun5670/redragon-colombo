const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Customer = require('../models/Customer');
const Admin = require('../models/Admin');
const { hashPassword, comparePassword, generateToken } = require('../utils/auth');

exports.getMe = async (req, res) => {
  try {
    const userId = req.user.id;
    const userType = req.user.type;

    let user;
    let userData;

    if (userType === 'admin') {
      // Get admin data
      user = await Admin.findById(userId);
      if (!user) {
        return res.status(404).json({ 
          success: false,
          message: 'Admin not found' 
        });
      }

      userData = {
        id: user.id,
        username: user.username,
        email: user.email,
        type: 'admin',
        isActive: user.is_active
      };
    } else {
      // Get customer data
      const customers = await Customer.findById(userId);
      if (customers.length === 0) {
        return res.status(404).json({ 
          success: false,
          message: 'Customer not found' 
        });
      }

      const customer = customers[0];
      userData = {
        id: customer.customer_id,
        firstName: customer.first_name,
        lastName: customer.last_name,
        email: customer.email,
        phone: customer.phone,
        type: 'customer',
        isActive: customer.is_active
      };
    }

    res.json({
      success: true,
      user: userData
    });
  } catch (err) {
    console.error('Get user error:', err);
    res.status(500).json({ 
      success: false,
      message: 'Server error' 
    });
  }
};

exports.logout = async (req, res) => {
  try {
    // For token-based auth, we just send success response
    // Token will be removed from localStorage by frontend
    res.json({
      success: true,
      message: 'Logged out successfully'
    });
  } catch (err) {
    console.error('Logout error:', err);
    res.status(500).json({ 
      success: false,
      message: 'Server error' 
    });
  }
};


exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find customer by email
    const users = await Customer.findByEmail(email.toLowerCase());

    if (users.length === 0) {
      return res.status(400).json({ 
        success: false,
        message: 'Invalid credentials' 
      });
    }

    const user = users[0];

    // Check if account is active
    if (!user.is_active) {
      return res.status(403).json({ 
        success: false,
        message: 'Account has been deactivated. Please contact support.' 
      });
    }

    // Compare password with hash
    const isMatch = await comparePassword(password, user.password_hash);

    if (!isMatch) {
      return res.status(400).json({ 
        success: false,
        message: 'Invalid credentials' 
      });
    }

    // Create JWT payload
    const payload = {
      id: user.customer_id,
      email: user.email,
      firstName: user.first_name,
      lastName: user.last_name,
      type: 'customer'
    };

    // Generate JWT token
    const token = generateToken(payload);

    // Return success response with token
    res.json({
      success: true,
      message: 'Login successful',
      token,
      user: {
        id: user.customer_id,
        firstName: user.first_name,
        lastName: user.last_name,
        email: user.email,
        phone: user.phone,
        type: 'customer'
      }
    });

  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ 
      success: false,
      message: 'Server error. Please try again later.' 
    });
  }
};

exports.register = async (req, res) => {
  const { firstName, lastName, email, phone, password } = req.body;

  try {
    // Check if user with email already exists
    const existingUserByEmail = await Customer.findByEmail(email);
    if (existingUserByEmail.length > 0) {
      return res.status(400).json({ 
        success: false,
        message: 'An account with this email already exists' 
      });
    }

    // Check if user with phone already exists
    const existingUserByPhone = await Customer.findByPhone(phone);
    if (existingUserByPhone.length > 0) {
      return res.status(400).json({ 
        success: false,
        message: 'An account with this phone number already exists' 
      });
    }

    // Hash password
    const password_hash = await hashPassword(password);

    // Create new customer object
    const newCustomer = {
      first_name: firstName,
      last_name: lastName,
      email: email.toLowerCase(),
      phone,
      password_hash
    };

    // Insert customer into database
    const result = await Customer.create(newCustomer);

    // Create JWT payload
    const payload = {
      id: result.insertId,
      email: email.toLowerCase(),
      firstName: firstName,
      lastName: lastName,
      type: 'customer'
    };

    // Generate JWT token
    const token = generateToken(payload);

    // Return success response with token
    res.status(201).json({
      success: true,
      message: 'Registration successful',
      token,
      user: {
        id: result.insertId,
        firstName: firstName,
        lastName: lastName,
        email: email.toLowerCase(),
        phone: phone,
        type: 'customer'
      }
    });

  } catch (err) {
    console.error('Registration error:', err);
    res.status(500).json({ 
      success: false,
      message: 'Server error. Please try again later.' 
    });
  }
};

// Admin login
exports.adminLogin = async (req, res) => {
  const { username, password } = req.body;

  try {
    // Find admin by username or email
    const admin = await Admin.findByUsername(username);

    if (!admin) {
      return res.status(400).json({ 
        success: false,
        message: 'Invalid credentials' 
      });
    }

    // Check if account is active
    if (!admin.is_active) {
      return res.status(403).json({ 
        success: false,
        message: 'Account has been deactivated. Please contact support.' 
      });
    }

    // Compare password with hash
    const isMatch = await comparePassword(password, admin.password_hash);

    if (!isMatch) {
      return res.status(400).json({ 
        success: false,
        message: 'Invalid credentials' 
      });
    }

    // Update last login
    await Admin.updateLastLogin(admin.id);

    // Create JWT payload
    const payload = {
      id: admin.id,
      username: admin.username,
      email: admin.email,
      type: 'admin'
    };

    // Generate JWT token
    const token = generateToken(payload);

    // Return success response with token
    res.json({
      success: true,
      message: 'Admin login successful',
      token,
      user: {
        id: admin.id,
        username: admin.username,
        email: admin.email,
        type: 'admin'
      }
    });

  } catch (err) {
    console.error('Admin login error:', err);
    res.status(500).json({ 
      success: false,
      message: 'Server error. Please try again later.' 
    });
  }
};
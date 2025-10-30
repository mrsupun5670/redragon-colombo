const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const Customer = require('../models/Customer');
const Admin = require('../models/Admin');
const { hashPassword, comparePassword, generateToken } = require('../utils/auth');
const { sendPasswordResetEmail } = require('../config/email');

exports.getMe = async (req, res) => {
  try {
    const userId = req.user.id;
    const userType = req.user.type;

    let user;
    let userData;

    if (userType === 'admin') {
      // Get admin data
      try {
        user = await Admin.findById(userId);
        
        if (!user) {
          return res.status(404).json({ 
            success: false,
            message: 'Admin not found' 
          });
        }

        userData = {
          id: user.id,
          username: user.username.trim(), // Clean username of whitespace characters
          email: user.email,
          type: 'admin',
          isActive: user.is_active
        };
      } catch (adminError) {
        console.error('Admin lookup error:', adminError);
        return res.status(500).json({ 
          success: false,
          message: 'Error fetching admin data' 
        });
      }
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

exports.updateProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const userType = req.user.type;

    if (userType !== 'customer') {
      return res.status(403).json({
        success: false,
        message: 'Only customers can update profile'
      });
    }

    const { firstName, lastName, email, phone } = req.body;

    // Validate input
    if (!firstName || !lastName || !email || !phone) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required'
      });
    }

    // Check if email is already taken by another customer
    const existingCustomer = await Customer.findByEmail(email.toLowerCase());
    if (existingCustomer.length > 0 && existingCustomer[0].customer_id !== userId) {
      return res.status(400).json({
        success: false,
        message: 'Email is already taken by another account'
      });
    }

    // Check if phone is already taken by another customer
    const existingPhone = await Customer.findByPhone(phone);
    if (existingPhone.length > 0 && existingPhone[0].customer_id !== userId) {
      return res.status(400).json({
        success: false,
        message: 'Phone number is already taken by another account'
      });
    }

    // Update customer data
    const updateData = {
      first_name: firstName,
      last_name: lastName,
      email: email.toLowerCase(),
      phone: phone
    };

    await Customer.update(userId, updateData);

    // Get updated user data
    const updatedCustomer = await Customer.findById(userId);
    if (updatedCustomer.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Customer not found'
      });
    }

    const customer = updatedCustomer[0];
    const userData = {
      id: customer.customer_id,
      firstName: customer.first_name,
      lastName: customer.last_name,
      email: customer.email,
      phone: customer.phone,
      type: 'customer',
      isActive: customer.is_active
    };

    res.json({
      success: true,
      message: 'Profile updated successfully',
      user: userData
    });
  } catch (err) {
    console.error('Update profile error:', err);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

exports.changePassword = async (req, res) => {
  try {
    const userId = req.user.id;
    const userType = req.user.type;
    const { currentPassword, newPassword, confirmPassword } = req.body;

    // Validate user type
    if (userType !== 'customer') {
      return res.status(403).json({
        success: false,
        message: 'Only customers can change password'
      });
    }

    // Validate input
    if (!currentPassword || !newPassword || !confirmPassword) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required'
      });
    }

    // Check if new passwords match
    if (newPassword !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: 'New password and confirm password do not match'
      });
    }

    // Validate password strength
    if (newPassword.length < 6) {
      return res.status(400).json({
        success: false,
        message: 'New password must be at least 6 characters long'
      });
    }

    // Get current customer data
    const customers = await Customer.findById(userId);
    if (customers.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Customer not found'
      });
    }

    const customer = customers[0];

    // Verify current password
    const isCurrentPasswordValid = await comparePassword(currentPassword, customer.password_hash);
    if (!isCurrentPasswordValid) {
      return res.status(400).json({
        success: false,
        message: 'Current password is incorrect'
      });
    }

    // Hash new password
    const newPasswordHash = await hashPassword(newPassword);

    // Update password in database
    await Customer.update(userId, { password_hash: newPasswordHash });

    res.json({
      success: true,
      message: 'Password changed successfully'
    });
  } catch (err) {
    console.error('Change password error:', err);
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
      username: admin.username.trim(), // Clean username of whitespace characters
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
        username: admin.username.trim(), // Clean username of whitespace characters  
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

// Forget Password
exports.forgetPassword = async (req, res) => {
  try {
    const { email } = req.body;

    // Validate input
    if (!email) {
      return res.status(400).json({
        success: false,
        message: 'Email is required'
      });
    }

    // Find customer by email
    const customers = await Customer.findByEmail(email.toLowerCase());
    if (customers.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'No account found with this email address'
      });
    }

    const customer = customers[0];

    // Check if account is active
    if (!customer.is_active) {
      return res.status(403).json({
        success: false,
        message: 'Account is deactivated. Please contact support.'
      });
    }

    // Generate 6-digit reset code
    const resetCode = Math.floor(100000 + Math.random() * 900000); // Integer, not string
    const resetCodeExpiry = new Date(Date.now() + 300000); // 5 minutes from now


    // Save reset code to database
    await Customer.setPasswordResetCode(email.toLowerCase(), resetCode, resetCodeExpiry);

    // Send password reset email
    try {
      await sendPasswordResetEmail(
        email.toLowerCase(),
        resetCode,
        `${customer.first_name} ${customer.last_name}`
      );
    } catch (emailError) {
      console.error('Email sending failed:', emailError.message);
      // Still return success since code is saved to database
    }

    res.json({
      success: true,
      message: 'Password reset code has been sent to your email address'
    });

  } catch (err) {
    console.error('Forget password error:', err);
    res.status(500).json({
      success: false,
      message: 'Server error. Please try again later.'
    });
  }
};

// Reset Password
exports.resetPassword = async (req, res) => {
  try {
    const { code, newPassword, confirmPassword } = req.body;

    // Validate input
    if (!code || !newPassword || !confirmPassword) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required'
      });
    }

    // Check if passwords match
    if (newPassword !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: 'Passwords do not match'
      });
    }

    // Validate password strength
    if (newPassword.length < 6) {
      return res.status(400).json({
        success: false,
        message: 'Password must be at least 6 characters long'
      });
    }

    // Validate code format (6 digits) and convert to integer
    if (!/^\d{6}$/.test(code)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid code format. Code must be 6 digits.'
      });
    }

    const resetCodeInt = parseInt(code, 10);

    // Find customer by reset code
    const customers = await Customer.findByResetCode(resetCodeInt);
    if (customers.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Invalid or expired reset code'
      });
    }

    const customer = customers[0];

    // Hash new password
    const newPasswordHash = await hashPassword(newPassword);

    // Update password and clear reset code
    await Customer.updatePassword(customer.customer_id, newPasswordHash);
    await Customer.clearPasswordResetCode(customer.customer_id);

    res.json({
      success: true,
      message: 'Password has been reset successfully. You can now login with your new password.'
    });

  } catch (err) {
    console.error('Reset password error:', err);
    res.status(500).json({
      success: false,
      message: 'Server error. Please try again later.'
    });
  }
};

// Verify Reset Code
exports.verifyResetCode = async (req, res) => {
  try {
    const { code } = req.body;

    if (!code) {
      return res.status(400).json({
        success: false,
        message: 'Reset code is required'
      });
    }

    // Validate code format (6 digits) and convert to integer
    if (!/^\d{6}$/.test(code)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid code format. Code must be 6 digits.'
      });
    }

    const resetCodeInt = parseInt(code, 10);

    // Find customer by reset code
    const customers = await Customer.findByResetCode(resetCodeInt);
    if (customers.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Invalid or expired reset code'
      });
    }

    res.json({
      success: true,
      message: 'Reset code is valid'
    });

  } catch (err) {
    console.error('Verify reset code error:', err);
    res.status(500).json({
      success: false,
      message: 'Server error. Please try again later.'
    });
  }
};
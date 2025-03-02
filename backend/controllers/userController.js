import User from '../models/User.js';
import jwt from 'jsonwebtoken';
import { generateToken } from '../utils/auth.js';

// Register User
export const registerUser = async (req, res) => {
  const { username, email, password, role } = req.body;

  try {
    // Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Create new user with role
    const user = await User.create({ username, email, password, role });
    const token = generateToken(user._id);

    // Send response with user details and token
    res.status(201).json({
      _id: user._id,
      username: user.username,
      email: user.email,
      role: user.role,
      token,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error registering user', error: error.message });
  }
};

// Login User
export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Generate a new JWT token
    const token = jwt.sign(
      { userId: user._id, username: user.username, role: user.role }, // Include user role in the token payload
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    // Set the token in a cookie
    res.cookie('token', token, {
      httpOnly: true, // Prevent client-side JavaScript from accessing the cookie
      secure: process.env.NODE_ENV === 'production', // Ensure cookies are only sent over HTTPS in production
      maxAge: 24 * 60 * 60 * 1000, // Cookie expires in 1 day (in milliseconds)
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax', // Allow cross-origin cookies in production
    });

    // Send a success response with user details and token
    res.status(200).json({
      message: 'Login successful',
      user: {
        _id: user._id,
        username: user.username,
        email: user.email,
        role: user.role, // Include role in the response
      },
      token, // Optionally include the token in the response body
    });
  } catch (error) {
    res.status(500).json({ message: 'Error logging in', error: error.message });
  }
};


// Get User Profile
export const getUserProfile = async (req, res) => {
  try {
    // Fetch user profile excluding password
    const user = await User.findById(req.user._id).select('-password');
    res.status(200).json({
      _id: user._id,
      username: user.username,
      email: user.email,
      role: user.role, // Include role
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching profile', error: error.message });
  }
};


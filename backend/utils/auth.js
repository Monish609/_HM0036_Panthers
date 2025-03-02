import jwt from 'jsonwebtoken';
import User from '../models/User.js'; // Import the User model

// Generate a JWT token
const generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '1d' });
};

// Verify a JWT token
const verifyToken = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET);
};

// Middleware to protect routes using cookies
const protect = async (req, res, next) => {
  let token;

  // Check if the token exists in cookies
  if (req.cookies.token) {
    token = req.cookies.token;
  }

  // If no token is found in cookies
  if (!token) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  try {
    // Verify the token
    const decoded = verifyToken(token);

    // Find the user by ID and attach it to the request object
    const user = await User.findById(decoded.userId).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    req.user = user; // Attach the user to the request object
    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    console.error('Token Verification Error:', error);
    res.status(401).json({ message: 'Invalid token.' });
  }
};

// Middleware to check if the user is an admin
const isAdmin = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    res.status(403).json({ message: 'Not authorized as an admin' });
  }
};

export { generateToken, verifyToken, protect, isAdmin };
import jwt from 'jsonwebtoken';

const authenticateUser = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  console.log('Received Token:', token); // Log the token

  if (!token) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify the token
    console.log('Decoded Token:', decoded); // Log the decoded token
    req.user = decoded; // Attach the decoded user to the request object
    next();
  } catch (error) {
    console.error('Token Verification Error:', error); // Log the error
    res.status(401).json({ message: 'Invalid token.' });
  }
};

export default authenticateUser;
const jwt = require('jsonwebtoken');
const Users = require('../Models/Users');

const authMiddleware = (req, res, next) => {
  // Get the token from the authorization header
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    // If there is no token, return an error response
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    // Verify the token using the secret key
    const decoded = jwt.verify(token, process.env.Secret_Key);
    req.user = decoded;
    // res.send(decoded)
    
    // Check if user has the necessary privileges
    if (req.user.roles !== 'Admin' && req.user.roles !== 'SuperAdmin') {
      return res.status(403).json({ message: 'Forbidden' });
    }
    
    next();
  } catch (err) {
    // If the token is invalid or has expired, return an error response
    return res.status(401).json({ message: 'Unauthorized' });
  }
};

module.exports = authMiddleware;
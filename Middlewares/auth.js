const jwt = require('jsonwebtoken');
const Users = require('../Models/Users')

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

const logoutM = async (req, res, next) => {
    try {
      // Get the token from the authorization header and verify it
      const authHeader = req.headers.authorization;
      const token = authHeader && authHeader.split(' ')[1];
      if (!token) {
        return res.status(401).json({ message: 'Authorization denied' });
      }
      const decoded = jwt.verify(token, process.env.Secret_Key);
      req.user = decoded
  
      // Find the user associated with the token
      const user = await Users.findOne(req.user.name);
      if (!user) {
        return res.status(401).json({ message: 'Authorization denied' });
      }
  
      // Set the user object on the request and continue to the next middleware
      req.user = user;
      next();
    } catch (err) {
      console.error(err.message);
      return res.status(500).json({ message: 'Server Error' });
    }
  };

module.exports = logoutM;
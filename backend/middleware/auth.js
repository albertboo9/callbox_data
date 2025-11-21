const jwt = require('jsonwebtoken');

// Middleware to verify JWT token
const verifyToken = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) {
    return res.status(401).json({ error: 'Access denied. No token provided.' });
  }

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
    req.user = verified;
    next();
  } catch (error) {
    res.status(400).json({ error: 'Invalid token.' });
  }
};

// Middleware to check if user has required role
const requireRole = (roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ error: 'Authentication required.' });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ error: 'Access denied. Insufficient permissions.' });
    }

    next();
  };
};

// Specific role middlewares
const requireAdmin = requireRole(['admin']);
const requireMerchant = requireRole(['merchant']);
const requireCompany = requireRole(['company']);
const requireAdminOrCompany = requireRole(['admin', 'company']);
const requireMerchantOrAdmin = requireRole(['merchant', 'admin']);

module.exports = {
  verifyToken,
  requireRole,
  requireAdmin,
  requireMerchant,
  requireCompany,
  requireAdminOrCompany,
  requireMerchantOrAdmin
};
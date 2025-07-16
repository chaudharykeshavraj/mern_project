const jwt = require('jsonwebtoken');

// Authentication
const auth = (req, res, next) => {
    const token = req.header('Authorization')?.split(' ')[1];
    if (!token) return res.status(401).json({ error: 'Access denied' });

    try {
        const decoded = jwt.verify(token, 'your_jwt_secret');
        req.user = decoded;
        next();
    } catch {
        res.status(400).json({ error: 'Invalid token' });
    }
};

// Role-based access
const roleCheck = (roles) => (req, res, next) => {
    if (!roles.includes(req.user.role)) {
        return res.status(403).json({ error: 'Forbidden' });
    }
    next();
};

module.exports = { auth, roleCheck };

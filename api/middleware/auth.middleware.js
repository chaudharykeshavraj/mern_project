const jwt = require('jsonwebtoken');

exports.auth = (req, res, next) => {
    const authHeader = req.headers.authorization;
    console.log('Authorization Header:', authHeader);

    if (!authHeader)
        return res.status(401).json({ error: 'Token missing' });

    const token = authHeader.split(' ')[1];
    console.log('Token extracted:', token);

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log('Token decoded:', decoded);
        req.user = decoded;
        next();
    } catch (err) {
        console.log('JWT verification error:', err.message);
        return res.status(400).json({ error: 'Invalid token' });
    }
};


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

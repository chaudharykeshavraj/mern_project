const jwt = require('jsonwebtoken');

// ✅ Token Verification Middleware
const auth = (req, res, next) => {
    const authHeader = req.headers['authorization'];

    if (!authHeader)
        return res.status(401).json({ error: 'Authorization header missing' });

    const tokenParts = authHeader.split(' ');

    if (tokenParts.length !== 2 || tokenParts[0] !== 'Bearer') {
        return res.status(400).json({ error: 'Invalid auth format' });
    }

    const token = tokenParts[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Attach decoded token payload (e.g., { userId, role }) to request
        req.user = decoded;
        next();
    } catch (err) {
        console.error('❌ JWT verification failed:', err.message);
        return res.status(401).json({ error: 'Invalid or expired token' });
    }
};

// ✅ Role-based Access Control Middleware
const roleCheck = (roles) => (req, res, next) => {
    if (!roles.includes(req.user.role)) return res.status(403).json({ error: 'Forbidden' });
    next();
};

module.exports = { auth, roleCheck };

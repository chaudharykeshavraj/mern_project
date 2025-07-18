const jwt = require('jsonwebtoken');

// ✅ Token Verification Middleware
const auth = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    console.log('🔐 Authorization Header:', authHeader); // For debugging
    console.log('🔐 JWT_SECRET used:', process.env.JWT_SECRET); // Should not be undefined

    if(!authHeader)
        return res.status(401).json({ error: 'Authorization header missing' });
    
    const tokenParts = authHeader.split(' ');

    if(tokenParts.length !== 2 || tokenParts[0] !== 'Bearer') {
        return res.status(400).json({ error: 'Invalid auth format' });
    }

    const token = tokenParts[1];

    /* if (!authHeader?.startsWith('Bearer '))
        return res.status(400).json({ error: 'Invalid auth format' });

    const token = authHeader.split(' ')[1]; */


    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log('✅ Decoded token:', decoded);
        req.user = decoded;
        next();
    } catch (err) {
        console.error('❌ JWT verification failed:', err.message);
        return res.status(401).json({ error: 'Invalid or expired token' });
    }
};

// ✅ Role-based Access Control
const roleCheck = (roles) => (req, res, next) => {
    if (!roles.includes(req.user.role)) {
        return res.status(403).json({ error: 'Forbidden' });
    }
    next();
};

module.exports = { auth, roleCheck };

const jwt = require('jsonwebtoken');
const { logger } = require('../utils/logger');

class AuthMiddleware {
    static verifyToken(req, res, next) {
        const token = req.headers.authorization?.split(' ')[1];

        if (!token) {
            logger.warn('No token provided');
            return res.status(401).json({
                error: 'Access denied. No token provided.'
            });
        }

        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = decoded;
            next();
        } catch (error) {
            logger.error('Token verification failed:', error);
            res.status(401).json({
                error: 'Invalid token'
            });
        }
    }
}

module.exports = AuthMiddleware;
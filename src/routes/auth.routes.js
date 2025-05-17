const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const { logger } = require('../utils/logger');

// Simple login endpoint (in a real application, this would validate against a database)
router.post('/login', (req, res) => {
    try {
        if (!process.env.JWT_SECRET) {
            logger.error('JWT_SECRET is not defined in environment variables');
            return res.status(500).json({
                error: 'Server configuration error: JWT secret is not set'
            });
        }

        // In a real application, you would validate credentials here
        const token = jwt.sign(
            { userId: 1, role: 'admin' },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        logger.info('User logged in successfully');
        res.json({
            token,
            message: 'Login successful'
        });
    } catch (error) {
        logger.error('Login error:', error);
        res.status(500).json({
            error: 'Internal server error during authentication'
        });
    }
});

module.exports = router;
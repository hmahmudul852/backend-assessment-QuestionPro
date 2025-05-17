const express = require('express');
const router = express.Router();
const EmployeeController = require('../controllers/employee.controller');
const AuthMiddleware = require('../middleware/auth.middleware');

// Public route
router.get('/:id', EmployeeController.getSubordinates);

// Protected route
router.get('/protected/:id', AuthMiddleware.verifyToken, EmployeeController.getProtectedSubordinates);

module.exports = router;
const EmployeeModel = require('../models/employee.model');
const { logger } = require('../utils/logger');

class EmployeeController {
    static async getSubordinates(req, res) {
        try {
            const { id } = req.params;
            const employeeId = parseInt(id);

            if (isNaN(employeeId)) {
                return res.status(400).json({
                    error: 'Invalid employee ID'
                });
            }

            const employee = EmployeeModel.getEmployeeById(employeeId);
            if (!employee) {
                return res.status(404).json({
                    error: 'Employee not found'
                });
            }

            const subordinates = EmployeeModel.getSubordinates(employeeId);
            logger.info(`Retrieved subordinates for employee ${employeeId}`);

            res.json({
                manager: employee,
                subordinates
            });
        } catch (error) {
            logger.error('Error in getSubordinates:', error);
            res.status(500).json({
                error: 'Internal server error'
            });
        }
    }

    static async getProtectedSubordinates(req, res) {
        try {
            const { id } = req.params;
            const employeeId = parseInt(id);

            if (isNaN(employeeId)) {
                return res.status(400).json({
                    error: 'Invalid employee ID'
                });
            }

            const employee = EmployeeModel.getEmployeeById(employeeId);
            if (!employee) {
                return res.status(404).json({
                    error: 'Employee not found'
                });
            }

            const subordinates = EmployeeModel.getSubordinates(employeeId);
            logger.info(`Retrieved protected subordinates for employee ${employeeId}`);

            res.json({
                manager: employee,
                subordinates,
                authenticated: true
            });
        } catch (error) {
            logger.error('Error in getProtectedSubordinates:', error);
            res.status(500).json({
                error: 'Internal server error'
            });
        }
    }
}

module.exports = EmployeeController;
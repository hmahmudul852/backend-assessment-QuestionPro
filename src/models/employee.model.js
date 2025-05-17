class Employee {
    constructor(id, name, position, managerId = null) {
        this.id = id;
        this.name = name;
        this.position = position;
        this.managerId = managerId;
    }
}

// Sample data
const employees = [
    new Employee(1, 'John Doe', 'CTO'),
    new Employee(2, 'Jane Smith', 'Senior Software Engineer', 1),
    new Employee(3, 'Bob Johnson', 'Software Engineer', 2),
    new Employee(4, 'Alice Brown', 'Software Engineer', 2),
    new Employee(5, 'Charlie Wilson', 'Senior Software Engineer', 1),
    new Employee(6, 'Diana Miller', 'Software Engineer', 5)
];

class EmployeeModel {
    static getAllEmployees() {
        return employees;
    }

    static getEmployeeById(id) {
        return employees.find(emp => emp.id === id);
    }

    static getEmployeesByManagerId(managerId) {
        return employees.filter(emp => emp.managerId === managerId);
    }

    static getSubordinates(id) {
        const employee = this.getEmployeeById(id);
        if (!employee) return null;

        const directReports = this.getEmployeesByManagerId(id);
        const allSubordinates = [...directReports];

        // Recursively get subordinates of subordinates
        for (const report of directReports) {
            const subordinates = this.getSubordinates(report.id);
            if (subordinates) {
                allSubordinates.push(...subordinates);
            }
        }

        return allSubordinates;
    }
}

module.exports = EmployeeModel;
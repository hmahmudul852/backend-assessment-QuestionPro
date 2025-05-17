const request = require('supertest');
const app = require('../src/app');
const EmployeeModel = require('../src/models/employee.model');

describe('Employee API Tests', () => {
    let authToken;

    beforeAll(async () => {
        // Get authentication token
        const response = await request(app)
            .post('/api/auth/login')
            .send({});
        authToken = response.body.token;
    });

    describe('GET /api/employees/:id', () => {
        it('should return employee and subordinates for CTO', async () => {
            const response = await request(app)
                .get('/api/employees/1')
                .expect(200);

            expect(response.body.manager).toBeDefined();
            expect(response.body.manager.id).toBe(1);
            expect(response.body.manager.position).toBe('CTO');
            expect(response.body.subordinates).toBeDefined();
            expect(response.body.subordinates.length).toBeGreaterThan(0);
        });

        it('should return employee and subordinates for Senior Software Engineer', async () => {
            const response = await request(app)
                .get('/api/employees/2')
                .expect(200);

            expect(response.body.manager).toBeDefined();
            expect(response.body.manager.id).toBe(2);
            expect(response.body.manager.position).toBe('Senior Software Engineer');
            expect(response.body.subordinates).toBeDefined();
        });

        it('should return 404 for non-existent employee', async () => {
            const response = await request(app)
                .get('/api/employees/999')
                .expect(404);

            expect(response.body.error).toBeDefined();
        });
    });

    describe('GET /api/employees/protected/:id', () => {
        it('should return 401 without token', async () => {
            await request(app)
                .get('/api/employees/protected/1')
                .expect(401);
        });

        it('should return employee and subordinates with valid token', async () => {
            const response = await request(app)
                .get('/api/employees/protected/1')
                .set('Authorization', `Bearer ${authToken}`)
                .expect(200);

            expect(response.body.manager).toBeDefined();
            expect(response.body.subordinates).toBeDefined();
            expect(response.body.authenticated).toBe(true);
        });
    });
});
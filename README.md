# Employee Organogram API

A robust Node.js/Express API for managing employee hierarchies with JWT authentication and Bootstrap UI.

## Features

- RESTful API for employee hierarchy management
- JWT-based authentication
- Bootstrap UI for easy interaction
- Comprehensive test coverage
- Structured logging
- Rate limiting and security features
- Scalable architecture

## Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

## Installation

1. Clone the repository
2. Install dependencies:
```bash
npm install
```
3. Create a `.env` file in the root directory with the following variables:
```
PORT=3000
JWT_SECRET=your_super_secret_key_here
NODE_ENV=development
```

## Running the Application

Development mode:
```bash
npm run dev
```

Production mode:
```bash
npm start
```

## Running Tests

```bash
npm test
```

## API Endpoints

### Public Endpoints
- `GET /api/employees/:id` - Get all employees under a given position
- `POST /api/auth/login` - Login to get JWT token

### Protected Endpoints (Requires JWT)
- `GET /api/employees/protected/:id` - Get employee hierarchy with authentication

## Scaling Considerations

1. **Horizontal Scaling**
   - The application is designed to be stateless
   - Can be deployed across multiple instances behind a load balancer
   - Uses Redis for session management (optional)

2. **Database Scaling**
   - Ready for database sharding
   - Implements connection pooling
   - Uses efficient indexing for queries

3. **Performance Optimization**
   - Implements caching strategies
   - Uses compression middleware
   - Implements rate limiting

4. **Monitoring and Logging**
   - Structured JSON logging with Winston
   - Ready for integration with monitoring tools (e.g., Prometheus, Grafana)
   - Error tracking and alerting system ready

## Future Improvements

1. Implement Redis caching for better performance
2. Add more comprehensive error handling
3. Implement database migrations
4. Add more unit and integration tests
5. Implement CI/CD pipeline
6. Add API documentation with Swagger
7. Implement real-time updates using WebSocket

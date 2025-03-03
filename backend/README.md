# Authentication Backend API

A secure and robust authentication API built with NestJS and MongoDB.

## Features

- User registration and authentication
- JWT-based authentication
- Password hashing with bcrypt
- MongoDB integration with Mongoose
- API documentation with Swagger
- Logging with Winston
- Input validation with class-validator
- Security with Helmet

## Prerequisites

- Node.js (v14 or later)
- MongoDB (local or remote instance)

## Installation

```bash
# Install dependencies
npm install
```

## Configuration

Create a `.env` file in the root directory with the following variables:

```
# Application
PORT=3001

# MongoDB
MONGODB_URI=mongodb://localhost:27017/auth-app

# JWT
JWT_SECRET=your-super-secret-jwt-key-change-in-production
JWT_EXPIRES_IN=1d
```

Replace the values with your actual configuration.

## Running the API

```bash
# Development mode
npm run start:dev

# Production mode
npm run build
npm run start:prod
```

## API Documentation

Once the application is running, you can access the Swagger API documentation at:

```
http://localhost:3001/api/docs
```

## API Endpoints

### Authentication

- `POST /auth/signup` - Register a new user
- `POST /auth/signin` - Authenticate a user and get JWT token

### Users

- `GET /users/profile` - Get current user profile (protected endpoint)

## Testing

```bash
# Unit tests
npm run test

# E2E tests
npm run test:e2e

# Test coverage
npm run test:cov
```

## Security

This project implements several security best practices:
- Password hashing with bcrypt
- JWT-based authentication
- Request validation
- HTTP security headers with Helmet
- MongoDB security best practices

## Logging

Application logs are stored in the `logs` directory:
- `
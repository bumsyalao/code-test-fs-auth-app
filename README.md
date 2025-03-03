# Full-Stack Authentication Application

This repository contains a production-ready authentication system with React frontend and NestJS backend. The application allows users to sign up, sign in, and access protected routes.

## Project Structure

The project is divided into two main directories:

- `/frontend` - React TypeScript application
- `/backend` - NestJS application with MongoDB integration

## Features

- User authentication (signup/signin)
- JWT-based session management
- Protected routes
- Form validation
- Secure password storage with bcrypt
- MongoDB database with Mongoose ORM

## Getting Started

### Prerequisites

- Node.js (v20 or higher)
- MongoDB (local instance or MongoDB Atlas)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone git@github.com:bumsyalao/code-test-fs-auth-app.git
cd code-test-fs-auth-app
```

2. Install dependencies and start the application:

```bash
# Install and start the backend
cd backend
npm install
npm run start:dev

# In a separate terminal, install and start the frontend
cd frontend
npm install
npm start
```

3. Open your browser and navigate to `http://localhost:3000`

## Development

To run both applications in development mode with hot reloading:

```bash
# In the backend directory
npm run start:dev

# In the frontend directory
npm start
```

## Testing

Both applications include test suites that can be run with:

```bash
# In either the frontend or backend directory
npm test
```

## Project Documentation

See the separate README files in the frontend and backend directories for detailed instructions.

- [Frontend Documentation](./frontend/README.md)
- [Backend Documentation](./backend/README.md)
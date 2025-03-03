# Frontend

This is the frontend part of the authentication system built with React and TypeScript.

## Technology Stack

- React 18+
- TypeScript
- React Router for navigation
- Axios for API requests
- localStorage for token storage
- Form validation
- Tailwind CSS modules for styling

## Features

- Sign up page with validation:
  - Email (format validation)
  - Name (minimum 3 characters)
  - Password (8+ characters, at least one letter, one number, one special character)
- Sign in page
- Protected application page
- Session management
- Error handling
- Responsive design

## Project Structure

```
frontend/
├── public/
├── src/
│   ├── components/      # Reusable UI components
│   │   ├── SignUp.tsx
│   │   ├── SignIn.tsx
│   │   └── Application.tsx
│   │   └── Navigation.tsx
│   │   └── ProtectedRoute.tsx
│   ├── contexts/        # React context for authentication state
│   ├── services/        # API and authentication services
│   ├── types/           # TypeScript interfaces and types
│   ├── styles/          # Tailwind css functions
│   ├── App.tsx          # Main app component
│   └── index.tsx        # Entry point
├── .env                 # Environment variables
├── package.json
└── tsconfig.json
```

## Getting Started

### Prerequisites

- Node.js (v16+)
- npm or yarn

### Installation

```bash
cd frontend
npm install
```

### Running the Application

```bash
npm start
```

The application will be available at `http://localhost:3000`.

### Environment Configuration

Create a `.env` file in the frontend directory with the following:

```
REACT_APP_API_URL=http://localhost:3001/api
```

## Authentication Flow

1. User signs up or signs in through the form
2. On successful authentication, the backend returns a JWT token
3. The token is stored in localStorage
4. Protected routes check for the presence of a valid token
5. The token is included in the Authorization header for API requests
6. On logout, the token is removed from localStorage



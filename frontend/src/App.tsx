import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import Application from './components/Application';
import Navigation from './components/Navigation';
import ProtectedRoute from './components/ProtectedRoute';
import './styles/styles.css';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <div className="flex flex-col min-h-screen">
          <Navigation />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Navigate to="/app" replace />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/signin" element={<SignIn />} />
              
              <Route element={<ProtectedRoute />}>
                <Route path="/app" element={<Application />} />
              </Route>
              
              <Route path="*" element={<Navigate to="/app" replace />} />
            </Routes>
          </main>
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;

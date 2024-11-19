import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import SignUpPage from './pages/SignUpPage';
import SignInPage from './pages/SignInPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import DashboardPage from './pages/DashboardPage';
import MainDashboard from './pages/MainDashboard';
import TimelinePage from './pages/setup/TimelinePage';
import TeamPage from './pages/setup/TeamPage';
import ContactsPage from './pages/setup/ContactsPage';
import CommunicationPage from './pages/setup/CommunicationPage';
import { useAuth } from './contexts/AuthContext';

function App() {
  const { user } = useAuth();

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/signin" element={<SignInPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        
        {/* Protected Routes */}
        <Route 
          path="/setup/*" 
          element={user ? <DashboardPage /> : <Navigate to="/signin" />} 
        />
        <Route 
          path="/dashboard" 
          element={user ? <MainDashboard /> : <Navigate to="/signin" />} 
        />
        <Route 
          path="/setup/timeline" 
          element={user ? <TimelinePage /> : <Navigate to="/signin" />} 
        />
        <Route 
          path="/setup/team" 
          element={user ? <TeamPage /> : <Navigate to="/signin" />} 
        />
        <Route 
          path="/setup/contacts" 
          element={user ? <ContactsPage /> : <Navigate to="/signin" />} 
        />
        <Route 
          path="/setup/communication" 
          element={user ? <CommunicationPage /> : <Navigate to="/signin" />} 
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
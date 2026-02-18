import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Layout from './components/Layout';
import {
  Login,
  Dashboard,
  LandingPage,
  Users,
  Books,
  Categories,
  SupportPage as Support,
  RequestsPage as Requests,
  FeedbackPage as Feedback,
  Terms,
  Privacy,
  GuestBookDetails,
  Admins,
  Settings,
  PrivacyIOS,
  PrivacyAndroid
} from './pages';

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) return <div>Loading...</div>;

  if (!user) {
    return <Navigate to="/login" />;
  }

  return <>{children}</>;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/privacy/ios" element={<PrivacyIOS />} />
          <Route path="/privacy/android" element={<PrivacyAndroid />} />
          <Route path="/book/:id" element={<GuestBookDetails />} />

          <Route path="/admin" element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }>
            <Route index element={<Dashboard />} />
            <Route path="books" element={<Books />} />
            <Route path="users" element={<Users />} />
            <Route path="categories" element={<Categories />} />
            <Route path="requests" element={<Requests />} />
            <Route path="support" element={<Support />} />
            <Route path="feedback" element={<Feedback />} />
            <Route path="admins" element={<Admins />} />
            <Route path="settings" element={<Settings />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;

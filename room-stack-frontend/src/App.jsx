import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AuthPage from './pages/Auth';
import BookingsPage from './pages/Bookings';
import EventsPage from './pages/Events';
import MainNavigation from './components/Navigation/MainNavigation';
import AuthContext from './context/auth-context';
import { Navigate } from 'react-router-dom';

import './App.css';

const App = () => {
  const [token, setToken] = useState(null);
  const [userId, setUserId] = useState(null);

  const login = (token, userId) => {
    setToken(token);
    setUserId(userId);
  };

  const logout = () => {
    setToken(null);
    setUserId(null);
  };

  return (
    <Router>
      <React.Fragment>
        <AuthContext.Provider
          value={{
            token: token,
            userId: userId,
            login: login,
            logout: logout
          }}
        >
          <MainNavigation />
          <main className="main-content">
            <Routes>
              {token ? (
                <Route path="/" element={<Navigate to="/events" />} />
              ) : (
                <Route path="/auth" element={<AuthPage />} />
              )}
              <Route path="/events" element={<EventsPage />} />
              {token && <Route path="/bookings" element={<BookingsPage />} />}
            </Routes>
          </main>
        </AuthContext.Provider>
      </React.Fragment>
    </Router>
  );
};

export default App;

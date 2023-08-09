import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AuthPage from './pages/Auth';
import BookingsPage from './pages/Bookings';
import EventsPage from './pages/Events';
import { Navigate } from 'react-router-dom';

import './App.css';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/auth" />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/events" element={<EventsPage />} />
        <Route path="/bookings" element={<BookingsPage />} />
      </Routes>
    </Router>
  );
};

export default App;

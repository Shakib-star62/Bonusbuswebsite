// src/App.jsx - With correct case-sensitive imports
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Layout from './components/Layout';

// Pages - NOTE: All imports must match actual file names (case-sensitive)
import LoginPage from './pages/LoginPage';  // Capital L
import SignupPage from './pages/SignupPage';  // Capital S
import HomePage from './pages/HomePage';
import PassPage from './pages/PassPage';
import GroupingPage from './pages/GroupingPage';
import TemplesRoutePage from './pages/TemplesRoutePage';
import BookingPage from './pages/BookingPage';
import WalletPage from './pages/WalletPage';
import AccountPage from './pages/AccountPage';
import NormalPage from './pages/NormalPage';

// New Pages
import LiveTrackingPage from './pages/LiveTrackingPage';
import CancelBookingPage from './pages/CancelBookingPage';
import ReviewsPage from './pages/ReviewsPage';
import OffersPage from './pages/OffersPage';
import SupportPage from './pages/SupportPage';
import PriceCalendarPage from './pages/PriceCalendarPage';
import BusDetailsPage from './pages/BusDetailsPage';
import PaymentPage from './pages/PaymentPage';
import TicketPage from './pages/TicketPage';
import ReferralPage from './pages/ReferralPage';
import LoyaltyPage from './pages/LoyaltyPage';
import TravelInsurancePage from './pages/TravelInsurancePage';
// import GroupBookingPage from './pages/GroupBookingPage';
import SavedPassengersPage from './pages/SavedPassengersPage';
import NotificationsPage from './pages/NotificationsPage';

// Styles
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './App.css';

// Public Route Component - allows access to home without authentication
const PublicRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  // Don't redirect from home page even if authenticated
  return children;
};

function App() {
  return (
    <AuthProvider>
      <Router
        future={{
          v7_startTransition: true,
          v7_relativeSplatPath: true
        }}
      >
        <Routes>
          {/* Home Page - Public Route (No Login Required) */}
          <Route path="/" element={<HomePage />} />
          
          {/* Auth Pages */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          
          {/* Protected Routes with Layout */}
          <Route element={<ProtectedRoute />}>
            <Route element={<Layout />}>
              <Route path="/pass" element={<PassPage />} />
              <Route path="/group" element={<GroupingPage />} />
              <Route path="/temples" element={<TemplesRoutePage />} />
              <Route path="/bookings" element={<BookingPage />} />
              <Route path="/wallet" element={<WalletPage />} />
              <Route path="/account" element={<AccountPage />} />
              <Route path="/normal" element={<NormalPage />} />
              
              {/* New Routes */}
              <Route path="/live-tracking/:id" element={<LiveTrackingPage />} />
              <Route path="/cancel-booking/:id" element={<CancelBookingPage />} />
              <Route path="/reviews/:busId" element={<ReviewsPage />} />
              <Route path="/offers" element={<OffersPage />} />
              <Route path="/support" element={<SupportPage />} />
              <Route path="/price-calendar" element={<PriceCalendarPage />} />
              <Route path="/bus-details/:id" element={<BusDetailsPage />} />
              <Route path="/payment" element={<PaymentPage />} />
              <Route path="/ticket/:id" element={<TicketPage />} />
              <Route path="/referral" element={<ReferralPage />} />
              <Route path="/loyalty" element={<LoyaltyPage />} />
              <Route path="/travel-insurance" element={<TravelInsurancePage />} />
              {/* <Route path="/group-booking" element={<GroupBookingPage />} /> */}
              <Route path="/saved-passengers" element={<SavedPassengersPage />} />
              <Route path="/notifications" element={<NotificationsPage />} />
            </Route>
          </Route>
          
          {/* Redirect any unknown routes to home page */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
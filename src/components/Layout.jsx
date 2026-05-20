// src/components/Layout.jsx
import React, { useState } from 'react';
import { Outlet, useNavigate, useLocation, Link } from 'react-router-dom';
import { Container, Button, Badge, Dropdown, Navbar, Modal } from 'react-bootstrap';
import { useAuth } from '../context/AuthContext';

const Layout = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Main tabs for top navigation
  const topMenuItems = [
    { path: '/', icon: 'bi-house-door', label: 'Home' },
    { path: '/pass', icon: 'bi-ticket-perforated', label: 'Monthly Pass' },
    { path: '/temples', icon: 'bi-building', label: 'Temple Tours' },
    { path: '/group', icon: 'bi-people', label: 'Group Booking' },
  ];

  // Bottom navigation items
  const bottomMenuItems = [
    { path: '/', icon: 'bi-house-door', label: 'Home' },
    { path: '/bookings', icon: 'bi-calendar-check', label: 'Bookings' },
    { path: '/wallet', icon: 'bi-wallet2', label: 'Wallet' },
    { path: '/account', icon: 'bi-person', label: 'Account' },
  ];

  const handleProtectedNavigation = (path) => {
    if (!isAuthenticated && path !== '/' && path !== '/pass' && path !== '/temples' && path !== '/group') {
      setShowLoginPrompt(true);
    } else {
      navigate(path);
    }
  };

  const handleLogout = () => {
    logout();
    setShowLogoutModal(false);
    navigate('/splash');
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Implement search functionality
      console.log('Searching for:', searchQuery);
      // You can navigate to search results page here
      // navigate(`/search?q=${searchQuery}`);
    }
  };

  return (
    <div className="d-flex flex-column min-vh-100 bg-light">
      {/* Top Navigation Bar */}
      <Navbar bg="white" expand="lg" className="border-bottom py-2 sticky-top shadow-sm">
        <Container fluid>
          {/* Logo/Brand - Click to go home */}
          <Navbar.Brand onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
            <div className="d-flex align-items-center gap-2">
              <div className="bg-success bg-opacity-10 rounded-3 p-2">
                <i className="bi bi-ev-station text-success fs-3"></i>
              </div>
              <div>
                <h5 className="mb-0 fw-bold" style={{ 
                  background: 'linear-gradient(135deg, #0d6efd, #198754)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text'
                }}>
                  BONUS BUS
                </h5>
                <small className="text-success">Go Green · Travel Smart</small>
              </div>
            </div>
          </Navbar.Brand>

          {/* Search Bar - Hidden on mobile */}
          <div className="d-none d-md-flex align-items-center" style={{ maxWidth: '400px', width: '100%' }}>
            <form onSubmit={handleSearch} className="w-100">
              <div className="input-group">
                <span className="input-group-text bg-light border-0">
                  <i className="bi bi-search text-secondary"></i>
                </span>
                <input
                  type="text"
                  placeholder="Search routes, buses, or temples..."
                  className="form-control bg-light border-0"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                {searchQuery && (
                  <button 
                    type="button" 
                    className="btn btn-light border-0" 
                    onClick={() => setSearchQuery('')}
                  >
                    <i className="bi bi-x"></i>
                  </button>
                )}
              </div>
            </form>
          </div>

          {/* Top Menu Items */}
          <div className="d-none d-md-flex align-items-center gap-2">
            {topMenuItems.map(item => (
              <Button
                key={item.path}
                variant={location.pathname === item.path ? "primary" : "light"}
                onClick={() => navigate(item.path)}
                className="d-flex align-items-center gap-2 px-3"
                size="sm"
              >
                <i className={`bi ${item.icon}`}></i>
                <span>{item.label}</span>
              </Button>
            ))}
          </div>

          {/* Right Side Icons */}
          <div className="d-flex align-items-center gap-3">
            {/* Help/Support */}
            <Button 
              variant="link" 
              className="text-secondary p-2 d-none d-md-block"
              onClick={() => window.open('tel:1800123456')}
            >
              <i className="bi bi-headset fs-5"></i>
            </Button>

            {/* Notification Bell - Only when logged in */}
            {isAuthenticated && (
              <Button 
                variant="link" 
                className="position-relative text-secondary p-2 d-none d-md-block"
                onClick={() => navigate('/notifications')}
              >
                <i className="bi bi-bell fs-5"></i>
                <Badge 
                  bg="danger" 
                  className="position-absolute top-0 end-0 rounded-pill"
                  style={{ fontSize: '0.6rem' }}
                >
                  3
                </Badge>
              </Button>
            )}
            
            {/* Wallet Balance or Login Button */}
            {isAuthenticated ? (
              <Button 
                variant="success" 
                className="d-flex align-items-center gap-2"
                size="sm"
                onClick={() => navigate('/wallet')}
              >
                <i className="bi bi-wallet2"></i>
                <span className="fw-bold">₹{user?.walletBalance?.toFixed(2) || '2,450.75'}</span>
              </Button>
            ) : (
              <Button 
                variant="outline-primary" 
                className="d-flex align-items-center gap-2 rounded-pill"
                size="sm"
                onClick={() => navigate('/splash')}
              >
                <i className="bi bi-box-arrow-in-right"></i>
                <span className="d-none d-md-inline">Login / Sign Up</span>
                <span className="d-md-none">Login</span>
              </Button>
            )}

            {/* User Dropdown - Only when logged in */}
            {isAuthenticated ? (
              <Dropdown align="end">
                <Dropdown.Toggle variant="light" size="sm" className="border-0 d-flex align-items-center">
                  <div className="rounded-circle bg-primary d-flex align-items-center justify-content-center" 
                       style={{ width: '30px', height: '30px' }}>
                    <i className="bi bi-person text-white"></i>
                  </div>
                  <span className="d-none d-md-inline ms-2">{user?.name?.split(' ')[0] || 'User'}</span>
                </Dropdown.Toggle>
                <Dropdown.Menu className="shadow-lg border-0 mt-2" style={{ minWidth: '240px' }}>
                  <Dropdown.Header className="text-center py-3">
                    <div className="fw-bold">{user?.name || 'Shakib Ahmed'}</div>
                    <small className="text-secondary">{user?.email || 'shakib@example.com'}</small>
                    <Badge bg="success" className="mt-2">
                      <i className="bi bi-star-fill me-1"></i>
                      {user?.greenPoints || '1,250'} pts
                    </Badge>
                  </Dropdown.Header>
                  <Dropdown.Divider />
                  <Dropdown.Item onClick={() => navigate('/account')} className="py-2">
                    <i className="bi bi-person me-2"></i>My Profile
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => navigate('/bookings')} className="py-2">
                    <i className="bi bi-ticket me-2"></i>My Bookings
                    <Badge bg="primary" className="ms-2">{user?.totalTrips || '6'}</Badge>
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => navigate('/wallet')} className="py-2">
                    <i className="bi bi-wallet2 me-2"></i>Wallet
                    <Badge bg="success" className="ms-2">₹{user?.walletBalance || '2,450'}</Badge>
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => navigate('/pass')} className="py-2">
                    <i className="bi bi-ticket-perforated me-2"></i>Monthly Pass
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => navigate('/loyalty')} className="py-2">
                    <i className="bi bi-star me-2"></i>Loyalty Points
                  </Dropdown.Item>
                  <Dropdown.Divider />
                  <Dropdown.Item onClick={() => setShowLogoutModal(true)} className="py-2 text-danger">
                    <i className="bi bi-box-arrow-right me-2"></i>Logout
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            ) : (
              // Mobile Login Button
              <Button 
                variant="outline-primary" 
                size="sm" 
                className="d-md-none rounded-pill px-3"
                onClick={() => navigate('/splash')}
              >
                <i className="bi bi-box-arrow-in-right me-1"></i>
                Login
              </Button>
            )}
          </div>
        </Container>
      </Navbar>

      {/* Mobile Search Bar */}
      <div className="d-md-none bg-white border-bottom py-2 px-3">
        <form onSubmit={handleSearch} className="d-flex align-items-center bg-light rounded-pill px-3 py-1">
          <i className="bi bi-search text-secondary me-2"></i>
          <input
            type="text"
            placeholder="Search routes, buses..."
            className="form-control form-control-sm bg-light border-0 p-2"
            style={{ boxShadow: 'none' }}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <button type="button" className="btn btn-link p-0 text-secondary" onClick={() => setSearchQuery('')}>
              <i className="bi bi-x"></i>
            </button>
          )}
        </form>
      </div>

      {/* Mobile Top Menu */}
      <div className="d-md-none bg-white border-bottom py-2 px-3 overflow-auto" style={{ whiteSpace: 'nowrap' }}>
        <div className="d-flex gap-2">
          {topMenuItems.map(item => (
            <Button
              key={item.path}
              variant={location.pathname === item.path ? "primary" : "outline-secondary"}
              size="sm"
              onClick={() => navigate(item.path)}
              className="d-inline-flex align-items-center gap-1 rounded-pill"
            >
              <i className={`bi ${item.icon}`}></i>
              <span>{item.label}</span>
            </Button>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-grow-1" style={{ paddingBottom: '70px' }}>
        <Outlet />
      </main>

      {/* Bottom Tab Bar - Mobile */}
      <nav className="bottom-tab-bar fixed-bottom bg-white border-top d-md-none">
        <div className="d-flex justify-content-around align-items-center py-1">
          {bottomMenuItems.map(item => (
            <Link
              key={item.path}
              to={isAuthenticated ? item.path : '#'}
              className={`text-decoration-none text-center ${
                location.pathname === item.path ? 'text-primary' : 'text-secondary'
              }`}
              style={{ flex: 1 }}
              onClick={(e) => {
                if (!isAuthenticated && item.path !== '/') {
                  e.preventDefault();
                  setShowLoginPrompt(true);
                }
              }}
            >
              <div className="d-flex flex-column align-items-center">
                <i className={`bi ${item.icon} fs-4`}></i>
                <small className="mt-0" style={{ fontSize: '0.65rem' }}>{item.label}</small>
              </div>
            </Link>
          ))}
        </div>
      </nav>

      {/* Desktop Bottom Bar */}
      <nav className="bg-white border-top d-none d-md-block fixed-bottom shadow-sm">
        <Container>
          <div className="d-flex justify-content-around align-items-center py-2">
            {bottomMenuItems.map(item => (
              <Link
                key={item.path}
                to={isAuthenticated ? item.path : '#'}
                className={`text-decoration-none text-center px-4 py-2 rounded ${
                  location.pathname === item.path ? 'bg-primary text-white' : 'text-secondary hover-bg-light'
                }`}
                onClick={(e) => {
                  if (!isAuthenticated && item.path !== '/') {
                    e.preventDefault();
                    setShowLoginPrompt(true);
                  }
                }}
              >
                <div className="d-flex align-items-center gap-2">
                  <i className={`bi ${item.icon}`}></i>
                  <span className="fw-medium">{item.label}</span>
                </div>
              </Link>
            ))}
          </div>
        </Container>
      </nav>

      {/* Login Prompt Modal */}
      <Modal show={showLoginPrompt} onHide={() => setShowLoginPrompt(false)} centered>
        <Modal.Body className="text-center p-4">
          <div className="bg-primary bg-opacity-10 rounded-circle d-inline-flex p-3 mb-3">
            <i className="bi bi-box-arrow-in-right text-primary fs-1"></i>
          </div>
          <h4 className="fw-bold mb-2">Login Required</h4>
          <p className="text-secondary mb-4">Please login to access your bookings, wallet, and account details.</p>
          <div className="d-flex gap-2 justify-content-center">
            <Button variant="outline-secondary" onClick={() => setShowLoginPrompt(false)}>
              Later
            </Button>
            <Button variant="primary" onClick={() => {
              setShowLoginPrompt(false);
              navigate('/splash');
            }}>
              Login Now
            </Button>
          </div>
        </Modal.Body>
      </Modal>

      {/* Logout Confirmation Modal */}
      <Modal show={showLogoutModal} onHide={() => setShowLogoutModal(false)} centered>
        <Modal.Body className="text-center p-4">
          <div className="bg-danger bg-opacity-10 rounded-circle d-inline-flex p-3 mb-3">
            <i className="bi bi-box-arrow-right text-danger fs-1"></i>
          </div>
          <h4 className="fw-bold mb-2">Logout Confirmation</h4>
          <p className="text-secondary mb-4">Are you sure you want to logout?</p>
          <div className="d-flex gap-2 justify-content-center">
            <Button variant="outline-secondary" onClick={() => setShowLogoutModal(false)}>
              Cancel
            </Button>
            <Button variant="danger" onClick={handleLogout}>
              Logout
            </Button>
          </div>
        </Modal.Body>
      </Modal>

      <style>{`
        .hover-bg-light:hover {
          background-color: #f8f9fa;
        }
        .bottom-tab-bar {
          box-shadow: 0 -4px 12px rgba(0,0,0,0.05);
          z-index: 1030;
        }
        @media (min-width: 768px) {
          body {
            padding-bottom: 70px;
          }
        }
      `}</style>
    </div>
  );
};

export default Layout;
// src/pages/AccountPage.jsx
import React, { useState } from 'react';
import { Container, Row, Col, Card, Button, Badge, ListGroup, Modal, Form, Tab, Nav } from 'react-bootstrap';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const AccountPage = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [showEditModal, setShowEditModal] = useState(false);
  const [activeTab, setActiveTab] = useState('profile');

  if (!user) {
    navigate('/login');
    return null;
  }

  const recentBookings = [
    { id: 'EV101', from: 'Visakhapatnam', to: 'Vijayawada', date: '2024-02-15', status: 'Completed', amount: 850 },
    { id: 'EV103', from: 'Vijayawada', to: 'Tirupati', date: '2024-02-20', status: 'Upcoming', amount: 750 },
    { id: 'EV105', from: 'Guntur', to: 'Kakinada', date: '2024-02-25', status: 'Cancelled', amount: 650 },
  ];

  return (
    <Container className="py-4">
      {/* Profile Header */}
      <Card className="border-0 shadow-sm mb-4 overflow-hidden">
        <Card.Body className="p-4" style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
          <Row className="align-items-center">
            <Col xs="auto">
              <div 
                className="rounded-circle bg-white d-flex align-items-center justify-content-center"
                style={{ width: '80px', height: '80px' }}
              >
                <i className="bi bi-person text-primary" style={{ fontSize: '40px' }}></i>
              </div>
            </Col>
            <Col>
              <h4 className="text-white fw-bold mb-1">{user.name}</h4>
              <p className="text-white-50 mb-2">{user.email} • {user.phone}</p>
              <div className="d-flex gap-2">
                <Badge bg="light" text="dark" className="px-3 py-2">
                  <i className="bi bi-star-fill text-warning me-1"></i>
                  {user.greenPoints} Green Points
                </Badge>
                <Badge bg="light" text="dark" className="px-3 py-2">
                  <i className="bi bi-trophy-fill text-primary me-1"></i>
                  {user.tier}
                </Badge>
              </div>
            </Col>
            <Col xs="auto">
              <Button variant="light" onClick={() => setShowEditModal(true)}>
                <i className="bi bi-pencil-square me-2"></i>
                Edit Profile
              </Button>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      {/* Main Content with Tabs */}
      <Card className="border-0 shadow-sm">
        <Card.Header className="bg-white border-0 pt-4">
          <Nav variant="tabs" activeKey={activeTab} onSelect={(k) => setActiveTab(k)}>
            <Nav.Item>
              <Nav.Link eventKey="profile" className="fw-medium">
                <i className="bi bi-person me-2"></i>
                Profile Details
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="bookings" className="fw-medium">
                <i className="bi bi-ticket me-2"></i>
                Recent Bookings
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="wallet" className="fw-medium">
                <i className="bi bi-wallet2 me-2"></i>
                Wallet & Points
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="settings" className="fw-medium">
                <i className="bi bi-gear me-2"></i>
                Settings
              </Nav.Link>
            </Nav.Item>
          </Nav>
        </Card.Header>
        
        <Card.Body className="p-4">
          {/* Profile Tab */}
          {activeTab === 'profile' && (
            <Row>
              <Col md={6}>
                <h6 className="fw-bold mb-3">Personal Information</h6>
                <ListGroup variant="flush" className="bg-light rounded-3 p-3">
                  <ListGroup.Item className="bg-transparent border-0 px-0">
                    <div className="d-flex justify-content-between">
                      <span className="text-secondary">Full Name</span>
                      <span className="fw-bold">{user.name}</span>
                    </div>
                  </ListGroup.Item>
                  <ListGroup.Item className="bg-transparent border-0 px-0">
                    <div className="d-flex justify-content-between">
                      <span className="text-secondary">Email Address</span>
                      <span className="fw-bold">{user.email}</span>
                    </div>
                  </ListGroup.Item>
                  <ListGroup.Item className="bg-transparent border-0 px-0">
                    <div className="d-flex justify-content-between">
                      <span className="text-secondary">Phone Number</span>
                      <span className="fw-bold">{user.phone}</span>
                    </div>
                  </ListGroup.Item>
                  <ListGroup.Item className="bg-transparent border-0 px-0">
                    <div className="d-flex justify-content-between">
                      <span className="text-secondary">Member Since</span>
                      <span className="fw-bold">{user.memberSince}</span>
                    </div>
                  </ListGroup.Item>
                  <ListGroup.Item className="bg-transparent border-0 px-0">
                    <div className="d-flex justify-content-between">
                      <span className="text-secondary">Total Trips</span>
                      <span className="fw-bold">{user.totalTrips}</span>
                    </div>
                  </ListGroup.Item>
                </ListGroup>
              </Col>
              
              <Col md={6}>
                <h6 className="fw-bold mb-3">Saved Passengers</h6>
                <ListGroup className="mb-3">
                  {['Rahul Sharma', 'Priya Patel', 'Amit Kumar'].map((passenger, idx) => (
                    <ListGroup.Item key={idx} className="d-flex justify-content-between align-items-center">
                      <div>
                        <i className="bi bi-person-circle me-2 text-primary"></i>
                        {passenger}
                      </div>
                      <Badge bg="light" text="dark">+91 98765 4321{idx}</Badge>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
                <Button variant="outline-primary" size="sm" className="w-100">
                  <i className="bi bi-plus-circle me-2"></i>
                  Add New Passenger
                </Button>
              </Col>
            </Row>
          )}

          {/* Bookings Tab */}
          {activeTab === 'bookings' && (
            <div>
              <h6 className="fw-bold mb-3">Recent Bookings</h6>
              {recentBookings.map((booking, idx) => (
                <Card key={idx} className="border-0 bg-light mb-3">
                  <Card.Body>
                    <div className="d-flex justify-content-between align-items-start">
                      <div>
                        <h6 className="fw-bold mb-1">{booking.from} → {booking.to}</h6>
                        <small className="text-secondary d-block mb-2">
                          <i className="bi bi-calendar me-1"></i>
                          {booking.date} • Booking ID: {booking.id}
                        </small>
                        <Badge bg={
                          booking.status === 'Completed' ? 'success' : 
                          booking.status === 'Upcoming' ? 'primary' : 'danger'
                        }>
                          {booking.status}
                        </Badge>
                      </div>
                      <div className="text-end">
                        <h6 className="text-success fw-bold mb-1">₹{booking.amount}</h6>
                        <Button variant="link" size="sm" className="p-0">
                          View Details
                        </Button>
                      </div>
                    </div>
                  </Card.Body>
                </Card>
              ))}
              <Button variant="primary" className="w-100 mt-2" onClick={() => navigate('/bookings')}>
                View All Bookings
              </Button>
            </div>
          )}

          {/* Wallet Tab */}
          {activeTab === 'wallet' && (
            <Row>
              <Col md={6}>
                <Card className="border-0 bg-success bg-opacity-10 mb-3">
                  <Card.Body className="text-center">
                    <i className="bi bi-wallet2 text-success fs-1 mb-2"></i>
                    <h6 className="text-secondary">Wallet Balance</h6>
                    <h2 className="text-success fw-bold mb-0">₹{user.walletBalance}</h2>
                  </Card.Body>
                </Card>
                <Button variant="success" className="w-100 mb-3" onClick={() => navigate('/wallet')}>
                  <i className="bi bi-plus-circle me-2"></i>
                  Add Money
                </Button>
              </Col>
              <Col md={6}>
                <Card className="border-0 bg-warning bg-opacity-10 mb-3">
                  <Card.Body className="text-center">
                    <i className="bi bi-star text-warning fs-1 mb-2"></i>
                    <h6 className="text-secondary">Green Points</h6>
                    <h2 className="text-warning fw-bold mb-0">{user.greenPoints}</h2>
                  </Card.Body>
                </Card>
                <Button variant="warning" className="w-100" onClick={() => navigate('/loyalty')}>
                  <i className="bi bi-gift me-2"></i>
                  Redeem Points
                </Button>
              </Col>
            </Row>
          )}

          {/* Settings Tab */}
          {activeTab === 'settings' && (
            <div>
              <h6 className="fw-bold mb-3">Account Settings</h6>
              <ListGroup className="mb-4">
                <ListGroup.Item action className="d-flex justify-content-between align-items-center">
                  <div>
                    <i className="bi bi-bell me-3 text-primary"></i>
                    <span>Push Notifications</span>
                  </div>
                  <Form.Check type="switch" defaultChecked />
                </ListGroup.Item>
                <ListGroup.Item action className="d-flex justify-content-between align-items-center">
                  <div>
                    <i className="bi bi-envelope me-3 text-primary"></i>
                    <span>Email Updates</span>
                  </div>
                  <Form.Check type="switch" defaultChecked />
                </ListGroup.Item>
                <ListGroup.Item action className="d-flex justify-content-between align-items-center">
                  <div>
                    <i className="bi bi-shield me-3 text-primary"></i>
                    <span>Two-Factor Authentication</span>
                  </div>
                  <Badge bg="success">Enabled</Badge>
                </ListGroup.Item>
              </ListGroup>
              
              <h6 className="fw-bold mb-3">Privacy & Security</h6>
              <div className="d-flex gap-2 mb-4">
                <Button variant="outline-primary" size="sm">
                  <i className="bi bi-key me-2"></i>
                  Change Password
                </Button>
                <Button variant="outline-info" size="sm">
                  <i className="bi bi-shield-lock me-2"></i>
                  Privacy Settings
                </Button>
              </div>

              <hr />
              
              <Button variant="outline-danger" className="w-100" onClick={logout}>
                <i className="bi bi-box-arrow-right me-2"></i>
                Logout
              </Button>
            </div>
          )}
        </Card.Body>
      </Card>

      {/* Edit Profile Modal */}
      <Modal show={showEditModal} onHide={() => setShowEditModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Edit Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Full Name</Form.Label>
              <Form.Control type="text" defaultValue={user.name} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" defaultValue={user.email} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Phone</Form.Label>
              <Form.Control type="tel" defaultValue={user.phone} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Date of Birth</Form.Label>
              <Form.Control type="date" />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowEditModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={() => setShowEditModal(false)}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default AccountPage;
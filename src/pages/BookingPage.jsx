// src/pages/BookingPage.jsx
import React, { useState } from 'react';
import { Container, Row, Col, Card, Button, Badge, Nav } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const BookingPage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('upcoming');

  // Mock bookings data
  const bookings = {
    upcoming: [
      {
        id: 'EV20240120345',
        busName: 'Luxury EV',
        route: 'Visakhapatnam → Vijayawada',
        date: '20 Jan 2024',
        time: '11:30 PM',
        seats: ['1A', '1B'],
        amount: 2400,
        status: 'Upcoming',
        statusColor: 'primary',
        busNumber: 'AP31 EV 7890',
        boardingPoint: 'Visakhapatnam Bus Stand'
      }
    ],
    completed: [
      {
        id: 'EV20240115234',
        busName: 'GreenLine EV',
        route: 'Visakhapatnam → Vijayawada',
        date: '15 Jan 2024',
        time: '06:00 AM',
        seats: ['2A', '2B'],
        amount: 1700,
        status: 'Completed',
        statusColor: 'success',
        busNumber: 'AP31 EV 1234'
      },
      {
        id: 'EV20240112456',
        busName: 'Volvo EV',
        route: 'Vijayawada → Tirupati',
        date: '12 Jan 2024',
        time: '07:00 AM',
        seats: ['5C'],
        amount: 650,
        status: 'Completed',
        statusColor: 'success',
        busNumber: 'AP31 EV 9012'
      },
      {
        id: 'EV20231228901',
        busName: 'City Express',
        route: 'Guntur → Kakinada',
        date: '28 Dec 2023',
        time: '08:00 AM',
        seats: ['1A'],
        amount: 750,
        status: 'Completed',
        statusColor: 'success',
        busNumber: 'AP39 EV 3456'
      }
    ],
    cancelled: [
      {
        id: 'EV20240105678',
        busName: 'EcoRide',
        route: 'Tirupati → Visakhapatnam',
        date: '05 Jan 2024',
        time: '06:00 PM',
        seats: ['3A', '3B'],
        amount: 2400,
        status: 'Cancelled',
        statusColor: 'danger',
        busNumber: 'AP39 EV 5678'
      }
    ]
  };

  const getActiveBookings = () => {
    switch(activeTab) {
      case 'upcoming': return bookings.upcoming;
      case 'completed': return bookings.completed;
      case 'cancelled': return bookings.cancelled;
      default: return [];
    }
  };

  const handleViewTicket = (booking) => {
    navigate(`/ticket/${booking.id}`);
  };

  const handleCancelBooking = (booking) => {
    navigate(`/cancel-booking/${booking.id}`);
  };

  const handleTrackBus = (booking) => {
    navigate(`/live-tracking/${booking.id}`);
  };

  return (
    <Container fluid className="px-4 py-4" style={{ background: '#f8f9fa' }}>
      {/* Header */}
      <div className="d-flex align-items-center justify-content-between mb-4">
        <h4 className="fw-bold mb-0">My Bookings</h4>
        <Badge bg="primary" className="px-3 py-2">
          Total: {bookings.upcoming.length + bookings.completed.length + bookings.cancelled.length}
        </Badge>
      </div>

      {/* Tabs */}
      <Nav variant="tabs" className="mb-4 border-0">
        <Nav.Item>
          <Nav.Link 
            active={activeTab === 'upcoming'} 
            onClick={() => setActiveTab('upcoming')}
            className="border-0"
          >
            Upcoming <Badge bg="primary" className="ms-2">{bookings.upcoming.length}</Badge>
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link 
            active={activeTab === 'completed'} 
            onClick={() => setActiveTab('completed')}
            className="border-0"
          >
            Completed <Badge bg="success" className="ms-2">{bookings.completed.length}</Badge>
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link 
            active={activeTab === 'cancelled'} 
            onClick={() => setActiveTab('cancelled')}
            className="border-0"
          >
            Cancelled <Badge bg="danger" className="ms-2">{bookings.cancelled.length}</Badge>
          </Nav.Link>
        </Nav.Item>
      </Nav>

      {/* Bookings List */}
      {getActiveBookings().length === 0 ? (
        <Card className="border-0 shadow-sm text-center py-5">
          <Card.Body>
            <i className="bi bi-ticket text-secondary" style={{ fontSize: '4rem' }}></i>
            <h5 className="mt-3 text-secondary">No {activeTab} bookings</h5>
            <Button 
              variant="primary" 
              className="mt-3 rounded-pill px-4"
              onClick={() => navigate('/')}
            >
              Book Now
            </Button>
          </Card.Body>
        </Card>
      ) : (
        <Row className="g-3">
          {getActiveBookings().map((booking) => (
            <Col key={booking.id} md={6}>
              <Card className="border-0 shadow-sm h-100">
                <Card.Body>
                  <div className="d-flex justify-content-between align-items-start mb-3">
                    <div>
                      <h6 className="fw-bold mb-1">{booking.busName}</h6>
                      <p className="text-secondary small mb-1">{booking.busNumber}</p>
                    </div>
                    <Badge bg={booking.statusColor} className="px-3 py-2">
                      {booking.status}
                    </Badge>
                  </div>

                  <p className="fw-medium mb-2">{booking.route}</p>
                  
                  <div className="d-flex gap-3 mb-3">
                    <div className="text-center">
                      <div className="fw-bold">{booking.time}</div>
                      <small className="text-secondary">{booking.date}</small>
                    </div>
                    <div className="text-center">
                      <i className="bi bi-arrow-right text-secondary"></i>
                    </div>
                    <div className="text-center">
                      <div className="fw-bold">{booking.time}</div>
                      <small className="text-secondary">{booking.date}</small>
                    </div>
                  </div>

                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <span>
                      <small className="text-secondary d-block">Seats</small>
                      <span className="fw-bold">{booking.seats.join(', ')}</span>
                    </span>
                    <span className="text-end">
                      <small className="text-secondary d-block">Amount</small>
                      <span className="fw-bold text-primary">₹{booking.amount}</span>
                    </span>
                  </div>

                  <hr className="my-2" />

                  <div className="d-flex gap-2">
                    <Button 
                      variant="outline-primary" 
                      size="sm" 
                      className="flex-grow-1"
                      onClick={() => handleViewTicket(booking)}
                    >
                      <i className="bi bi-ticket me-1"></i>
                      View Ticket
                    </Button>
                    {activeTab === 'upcoming' && (
                      <>
                        <Button 
                          variant="outline-success" 
                          size="sm" 
                          className="flex-grow-1"
                          onClick={() => handleTrackBus(booking)}
                        >
                          <i className="bi bi-pin-map me-1"></i>
                          Track
                        </Button>
                        <Button 
                          variant="outline-danger" 
                          size="sm" 
                          className="flex-grow-1"
                          onClick={() => handleCancelBooking(booking)}
                        >
                          <i className="bi bi-x-circle me-1"></i>
                          Cancel
                        </Button>
                      </>
                    )}
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
};

export default BookingPage;
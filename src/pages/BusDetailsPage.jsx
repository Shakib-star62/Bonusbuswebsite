// src/pages/BusDetailsPage.jsx
import React, { useState } from 'react';
import { Container, Row, Col, Card, Button, Badge, ProgressBar, ListGroup, Modal } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';

const BusDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [showAmenities, setShowAmenities] = useState(false);

  const busDetails = {
    id: 'EV101',
    name: 'GreenLine EV',
    operator: 'GreenLine Travels',
    type: 'AC Sleeper',
    busNumber: 'AP31 EV 1234',
    totalSeats: 36,
    availableSeats: 18,
    rating: 4.5,
    totalReviews: 1234,
    price: 850,
    amenities: [
      { name: 'Free WiFi', icon: 'bi-wifi', available: true },
      { name: 'Mobile Charging', icon: 'bi-battery-charging', available: true },
      { name: 'Air Conditioner', icon: 'bi-snow2', available: true },
      { name: 'Water Bottle', icon: 'bi-droplet', available: true },
      { name: 'Snacks', icon: 'bi-cup-hot', available: true },
      { name: 'Entertainment System', icon: 'bi-tv', available: true },
      { name: 'Reading Light', icon: 'bi-lamp', available: true },
      { name: 'Blanket', icon: 'bi-cloud-snow', available: true },
      { name: 'Toilet', icon: 'bi-water', available: false },
      { name: 'Wheelchair Access', icon: 'bi-wheelchair', available: false }
    ],
    facilities: [
      'Emergency exit',
      'First aid kit',
      'Fire extinguisher',
      'CCTV cameras',
      'GPS tracking',
      'Emergency alert button'
    ],
    seatingArrangement: [
      { row: 1, seats: ['1A', '1B', '1C', '1D'], type: 'sleeper' },
      { row: 2, seats: ['2A', '2B', '2C', '2D'], type: 'sleeper' },
      { row: 3, seats: ['3A', '3B', '3C', '3D'], type: 'sleeper' },
      { row: 4, seats: ['4A', '4B', '4C', '4D'], type: 'sleeper' },
      { row: 5, seats: ['5A', '5B', '5C', '5D'], type: 'sleeper' },
      { row: 6, seats: ['6A', '6B', '6C', '6D'], type: 'sleeper' },
      { row: 7, seats: ['7A', '7B', '7C', '7D'], type: 'sleeper' },
      { row: 8, seats: ['8A', '8B', '8C', '8D'], type: 'sleeper' },
      { row: 9, seats: ['9A', '9B', '9C', '9D'], type: 'sleeper' },
    ],
    reviews: [
      { user: 'Rahul S.', rating: 5, comment: 'Very comfortable journey', date: '2 days ago' },
      { user: 'Priya R.', rating: 4, comment: 'On time, clean bus', date: '5 days ago' }
    ]
  };

  return (
    <Container fluid className="px-4 py-4" style={{ background: '#f8f9fa' }}>
      {/* Header */}
      <div className="d-flex align-items-center gap-3 mb-4">
        <Button variant="link" className="p-0" onClick={() => navigate(-1)}>
          <i className="bi bi-arrow-left fs-4 text-primary"></i>
        </Button>
        <div>
          <h4 className="fw-bold mb-1">{busDetails.name}</h4>
          <p className="text-secondary mb-0">{busDetails.operator} • {busDetails.busNumber}</p>
        </div>
        <Badge bg="success" className="ms-auto px-3 py-2 fs-6">₹{busDetails.price}</Badge>
      </div>

      {/* Bus Info Card */}
      <Card className="border-0 shadow-lg mb-4">
        <Card.Body>
          <Row className="align-items-center">
            <Col md={8}>
              <div className="d-flex gap-4 mb-3">
                <div>
                  <small className="text-secondary">Bus Type</small>
                  <h6 className="fw-bold">{busDetails.type}</h6>
                </div>
                <div>
                  <small className="text-secondary">Total Seats</small>
                  <h6 className="fw-bold">{busDetails.totalSeats}</h6>
                </div>
                <div>
                  <small className="text-secondary">Available</small>
                  <h6 className="fw-bold text-success">{busDetails.availableSeats}</h6>
                </div>
              </div>
              <div className="d-flex align-items-center gap-3">
                <div className="d-flex align-items-center gap-1">
                  <i className="bi bi-star-fill text-warning"></i>
                  <span className="fw-bold">{busDetails.rating}</span>
                </div>
                <span className="text-secondary">({busDetails.totalReviews} reviews)</span>
                <Button 
                  variant="link" 
                  className="text-primary p-0"
                  onClick={() => navigate(`/reviews/${id}`)}
                >
                  View all reviews
                </Button>
              </div>
            </Col>
            <Col md={4} className="text-end">
              <Button 
                variant="success" 
                size="lg" 
                className="px-4"
                onClick={() => navigate('/home')}
              >
                <i className="bi bi-ticket-perforated me-2"></i>
                Book Now
              </Button>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      {/* Amenities */}
      <Card className="border-0 shadow-sm mb-4">
        <Card.Header className="bg-white">
          <h5 className="fw-bold mb-0">Amenities</h5>
        </Card.Header>
        <Card.Body>
          <Row className="g-3">
            {busDetails.amenities.map((amenity, index) => (
              <Col key={index} xs={6} md={4} lg={3}>
                <div className={`d-flex align-items-center gap-2 p-2 rounded-3 ${amenity.available ? 'bg-light' : 'bg-light opacity-50'}`}>
                  <i className={`bi ${amenity.icon} ${amenity.available ? 'text-success' : 'text-secondary'}`}></i>
                  <span className={amenity.available ? '' : 'text-decoration-line-through'}>
                    {amenity.name}
                  </span>
                  {!amenity.available && <small className="text-danger ms-auto">Not Available</small>}
                </div>
              </Col>
            ))}
          </Row>
        </Card.Body>
      </Card>

      {/* Safety Features */}
      <Card className="border-0 shadow-sm mb-4">
        <Card.Header className="bg-white">
          <h5 className="fw-bold mb-0">Safety Features</h5>
        </Card.Header>
        <Card.Body>
          <Row className="g-2">
            {busDetails.facilities.map((facility, index) => (
              <Col key={index} xs={6} md={4}>
                <div className="d-flex align-items-center gap-2">
                  <i className="bi bi-shield-check text-success"></i>
                  <span>{facility}</span>
                </div>
              </Col>
            ))}
          </Row>
        </Card.Body>
      </Card>

      {/* Seating Arrangement */}
      <Card className="border-0 shadow-sm mb-4">
        <Card.Header className="bg-white">
          <h5 className="fw-bold mb-0">Seating Arrangement</h5>
        </Card.Header>
        <Card.Body>
          <div className="bg-light p-3 rounded-3 mb-3">
            <div className="d-flex gap-3">
              <Badge bg="success" className="px-3 py-2">Available</Badge>
              <Badge bg="secondary" className="px-3 py-2">Booked</Badge>
              <Badge bg="primary" className="px-3 py-2">Selected</Badge>
            </div>
          </div>

          <div className="text-center mb-3">
            <div className="d-inline-block bg-white p-3 rounded-3 shadow-sm">
              <i className="bi bi-steering fs-1 text-primary"></i>
              <p className="small mb-0">Driver</p>
            </div>
          </div>

          <Row className="g-2 justify-content-center">
            {busDetails.seatingArrangement.map((row, idx) => (
              <Col key={idx} xs={12} className="mb-2">
                <div className="d-flex justify-content-center gap-2">
                  {row.seats.map((seat, seatIdx) => (
                    <Button
                      key={seat}
                      variant={seatIdx < 2 ? 'secondary' : 'outline-success'}
                      size="sm"
                      className="px-3"
                      disabled={seatIdx < 2}
                    >
                      {seat}
                    </Button>
                  ))}
                </div>
              </Col>
            ))}
          </Row>
        </Card.Body>
      </Card>

      {/* Cancellation Policy */}
      <Card className="border-0 shadow-sm">
        <Card.Header className="bg-white">
          <h5 className="fw-bold mb-0">Cancellation Policy</h5>
        </Card.Header>
        <Card.Body>
          <ListGroup variant="flush">
            <ListGroup.Item className="d-flex justify-content-between px-0">
              <span>More than 48 hours before departure</span>
              <Badge bg="success">90% Refund</Badge>
            </ListGroup.Item>
            <ListGroup.Item className="d-flex justify-content-between px-0">
              <span>24-48 hours before departure</span>
              <Badge bg="warning">75% Refund</Badge>
            </ListGroup.Item>
            <ListGroup.Item className="d-flex justify-content-between px-0">
              <span>12-24 hours before departure</span>
              <Badge bg="danger">50% Refund</Badge>
            </ListGroup.Item>
            <ListGroup.Item className="d-flex justify-content-between px-0">
              <span>Less than 12 hours before departure</span>
              <Badge bg="secondary">No Refund</Badge>
            </ListGroup.Item>
          </ListGroup>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default BusDetailsPage;
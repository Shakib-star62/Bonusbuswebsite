// pages/LiveTrackingPage.jsx
import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Badge, ProgressBar, ListGroup, Alert } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';

const LiveTrackingPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [busLocation, setBusLocation] = useState({
    lat: 17.6868,
    lng: 83.2185,
    address: 'Near Anakapalle, NH16',
    speed: '65 km/h',
    nextStop: 'Rajahmundry',
    eta: '45 mins',
    distanceCovered: '60%',
    batteryLevel: '82%'
  });

  const [driverInfo, setDriverInfo] = useState({
    name: 'Rajesh Kumar',
    phone: '+91 98765 43210',
    photo: 'https://randomuser.me/api/portraits/men/32.jpg',
    rating: 4.8,
    experience: '8 years'
  });

  const [stops, setStops] = useState([
    { name: 'Visakhapatnam', time: '06:00 AM', status: 'completed' },
    { name: 'Anakapalle', time: '06:45 AM', status: 'completed' },
    { name: 'Tuni', time: '07:30 AM', status: 'completed' },
    { name: 'Rajahmundry', time: '08:45 AM', status: 'current', eta: '15 mins' },
    { name: 'Tanuku', time: '09:30 AM', status: 'upcoming' },
    { name: 'Eluru', time: '10:15 AM', status: 'upcoming' },
    { name: 'Vijayawada', time: '11:30 AM', status: 'upcoming' }
  ]);

  const [shareLink, setShareLink] = useState('https://bonusbus.com/track/EV101');

  useEffect(() => {
    // Simulate live updates
    const interval = setInterval(() => {
      setBusLocation(prev => ({
        ...prev,
        distanceCovered: Math.min(parseInt(prev.distanceCovered) + 1, 100) + '%',
        eta: parseInt(prev.eta) - 1 + ' mins'
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const copyShareLink = () => {
    navigator.clipboard.writeText(shareLink);
    alert('Link copied to clipboard!');
  };

  const shareOnWhatsApp = () => {
    window.open(`https://wa.me/?text=Track my bus: ${shareLink}`, '_blank');
  };

  return (
    <Container fluid className="px-4 py-4" style={{ background: '#f8f9fa' }}>
      {/* Header */}
      <div className="d-flex align-items-center gap-3 mb-4">
        <Button variant="link" className="p-0" onClick={() => navigate(-1)}>
          <i className="bi bi-arrow-left fs-4 text-primary"></i>
        </Button>
        <h4 className="fw-bold mb-0">Live Tracking - EV101</h4>
        <Badge bg="success" className="ms-auto px-3 py-2">LIVE</Badge>
      </div>

      {/* Map Placeholder */}
      <Card className="border-0 shadow-lg mb-4 overflow-hidden">
        <div 
          className="position-relative text-white d-flex align-items-center justify-content-center"
          style={{ 
            height: '300px', 
            background: 'linear-gradient(135deg, #1e3c72, #2a5298)',
            position: 'relative'
          }}
        >
          {/* Animated Bus */}
          <div className="position-absolute" style={{ 
            left: `${busLocation.distanceCovered}%`, 
            bottom: '50%',
            transform: 'translateX(-50%)',
            animation: 'bounce 1s infinite'
          }}>
            <div className="bg-white rounded-circle p-3 shadow-lg">
              <i className="bi bi-bus-front text-primary fs-2"></i>
            </div>
          </div>

          {/* Route Line */}
          <div className="position-absolute bottom-0 start-0 end-0" style={{ height: '4px', background: 'rgba(255,255,255,0.3)' }}>
            <div 
              className="h-100 bg-warning" 
              style={{ width: busLocation.distanceCovered }}
            ></div>
          </div>

          {/* Location Info */}
          <Card className="position-absolute top-0 start-0 m-3 border-0 shadow">
            <Card.Body className="p-2">
              <small className="text-secondary d-block">Current Location</small>
              <span className="fw-bold">{busLocation.address}</span>
            </Card.Body>
          </Card>

          <Card className="position-absolute top-0 end-0 m-3 border-0 shadow">
            <Card.Body className="p-2 text-center">
              <small className="text-secondary d-block">Speed</small>
              <span className="fw-bold text-primary">{busLocation.speed}</span>
            </Card.Body>
          </Card>

          <Card className="position-absolute bottom-0 start-0 m-3 border-0 shadow">
            <Card.Body className="p-2">
              <small className="text-secondary d-block">Next Stop</small>
              <span className="fw-bold">{busLocation.nextStop}</span>
              <Badge bg="warning" className="ms-2">ETA: {busLocation.eta}</Badge>
            </Card.Body>
          </Card>
        </div>
      </Card>

      {/* Driver Info */}
      <Card className="border-0 shadow-sm mb-4">
        <Card.Body>
          <h5 className="fw-bold mb-3">
            <i className="bi bi-person-badge text-primary me-2"></i>
            Driver Information
          </h5>
          <Row className="align-items-center">
            <Col xs="auto">
              <img 
                src={driverInfo.photo} 
                alt="Driver" 
                className="rounded-circle"
                width="60" 
                height="60"
              />
            </Col>
            <Col>
              <h6 className="fw-bold mb-1">{driverInfo.name}</h6>
              <div className="d-flex gap-3">
                <small className="text-secondary">
                  <i className="bi bi-star-fill text-warning me-1"></i>
                  {driverInfo.rating}
                </small>
                <small className="text-secondary">
                  <i className="bi bi-briefcase me-1"></i>
                  {driverInfo.experience}
                </small>
              </div>
            </Col>
            <Col xs="auto">
              <Button variant="outline-primary" className="rounded-pill" onClick={() => window.open(`tel:${driverInfo.phone}`)}>
                <i className="bi bi-telephone me-2"></i>
                Call
              </Button>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      {/* Journey Progress */}
      <Card className="border-0 shadow-sm mb-4">
        <Card.Body>
          <h5 className="fw-bold mb-3">
            <i className="bi bi-signpost-split text-primary me-2"></i>
            Journey Progress
          </h5>
          <div className="mb-3">
            <div className="d-flex justify-content-between mb-2">
              <span>Visakhapatnam</span>
              <span className="fw-bold text-success">{busLocation.distanceCovered}</span>
              <span>Vijayawada</span>
            </div>
            <ProgressBar 
              now={parseInt(busLocation.distanceCovered)} 
              variant="success" 
              className="mb-2"
              style={{ height: '10px' }}
            />
          </div>

          <div className="d-flex justify-content-between align-items-center mb-3">
            <div>
              <small className="text-secondary d-block">Battery Level</small>
              <span className="fw-bold text-success">{busLocation.batteryLevel}</span>
            </div>
            <div>
              <small className="text-secondary d-block">Estimated Arrival</small>
              <span className="fw-bold">11:30 AM</span>
            </div>
          </div>
        </Card.Body>
      </Card>

      {/* Stops Timeline */}
      <Card className="border-0 shadow-sm mb-4">
        <Card.Body>
          <h5 className="fw-bold mb-3">
            <i className="bi bi-geo-alt text-primary me-2"></i>
            Route Stops
          </h5>
          <ListGroup variant="flush">
            {stops.map((stop, index) => (
              <ListGroup.Item key={index} className="bg-transparent px-0">
                <div className="d-flex align-items-center gap-3">
                  <div className="position-relative">
                    <div 
                      className={`rounded-circle p-2 ${
                        stop.status === 'completed' ? 'bg-success' :
                        stop.status === 'current' ? 'bg-warning' : 'bg-light'
                      }`}
                      style={{ width: '30px', height: '30px' }}
                    >
                      {stop.status === 'completed' && <i className="bi bi-check text-white"></i>}
                    </div>
                    {index < stops.length - 1 && (
                      <div className="position-absolute top-100 start-50 translate-middle-x" 
                           style={{ width: '2px', height: '30px', background: '#dee2e6' }}></div>
                    )}
                  </div>
                  <div className="flex-grow-1">
                    <div className="d-flex justify-content-between">
                      <span className="fw-medium">{stop.name}</span>
                      <span className="text-secondary">{stop.time}</span>
                    </div>
                    {stop.status === 'current' && (
                      <small className="text-warning">Arriving in {stop.eta}</small>
                    )}
                  </div>
                </div>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Card.Body>
      </Card>

      {/* Share Options */}
      <Card className="border-0 shadow-sm mb-4">
        <Card.Body>
          <h5 className="fw-bold mb-3">
            <i className="bi bi-share text-primary me-2"></i>
            Share Live Location
          </h5>
          <div className="d-flex gap-2 mb-3">
            <Button variant="outline-success" className="flex-grow-1" onClick={shareOnWhatsApp}>
              <i className="bi bi-whatsapp me-2"></i>
              WhatsApp
            </Button>
            <Button variant="outline-primary" className="flex-grow-1" onClick={copyShareLink}>
              <i className="bi bi-link-45deg me-2"></i>
              Copy Link
            </Button>
          </div>
          <div className="bg-light p-3 rounded-3">
            <small className="text-secondary d-block mb-1">Share this link with family</small>
            <div className="d-flex align-items-center gap-2">
              <input 
                type="text" 
                value={shareLink} 
                readOnly 
                className="form-control form-control-sm bg-white"
              />
              <Button variant="primary" size="sm" onClick={copyShareLink}>
                <i className="bi bi-files"></i>
              </Button>
            </div>
          </div>
        </Card.Body>
      </Card>

      {/* Emergency Alert */}
      <Alert variant="danger" className="border-0">
        <div className="d-flex align-items-center gap-3">
          <i className="bi bi-exclamation-triangle-fill fs-3"></i>
          <div className="flex-grow-1">
            <h6 className="fw-bold mb-1">Emergency?</h6>
            <small>Contact driver or emergency services</small>
          </div>
          <Button variant="danger" className="rounded-pill" onClick={() => window.open('tel:100')}>
            <i className="bi bi-telephone me-2"></i>
            Call 100
          </Button>
        </div>
      </Alert>

      <style jsx>{`
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
      `}</style>
    </Container>
  );
};

export default LiveTrackingPage;
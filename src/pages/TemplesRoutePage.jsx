// TemplesRoutePage.jsx - Bootstrap Web Application Version
import React, { useState, useEffect, useRef } from 'react';
import { 
  Container, Row, Col, Card, Button, Badge, 
  Modal, ListGroup, Alert, Spinner, ProgressBar,
  OverlayTrigger, Tooltip
} from 'react-bootstrap';

const TemplesRoutePage = () => {
  const [selectedTemple, setSelectedTemple] = useState(0);
  const [showDetails, setShowDetails] = useState(false);
  const [selectedTempleData, setSelectedTempleData] = useState(null);
  const [showPackageDialog, setShowPackageDialog] = useState(false);
  const [showBookingToast, setShowBookingToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastVariant, setToastVariant] = useState('success');

  // Animation refs
  const heroRef = useRef(null);
  const [animationStarted, setAnimationStarted] = useState(false);

  // Popular temple routes in Andhra Pradesh
  const templeRoutes = [
    {
      name: 'Tirupati Tirumala',
      description: 'Sri Venkateswara Swamy Temple',
      location: 'Tirupati',
      distance: '150 km',
      duration: '3h 30m',
      price: '₹850',
      special: 'VIP Darshan Package',
      color: '#fd7e14',
      gradient: ['#fd7e14', '#dc3545'],
      icon: 'bi-building',
      features: ['Prasadam Included', 'Queue Free', 'Accommodation'],
    },
    {
      name: 'Srikalahasti',
      description: 'Sri Kalahasteeswara Temple',
      location: 'Srikalahasti',
      distance: '120 km',
      duration: '2h 45m',
      price: '₹650',
      special: 'Rahu-Ketu Puja Package',
      color: '#198754',
      gradient: ['#198754', '#146c43'],
      icon: 'bi-droplet',
      features: ['Special Puja', 'Prasadam', 'Guide Service'],
    },
    {
      name: 'Simhachalam',
      description: 'Sri Varaha Lakshmi Narasimha Swamy',
      location: 'Visakhapatnam',
      distance: '20 km',
      duration: '45m',
      price: '₹300',
      special: 'Morning Special',
      color: '#0d6efd',
      gradient: ['#0d6efd', '#0a58ca'],
      icon: 'bi-tree',
      features: ['Early Darshan', 'Breakfast', 'Return Trip'],
    },
    {
      name: 'Amaravati',
      description: 'Amaralingeswara Swamy Temple',
      location: 'Amaravati',
      distance: '35 km',
      duration: '1h 15m',
      price: '₹450',
      special: 'Heritage Tour',
      color: '#6f42c1',
      gradient: ['#6f42c1', '#5a32a3'],
      icon: 'bi-bank',
      features: ['Museum Visit', 'Guide', 'Lunch'],
    },
    {
      name: 'Mahanandi',
      description: 'Sri Mahanandiswara Swamy Temple',
      location: 'Kurnool',
      distance: '280 km',
      duration: '6h 00m',
      price: '₹1200',
      special: 'Hot Springs Package',
      color: '#0dcaf0',
      gradient: ['#0dcaf0', '#0aa2c0'],
      icon: 'bi-water',
      features: ['Hot Spring Bath', '2 Days Package', 'Accommodation'],
    },
    {
      name: 'Kanipakam',
      description: 'Sri Varasiddhi Vinayaka Temple',
      location: 'Chittoor',
      distance: '180 km',
      duration: '4h 00m',
      price: '₹750',
      special: 'Ganesha Special',
      color: '#d63384',
      gradient: ['#d63384', '#ab296a'],
      icon: 'bi-flower1',
      features: ['Modakam Prasadam', 'Special Archana', 'Guide'],
    },
  ];

  useEffect(() => {
    setAnimationStarted(true);
  }, []);

  const showToast = (message, variant = 'success') => {
    setToastMessage(message);
    setToastVariant(variant);
    setShowBookingToast(true);
    setTimeout(() => setShowBookingToast(false), 3000);
  };

  const showTempleDetails = (temple) => {
    setSelectedTempleData(temple);
    setShowDetails(true);
  };

  const handleBookNow = (temple) => {
    setShowDetails(false);
    showToast(`Booking ${temple.name} package...`, 'success');
  };

  const handleBookPackage = () => {
    setShowPackageDialog(false);
    showToast('Pilgrimage package booking started!', 'warning');
  };

  return (
    <Container fluid className="bg-light min-vh-100 p-0">
      {/* Toast Notification */}
      {showBookingToast && (
        <Alert 
          variant={toastVariant}
          className="position-fixed top-0 end-0 m-3 shadow-lg"
          style={{ zIndex: 1050, minWidth: '250px' }}
        >
          {toastMessage}
        </Alert>
      )}

      {/* Hero Section */}
      <div 
        className="position-relative text-white d-flex align-items-center justify-content-center overflow-hidden"
        style={{ 
          height: '300px',
          background: 'linear-gradient(135deg, #0d6efd, #0a58ca)'
        }}
      >
        {/* Animated Icons */}
        <div 
          className="position-absolute"
          style={{ 
            top: '50px', 
            left: '20px',
            opacity: animationStarted ? 0.24 : 0,
            transform: animationStarted ? 'translateY(25px)' : 'translateY(0)',
            transition: 'all 1s ease'
          }}
        >
          <i className="bi bi-building fs-1 text-white opacity-25"></i>
        </div>
        
        <div 
          className="position-absolute"
          style={{ 
            top: '100px', 
            right: '30px',
            opacity: animationStarted ? 0.24 : 0,
            transform: animationStarted ? 'translateY(-15px)' : 'translateY(0)',
            transition: 'all 1s ease'
          }}
        >
          <i className="bi bi-music-note-beamed fs-2 text-white opacity-25"></i>
        </div>

        {/* Main Hero Content */}
        <div 
          className="text-center"
          style={{
            opacity: animationStarted ? 1 : 0,
            transform: animationStarted ? 'translateY(0)' : 'translateY(50px)',
            transition: 'all 1s ease 0.3s'
          }}
        >
          <div className="d-flex align-items-center justify-content-center gap-2 mb-3">
            <i className="bi bi-building fs-1 text-white"></i>
            <h1 className="display-4 fw-bold mb-0">TEMPLE TOURS</h1>
          </div>
          <p className="fs-5 text-white-50 mb-4">Sacred Journeys | Divine Experiences</p>
          <Badge bg="light" text="dark" className="px-4 py-2 rounded-pill">
            <i className="bi bi-lightning-charge text-warning me-2"></i>
            EV Buses for Spiritual Journeys
          </Badge>
        </div>
      </div>

      {/* Temple Cards */}
      <Container className="py-4">
        <Row xs={1} className="g-3">
          {templeRoutes.map((temple, index) => (
            <Col key={index}>
              <TempleCard
                temple={temple}
                isSelected={selectedTemple === index}
                onClick={() => {
                  setSelectedTemple(index);
                  showTempleDetails(temple);
                }}
              />
            </Col>
          ))}
        </Row>

        {/* Special Package Banner */}
        <Card 
          className="border-0 shadow-lg mt-4"
          style={{ background: 'linear-gradient(135deg, #fd7e14, #dc3545)' }}
        >
          <Card.Body className="d-flex align-items-center gap-3">
            <div className="bg-white bg-opacity-25 rounded-circle p-3">
              <i className="bi bi-bell-fill text-white fs-3"></i>
            </div>
            <div className="flex-grow-1">
              <h3 className="h5 fw-bold text-white mb-1">SPECIAL PACKAGE!</h3>
              <p className="text-white-50 small mb-2">7 Temples in 7 Days - Complete Pilgrimage Tour</p>
              <Button 
                variant="light" 
                size="sm" 
                className="rounded-pill"
                onClick={() => setShowPackageDialog(true)}
              >
                Explore Package <i className="bi bi-arrow-right ms-2"></i>
              </Button>
            </div>
          </Card.Body>
        </Card>

        {/* How It Works Section */}
        <Card className="border-0 shadow-sm mt-4">
          <Card.Header className="bg-white">
            <h5 className="mb-0 text-primary">How It Works</h5>
          </Card.Header>
          <Card.Body>
            <Row xs={2} md={4} className="g-3">
              <Step number={1} title="Choose Temple" icon="bi-building" />
              <Step number={2} title="Select Package" icon="bi-gift" />
              <Step number={3} title="Book Bus" icon="bi-bus-front" />
              <Step number={4} title="Enjoy Darshan" icon="bi-stars" />
            </Row>
          </Card.Body>
        </Card>
      </Container>

      {/* Temple Details Modal */}
      <Modal show={showDetails} onHide={() => setShowDetails(false)} size="lg" centered>
        {selectedTempleData && (
          <>
            <Modal.Header 
              className="text-white border-0"
              style={{
                background: `linear-gradient(135deg, ${selectedTempleData.gradient[0]}, ${selectedTempleData.gradient[1]})`
              }}
            >
              <div className="d-flex align-items-center gap-3">
                <div className="bg-white bg-opacity-25 rounded-circle p-3">
                  <i className={`bi ${selectedTempleData.icon} fs-2 text-white`}></i>
                </div>
                <div>
                  <Modal.Title className="h4">{selectedTempleData.name}</Modal.Title>
                  <p className="small text-white-50 mb-0">{selectedTempleData.description}</p>
                </div>
              </div>
            </Modal.Header>

            <Modal.Body>
              {/* Special Package */}
              <Card 
                className="border-0 mb-4"
                style={{ 
                  backgroundColor: `${selectedTempleData.color}10`,
                  borderColor: `${selectedTempleData.color}30`
                }}
              >
                <Card.Body>
                  <small className="text-primary fw-bold d-block mb-2">SPECIAL PACKAGE INCLUDES:</small>
                  <h5 className="fw-bold" style={{ color: selectedTempleData.color }}>
                    {selectedTempleData.special}
                  </h5>
                </Card.Body>
              </Card>

              {/* Features */}
              <h6 className="fw-bold mb-3">Package Features:</h6>
              <ListGroup variant="flush" className="mb-4">
                {selectedTempleData.features.map((feature, idx) => (
                  <ListGroup.Item key={idx} className="bg-transparent px-0">
                    <div className="d-flex align-items-center gap-2">
                      <i className="bi bi-check-circle-fill" style={{ color: selectedTempleData.color }}></i>
                      <span>{feature}</span>
                    </div>
                  </ListGroup.Item>
                ))}
              </ListGroup>

              {/* Pricing */}
              <Card className="bg-light border-0">
                <Card.Body className="d-flex justify-content-between align-items-center">
                  <div>
                    <div className="fw-bold">Total Package</div>
                    <small className="text-secondary">Includes everything</small>
                  </div>
                  <span className="h3 text-success mb-0">{selectedTempleData.price}</span>
                </Card.Body>
              </Card>
            </Modal.Body>

            <Modal.Footer className="border-0">
              <Button 
                variant="primary" 
                size="lg" 
                className="w-100"
                style={{ backgroundColor: selectedTempleData.color, borderColor: selectedTempleData.color }}
                onClick={() => handleBookNow(selectedTempleData)}
              >
                BOOK NOW
              </Button>
            </Modal.Footer>
          </>
        )}
      </Modal>

      {/* Package Dialog */}
      <Modal show={showPackageDialog} onHide={() => setShowPackageDialog(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title className="text-primary">7 Temples Pilgrimage Tour</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p className="text-secondary mb-4">Complete Spiritual Journey Package</p>
          
          <h6 className="fw-bold mb-3">Includes:</h6>
          <ListGroup variant="flush">
            <ListGroup.Item className="bg-transparent px-0">
              <i className="bi bi-check-circle-fill text-success me-2"></i>
              All 7 Major Temples
            </ListGroup.Item>
            <ListGroup.Item className="bg-transparent px-0">
              <i className="bi bi-check-circle-fill text-success me-2"></i>
              Luxury EV Bus Travel
            </ListGroup.Item>
            <ListGroup.Item className="bg-transparent px-0">
              <i className="bi bi-check-circle-fill text-success me-2"></i>
              Hotel Accommodation
            </ListGroup.Item>
            <ListGroup.Item className="bg-transparent px-0">
              <i className="bi bi-check-circle-fill text-success me-2"></i>
              Prasadam & Meals
            </ListGroup.Item>
            <ListGroup.Item className="bg-transparent px-0">
              <i className="bi bi-check-circle-fill text-success me-2"></i>
              Tour Guide
            </ListGroup.Item>
            <ListGroup.Item className="bg-transparent px-0">
              <i className="bi bi-check-circle-fill text-success me-2"></i>
              Special Darshan Pass
            </ListGroup.Item>
          </ListGroup>

          <Card className="bg-success bg-opacity-10 border-0 mt-4">
            <Card.Body className="d-flex justify-content-between align-items-center">
              <div>
                <small className="text-secondary">Total Package Price</small>
                <div className="h2 text-success mb-0">₹7,999</div>
              </div>
              <i className="bi bi-stars text-warning fs-1"></i>
            </Card.Body>
          </Card>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-secondary" onClick={() => setShowPackageDialog(false)}>
            Later
          </Button>
          <Button variant="warning" onClick={handleBookPackage}>
            Book Package
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

// Temple Card Component
const TempleCard = ({ temple, isSelected, onClick }) => {
  return (
    <Card 
      className={`border-0 cursor-pointer ${isSelected ? 'shadow-lg' : 'shadow-sm'}`}
      style={{ 
        background: `linear-gradient(135deg, ${temple.gradient[0]}, ${temple.gradient[1]})`,
        border: isSelected ? '2px solid rgba(255,255,255,0.3)' : '1px solid rgba(255,255,255,0.1)',
        cursor: 'pointer',
        transition: 'all 0.3s ease'
      }}
      onClick={onClick}
    >
      <Card.Body>
        <Row className="align-items-center">
          <Col xs={2}>
            <div className="bg-white bg-opacity-25 rounded-circle p-2 text-center">
              <i className={`bi ${temple.icon} text-white fs-4`}></i>
            </div>
          </Col>
          
          <Col xs={7}>
            <h6 className="fw-bold text-white mb-1">{temple.name}</h6>
            <p className="small text-white-50 mb-2">{temple.description}</p>
            <div className="d-flex gap-2 flex-wrap">
              <Badge bg="light" text="dark" className="bg-opacity-25">
                <i className="bi bi-geo-alt me-1"></i>
                {temple.location}
              </Badge>
              <Badge bg="light" text="dark" className="bg-opacity-25">
                <i className="bi bi-signpost me-1"></i>
                {temple.distance}
              </Badge>
              <Badge bg="light" text="dark" className="bg-opacity-25">
                <i className="bi bi-clock me-1"></i>
                {temple.duration}
              </Badge>
            </div>
          </Col>
          
          <Col xs={3} className="text-end">
            <div className="fw-bold text-white fs-5">{temple.price}</div>
            <small className="text-white-50">per person</small>
            <div className="mt-2">
              <i className="bi bi-arrow-right-circle-fill text-white opacity-75"></i>
            </div>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

// Step Component
const Step = ({ number, title, icon }) => (
  <Col>
    <div className="text-center">
      <div className="bg-primary bg-opacity-10 rounded-circle d-inline-flex p-3 mb-2">
        <i className={`bi ${icon} text-primary fs-3`}></i>
      </div>
      <p className="small text-secondary mb-1">Step {number}</p>
      <p className="fw-bold small mb-0">{title}</p>
    </div>
  </Col>
);

export default TemplesRoutePage;
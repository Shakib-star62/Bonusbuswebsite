// pages/HomePage.jsx - Updated to work with Layout
import React, { useState, useEffect } from 'react';
import { 
  Container, Row, Col, Card, Button, Form, Badge, 
  Modal, ProgressBar, Alert, Tabs, Tab
} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const navigate = useNavigate();
  const [selectedFrom, setSelectedFrom] = useState('');
  const [selectedTo, setSelectedTo] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [recentSearches, setRecentSearches] = useState([]);
  const [featuredRoutes, setFeaturedRoutes] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [alternativeRoutes, setAlternativeRoutes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedBus, setSelectedBus] = useState(null);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [filterType, setFilterType] = useState('all');

  // Load recent searches from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('recentSearches');
    if (saved) {
      setRecentSearches(JSON.parse(saved));
    }

    // Featured routes data
    setFeaturedRoutes([
      { id: 1, from: 'Visakhapatnam', to: 'Vijayawada', price: '₹850', duration: '6h 30m', departures: '6 buses', image: 'https://images.unsplash.com/photo-1570125909232-eb263c188f7e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80' },
      { id: 2, from: 'Vijayawada', to: 'Tirupati', price: '₹650', duration: '8h 15m', departures: '4 buses', image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80' },
      { id: 3, from: 'Guntur', to: 'Kakinada', price: '₹750', duration: '5h 45m', departures: '5 buses', image: 'https://images.unsplash.com/photo-1570125909232-eb263c188f7e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80' },
      { id: 4, from: 'Tirupati', to: 'Visakhapatnam', price: '₹1200', duration: '10h 00m', departures: '3 buses', image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80' },
    ]);
  }, []);

  // Comprehensive bus data for all routes
  const allBuses = [
    // Visakhapatnam to Vijayawada routes
    {
      id: 'EV101',
      name: 'GreenLine EV',
      type: 'AC Sleeper',
      from: 'Visakhapatnam',
      to: 'Vijayawada',
      departureTime: '06:00 AM',
      arrivalTime: '12:30 PM',
      duration: '6h 30m',
      price: 850,
      availableSeats: 18,
      totalSeats: 36,
      amenities: ['wifi', 'charging', 'ac', 'water'],
      rating: 4.5,
      reviews: 234,
      busType: 'sleeper'
    },
    {
      id: 'EV102',
      name: 'EcoRide',
      type: 'AC Seater',
      from: 'Visakhapatnam',
      to: 'Vijayawada',
      departureTime: '08:30 AM',
      arrivalTime: '02:45 PM',
      duration: '6h 15m',
      price: 750,
      availableSeats: 12,
      totalSeats: 40,
      amenities: ['wifi', 'ac', 'water'],
      rating: 4.2,
      reviews: 156,
      busType: 'seater'
    },
    {
      id: 'EV103',
      name: 'Volvo EV',
      type: 'AC Semi-Sleeper',
      from: 'Visakhapatnam',
      to: 'Vijayawada',
      departureTime: '10:00 AM',
      arrivalTime: '04:15 PM',
      duration: '6h 15m',
      price: 950,
      availableSeats: 6,
      totalSeats: 32,
      amenities: ['wifi', 'charging', 'ac', 'water', 'snacks'],
      rating: 4.8,
      reviews: 312,
      busType: 'semi-sleeper'
    },
    {
      id: 'EV104',
      name: 'City Express EV',
      type: 'AC Sleeper',
      from: 'Visakhapatnam',
      to: 'Vijayawada',
      departureTime: '09:00 PM',
      arrivalTime: '03:30 AM',
      duration: '6h 30m',
      price: 800,
      availableSeats: 24,
      totalSeats: 36,
      amenities: ['wifi', 'charging', 'ac', 'water'],
      rating: 4.3,
      reviews: 189,
      busType: 'sleeper'
    },
    {
      id: 'EV105',
      name: 'Luxury EV',
      type: 'AC Luxury',
      from: 'Visakhapatnam',
      to: 'Vijayawada',
      departureTime: '11:30 PM',
      arrivalTime: '06:00 AM',
      duration: '6h 30m',
      price: 1200,
      availableSeats: 4,
      totalSeats: 20,
      amenities: ['wifi', 'charging', 'ac', 'water', 'snacks', 'tv'],
      rating: 4.9,
      reviews: 98,
      busType: 'luxury'
    },

    // Vijayawada to Tirupati routes
    {
      id: 'EV201',
      name: 'Tirupati Express',
      type: 'AC Sleeper',
      from: 'Vijayawada',
      to: 'Tirupati',
      departureTime: '07:00 AM',
      arrivalTime: '03:15 PM',
      duration: '8h 15m',
      price: 650,
      availableSeats: 22,
      totalSeats: 36,
      amenities: ['wifi', 'charging', 'ac', 'water'],
      rating: 4.4,
      reviews: 178,
      busType: 'sleeper'
    },
    {
      id: 'EV202',
      name: 'GreenWay',
      type: 'AC Seater',
      from: 'Vijayawada',
      to: 'Tirupati',
      departureTime: '09:30 AM',
      arrivalTime: '05:45 PM',
      duration: '8h 15m',
      price: 550,
      availableSeats: 28,
      totalSeats: 40,
      amenities: ['wifi', 'ac', 'water'],
      rating: 4.1,
      reviews: 145,
      busType: 'seater'
    },

    // Guntur to Kakinada routes
    {
      id: 'EV301',
      name: 'Kakinada Fast',
      type: 'AC Semi-Sleeper',
      from: 'Guntur',
      to: 'Kakinada',
      departureTime: '08:00 AM',
      arrivalTime: '01:45 PM',
      duration: '5h 45m',
      price: 750,
      availableSeats: 15,
      totalSeats: 32,
      amenities: ['wifi', 'charging', 'ac', 'water', 'snacks'],
      rating: 4.6,
      reviews: 203,
      busType: 'semi-sleeper'
    },
    {
      id: 'EV302',
      name: 'Coastal Rider',
      type: 'AC Sleeper',
      from: 'Guntur',
      to: 'Kakinada',
      departureTime: '10:30 PM',
      arrivalTime: '04:15 AM',
      duration: '5h 45m',
      price: 800,
      availableSeats: 18,
      totalSeats: 36,
      amenities: ['wifi', 'ac', 'water'],
      rating: 4.3,
      reviews: 167,
      busType: 'sleeper'
    },

    // Tirupati to Visakhapatnam routes
    {
      id: 'EV401',
      name: 'Vizag Express',
      type: 'AC Sleeper',
      from: 'Tirupati',
      to: 'Visakhapatnam',
      departureTime: '06:00 PM',
      arrivalTime: '04:00 AM',
      duration: '10h 00m',
      price: 1200,
      availableSeats: 12,
      totalSeats: 36,
      amenities: ['wifi', 'charging', 'ac', 'water', 'snacks'],
      rating: 4.7,
      reviews: 256,
      busType: 'sleeper'
    }
  ];

  const cities = [
    'Visakhapatnam', 'Vijayawada', 'Guntur', 'Nellore', 'Kakinada',
    'Rajahmundry', 'Tirupati', 'Anantapur', 'Kurnool', 'Kadapa',
    'Ongole', 'Chittoor', 'Machilipatnam', 'Srikakulam', 'Vizianagaram'
  ];

  const handleSearch = () => {
    if (selectedFrom && selectedTo) {
      setLoading(true);
      
      // Simulate API call
      setTimeout(() => {
        // Filter direct buses based on selected route
        const direct = allBuses.filter(bus => 
          bus.from === selectedFrom && bus.to === selectedTo
        );
        
        // Find alternative routes
        const alternatives = allBuses.filter(bus => 
          (bus.from === selectedFrom || bus.to === selectedTo) && 
          !(bus.from === selectedFrom && bus.to === selectedTo)
        ).slice(0, 4);
        
        setSearchResults(direct);
        setAlternativeRoutes(alternatives);
        setShowSearchResults(true);
        setLoading(false);
        
        // Save to recent searches
        const search = { from: selectedFrom, to: selectedTo, date: selectedDate };
        const updated = [search, ...recentSearches.filter(s => 
          !(s.from === search.from && s.to === search.to)
        ).slice(0, 4)];
        setRecentSearches(updated);
        localStorage.setItem('recentSearches', JSON.stringify(updated));
        
        // Scroll to results
        setTimeout(() => {
          document.getElementById('search-results')?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }, 1500);
    }
  };

  const swapLocations = () => {
    setSelectedFrom(selectedTo);
    setSelectedTo(selectedFrom);
  };

  const handleBookNow = (bus) => {
    setSelectedBus(bus);
    setShowBookingModal(true);
  };

  const handleConfirmBooking = () => {
    setShowBookingModal(false);
    alert(`Booking confirmed for ${selectedBus?.id}`);
  };

  const getAmenityIcon = (amenity) => {
    const icons = {
      wifi: 'bi-wifi',
      charging: 'bi-battery-charging',
      ac: 'bi-snow2',
      water: 'bi-droplet',
      snacks: 'bi-cup-hot',
      tv: 'bi-tv'
    };
    return icons[amenity] || 'bi-check-circle';
  };

  const filterByBusType = (type) => {
    if (type === 'all') return searchResults;
    return searchResults.filter(bus => bus.busType === type);
  };

  return (
    <Container fluid className="py-3">
      {/* Hero Search Section */}
      <Card className="border-0 shadow-lg mb-5 overflow-hidden">
        <Card.Body className="p-4 p-md-5" style={{ background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)' }}>
          <Row className="align-items-center">
            <Col lg={7} className="mb-4 mb-lg-0">
              <h1 className="display-5 fw-bold mb-3">
                <span className="text-primary">Travel Green</span>
                <br />
                <span className="text-success">with EV Buses</span>
              </h1>
              <p className="lead text-secondary mb-4">
                100% Electric AC Buses across Andhra Pradesh. 
                <span className="d-block mt-2">
                  <Badge bg="success" className="me-2">✓ Zero Emissions</Badge>
                  <Badge bg="info" className="me-2">✓ Free WiFi</Badge>
                  <Badge bg="warning" text="dark">✓ Live Tracking</Badge>
                </span>
              </p>
              
              {/* Search Form */}
              <Card className="border-0 shadow">
                <Card.Body className="p-4">
                  <Row className="g-3">
                    <Col md={5}>
                      <Form.Group>
                        <Form.Label className="fw-medium text-secondary">
                          <i className="bi bi-geo-alt-fill text-primary me-1"></i>
                          From
                        </Form.Label>
                        <Form.Select 
                          value={selectedFrom}
                          onChange={(e) => setSelectedFrom(e.target.value)}
                          size="lg"
                          className="border-0 bg-light"
                        >
                          <option value="">Select departure city</option>
                          {cities.map(city => (
                            <option key={city} value={city}>{city}</option>
                          ))}
                        </Form.Select>
                      </Form.Group>
                    </Col>
                    
                    <Col md={1} className="d-flex align-items-center justify-content-center">
                      <Button 
                        variant="light" 
                        className="rounded-circle p-2 shadow-sm"
                        onClick={swapLocations}
                        style={{ width: '40px', height: '40px' }}
                      >
                        <i className="bi bi-arrow-left-right"></i>
                      </Button>
                    </Col>
                    
                    <Col md={5}>
                      <Form.Group>
                        <Form.Label className="fw-medium text-secondary">
                          <i className="bi bi-geo-alt-fill text-success me-1"></i>
                          To
                        </Form.Label>
                        <Form.Select 
                          value={selectedTo}
                          onChange={(e) => setSelectedTo(e.target.value)}
                          size="lg"
                          className="border-0 bg-light"
                        >
                          <option value="">Select arrival city</option>
                          {cities.map(city => (
                            <option key={city} value={city}>{city}</option>
                          ))}
                        </Form.Select>
                      </Form.Group>
                    </Col>
                    
                    <Col md={8}>
                      <Form.Group>
                        <Form.Label className="fw-medium text-secondary">
                          <i className="bi bi-calendar-date me-1"></i>
                          Journey Date
                        </Form.Label>
                        <Form.Control 
                          type="date" 
                          value={selectedDate}
                          onChange={(e) => setSelectedDate(e.target.value)}
                          size="lg"
                          className="border-0 bg-light"
                        />
                      </Form.Group>
                    </Col>
                    
                    <Col md={4} className="d-flex align-items-end">
                      <Button 
                        variant="primary" 
                        size="lg" 
                        className="w-100 fw-bold"
                        onClick={handleSearch}
                        disabled={!selectedFrom || !selectedTo || loading}
                        style={{ 
                          background: 'linear-gradient(135deg, #0d6efd, #0a58ca)', 
                          border: 'none',
                          height: '48px'
                        }}
                      >
                        {loading ? (
                          <>
                            <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                            Searching...
                          </>
                        ) : (
                          <>
                            <i className="bi bi-search me-2"></i>
                            Search Buses
                          </>
                        )}
                      </Button>
                    </Col>
                  </Row>

                  {/* Recent Searches */}
                  {recentSearches.length > 0 && (
                    <div className="mt-4 pt-3 border-top">
                      <small className="text-secondary me-3">
                        <i className="bi bi-clock-history me-1"></i>
                        Recent searches:
                      </small>
                      <div className="d-flex flex-wrap gap-2 mt-2">
                        {recentSearches.map((search, index) => (
                          <Button
                            key={index}
                            variant="outline-primary"
                            size="sm"
                            className="rounded-pill"
                            onClick={() => {
                              setSelectedFrom(search.from);
                              setSelectedTo(search.to);
                              handleSearch();
                            }}
                          >
                            <i className="bi bi-arrow-right-short"></i>
                            {search.from} → {search.to}
                          </Button>
                        ))}
                      </div>
                    </div>
                  )}
                </Card.Body>
              </Card>
            </Col>
            
            <Col lg={5}>
              <div className="position-relative">
                <img 
                  src="https://images.unsplash.com/photo-1570125909232-eb263c188f7e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1171&q=80" 
                  alt="EV Bus" 
                  className="img-fluid rounded-4 shadow"
                />
                <div className="position-absolute bottom-0 start-0 end-0 p-3 text-white" 
                     style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)' }}>
                  <small>
                    <i className="bi bi-star-fill text-warning me-1"></i>
                    4.8 (10k+ reviews) • 100% Electric Fleet
                  </small>
                </div>
              </div>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      {/* Search Results Section */}
      {showSearchResults && (
        <div id="search-results" className="mb-5">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <div>
              <h3 className="h4 fw-bold mb-1">
                <i className="bi bi-bus-front text-primary me-2"></i>
                Available Buses
              </h3>
              <p className="text-secondary mb-0">
                {selectedFrom} → {selectedTo} • {new Date(selectedDate).toLocaleDateString('en-IN', { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' })}
              </p>
            </div>
            <Badge bg="primary" className="px-3 py-2">
              {searchResults.length} buses found
            </Badge>
          </div>

          {loading ? (
            <div className="text-center py-5">
              <div className="spinner-border text-primary mb-3" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              <p className="text-secondary">Searching for available buses...</p>
            </div>
          ) : (
            <>
              {/* Filter Tabs */}
              {searchResults.length > 0 && (
                <div className="mb-4">
                  <Tabs
                    activeKey={filterType}
                    onSelect={(k) => setFilterType(k)}
                    className="mb-3"
                  >
                    <Tab eventKey="all" title="All Buses" />
                    <Tab eventKey="sleeper" title="Sleeper" />
                    <Tab eventKey="seater" title="Seater" />
                    <Tab eventKey="semi-sleeper" title="Semi-Sleeper" />
                    <Tab eventKey="luxury" title="Luxury" />
                  </Tabs>
                </div>
              )}

              {/* Direct Buses */}
              {searchResults.length > 0 ? (
                <>
                  <h5 className="fw-bold mb-3">
                    <i className="bi bi-check-circle-fill text-success me-2"></i>
                    Direct Buses
                  </h5>
                  <Row className="g-4 mb-5">
                    {filterByBusType(filterType).map((bus) => (
                      <Col key={bus.id} md={6} lg={6}>
                        <BusCard bus={bus} onBook={handleBookNow} />
                      </Col>
                    ))}
                  </Row>
                </>
              ) : (
                <Alert variant="info" className="mb-4">
                  <i className="bi bi-info-circle-fill me-2"></i>
                  No direct buses found for this route. Check out these alternative options below.
                </Alert>
              )}

              {/* Alternative Routes */}
              {alternativeRoutes.length > 0 && (
                <>
                  <h5 className="fw-bold mb-3 mt-4">
                    <i className="bi bi-arrow-left-right text-primary me-2"></i>
                    Alternative Routes You Might Consider
                  </h5>
                  <Row className="g-4">
                    {alternativeRoutes.map((bus) => (
                      <Col key={bus.id} md={6} lg={6}>
                        <AlternativeBusCard bus={bus} onBook={handleBookNow} />
                      </Col>
                    ))}
                  </Row>

                  <div className="text-center mt-4">
                    <Button 
                      variant="link" 
                      className="text-primary text-decoration-none"
                      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                    >
                      <i className="bi bi-arrow-up me-2"></i>
                      Back to Search
                    </Button>
                  </div>
                </>
              )}
            </>
          )}
        </div>
      )}

      {/* Quick Stats and Featured Routes (shown only when not searching) */}
      {!showSearchResults && (
        <>
          <Row className="g-4 mb-5">
            <Col xs={6} md={3}>
              <Card className="border-0 shadow-sm text-center h-100 card-hover">
                <Card.Body>
                  <div className="bg-success bg-opacity-10 rounded-circle d-inline-flex p-3 mb-3">
                    <i className="bi bi-ev-station text-success fs-2"></i>
                  </div>
                  <h3 className="h2 fw-bold text-primary mb-0">100%</h3>
                  <p className="text-secondary mb-0">Electric Fleet</p>
                </Card.Body>
              </Card>
            </Col>
            <Col xs={6} md={3}>
              <Card className="border-0 shadow-sm text-center h-100 card-hover">
                <Card.Body>
                  <div className="bg-info bg-opacity-10 rounded-circle d-inline-flex p-3 mb-3">
                    <i className="bi bi-tree text-info fs-2"></i>
                  </div>
                  <h3 className="h2 fw-bold text-primary mb-0">2.5K+</h3>
                  <p className="text-secondary mb-0">Tons CO₂ Saved</p>
                </Card.Body>
              </Card>
            </Col>
            <Col xs={6} md={3}>
              <Card className="border-0 shadow-sm text-center h-100 card-hover">
                <Card.Body>
                  <div className="bg-warning bg-opacity-10 rounded-circle d-inline-flex p-3 mb-3">
                    <i className="bi bi-people text-warning fs-2"></i>
                  </div>
                  <h3 className="h2 fw-bold text-primary mb-0">50K+</h3>
                  <p className="text-secondary mb-0">Happy Riders</p>
                </Card.Body>
              </Card>
            </Col>
            <Col xs={6} md={3}>
              <Card className="border-0 shadow-sm text-center h-100 card-hover">
                <Card.Body>
                  <div className="bg-danger bg-opacity-10 rounded-circle d-inline-flex p-3 mb-3">
                    <i className="bi bi-star text-danger fs-2"></i>
                  </div>
                  <h3 className="h2 fw-bold text-primary mb-0">4.8</h3>
                  <p className="text-secondary mb-0">Rating</p>
                </Card.Body>
              </Card>
            </Col>
          </Row>

          {/* Featured Routes */}
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2 className="h3 fw-bold">Popular EV Routes</h2>
            <Button variant="link" className="text-success text-decoration-none">
              View All <i className="bi bi-arrow-right"></i>
            </Button>
          </div>

          <Row className="g-4 mb-5">
            {featuredRoutes.slice(0, 4).map((route, index) => (
              <Col key={index} md={6} lg={3}>
                <Card className="border-0 shadow-sm h-100 card-hover">
                  <Card.Img variant="top" src={route.image} style={{ height: '160px', objectFit: 'cover' }} />
                  <Card.Body>
                    <div className="d-flex justify-content-between align-items-start mb-2">
                      <h6 className="fw-bold mb-0">
                        {route.from} → {route.to}
                      </h6>
                      <Badge bg="success" className="px-2 py-1">{route.price}</Badge>
                    </div>
                    <div className="d-flex gap-2 mb-3">
                      <small className="text-secondary">
                        <i className="bi bi-clock me-1"></i>{route.duration}
                      </small>
                      <small className="text-secondary">
                        <i className="bi bi-bus-front me-1"></i>{route.departures}
                      </small>
                    </div>
                    <Button 
                      variant="outline-success" 
                      size="sm" 
                      className="w-100"
                      onClick={() => {
                        setSelectedFrom(route.from);
                        setSelectedTo(route.to);
                        handleSearch();
                      }}
                    >
                      Check Availability
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </>
      )}

      {/* Booking Modal */}
      <Modal show={showBookingModal} onHide={() => setShowBookingModal(false)} centered size="lg">
        <Modal.Header closeButton className="border-0 pb-0">
          <Modal.Title className="text-primary">Complete Your Booking</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedBus && (
            <>
              <Card className="bg-light border-0 mb-4">
                <Card.Body>
                  <div className="d-flex justify-content-between align-items-start mb-3">
                    <div>
                      <h5 className="fw-bold mb-1">{selectedBus.name} - {selectedBus.id}</h5>
                      <p className="text-secondary mb-0">{selectedBus.type}</p>
                    </div>
                    <Badge bg="success" className="px-3 py-2 fs-6">₹{selectedBus.price}</Badge>
                  </div>
                  
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <div className="text-center">
                      <div className="fw-bold">{selectedBus.departureTime}</div>
                      <small className="text-secondary">{selectedBus.from}</small>
                    </div>
                    <div className="text-center">
                      <i className="bi bi-arrow-right text-secondary"></i>
                      <div className="small text-secondary">{selectedBus.duration}</div>
                    </div>
                    <div className="text-center">
                      <div className="fw-bold">{selectedBus.arrivalTime}</div>
                      <small className="text-secondary">{selectedBus.to}</small>
                    </div>
                  </div>

                  <div className="d-flex gap-2 mb-3">
                    {selectedBus.amenities.map((amenity, idx) => (
                      <Badge key={idx} bg="light" text="dark" className="px-2 py-1">
                        <i className={`bi ${getAmenityIcon(amenity)} me-1`}></i>
                        {amenity}
                      </Badge>
                    ))}
                  </div>

                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      <small className="text-secondary d-block">Available Seats</small>
                      <span className="fw-bold text-success">{selectedBus.availableSeats}/{selectedBus.totalSeats}</span>
                    </div>
                    <div className="text-end">
                      <small className="text-secondary d-block">Rating</small>
                      <span className="fw-bold text-warning">
                        <i className="bi bi-star-fill me-1"></i>
                        {selectedBus.rating} ({selectedBus.reviews} reviews)
                      </span>
                    </div>
                  </div>
                </Card.Body>
              </Card>

              <Form>
                <h6 className="fw-bold mb-3">Select Seats</h6>
                <Row className="g-2 mb-4">
                  {['1A', '1B', '1C', '1D', '2A', '2B', '2C', '2D', '3A', '3B', '3C', '3D'].map((seat, idx) => (
                    <Col key={seat} xs={3} sm={2}>
                      <Form.Check 
                        type="checkbox"
                        id={`seat-${seat}`}
                        label={seat}
                        className="seat-checkbox"
                        disabled={idx < 3}
                      />
                    </Col>
                  ))}
                </Row>

                <h6 className="fw-bold mb-3">Boarding Point</h6>
                <Form.Select className="mb-4">
                  <option>{selectedBus.from} Bus Stand (Main Gate)</option>
                  <option>{selectedBus.from} Railway Station</option>
                  <option>City Center</option>
                </Form.Select>

                <h6 className="fw-bold mb-3">Contact Details</h6>
                <Row className="g-3">
                  <Col md={6}>
                    <Form.Control type="text" placeholder="Full Name" defaultValue="Shakib" />
                  </Col>
                  <Col md={6}>
                    <Form.Control type="tel" placeholder="Phone Number" defaultValue="9390629750" />
                  </Col>
                  <Col md={12}>
                    <Form.Control type="email" placeholder="Email (Optional)" />
                  </Col>
                </Row>
              </Form>
            </>
          )}
        </Modal.Body>
        <Modal.Footer className="border-0 pt-0">
          <Button variant="outline-secondary" onClick={() => setShowBookingModal(false)}>
            Cancel
          </Button>
          <Button variant="success" onClick={handleConfirmBooking} className="px-4">
            <i className="bi bi-check-circle me-2"></i>
            Confirm Booking
          </Button>
        </Modal.Footer>
      </Modal>

      <style jsx>{`
        .card-hover {
          transition: all 0.3s ease;
        }
        .card-hover:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 30px rgba(0,0,0,0.15) !important;
        }
        .seat-checkbox .form-check-input {
          margin-right: 5px;
        }
        .seat-checkbox .form-check-label {
          font-size: 0.9rem;
        }
        .nav-tabs .nav-link {
          color: #6c757d;
          font-weight: 500;
        }
        .nav-tabs .nav-link.active {
          color: #0d6efd;
          font-weight: 600;
        }
      `}</style>
    </Container>
  );
};

// Bus Card Component
const BusCard = ({ bus, onBook }) => {
  const getAmenityIcon = (amenity) => {
    const icons = {
      wifi: 'bi-wifi',
      charging: 'bi-battery-charging',
      ac: 'bi-snow2',
      water: 'bi-droplet',
      snacks: 'bi-cup-hot',
      tv: 'bi-tv'
    };
    return icons[amenity] || 'bi-check-circle';
  };

  return (
    <Card className="border-0 shadow-sm h-100 card-hover">
      <Card.Body>
        <div className="d-flex justify-content-between align-items-start mb-3">
          <div>
            <div className="d-flex align-items-center gap-2 mb-1">
              <h5 className="fw-bold mb-0">{bus.name}</h5>
              <Badge bg="primary" pill>{bus.id}</Badge>
            </div>
            <p className="text-secondary mb-0">{bus.type}</p>
          </div>
          <Badge bg="success" className="px-3 py-2 fs-6">₹{bus.price}</Badge>
        </div>

        <div className="d-flex justify-content-between align-items-center mb-3">
          <div className="text-center">
            <div className="fw-bold fs-5">{bus.departureTime}</div>
            <small className="text-secondary">{bus.from}</small>
          </div>
          <div className="text-center">
            <i className="bi bi-arrow-right text-secondary"></i>
            <div className="small text-secondary">{bus.duration}</div>
          </div>
          <div className="text-center">
            <div className="fw-bold fs-5">{bus.arrivalTime}</div>
            <small className="text-secondary">{bus.to}</small>
          </div>
        </div>

        <div className="d-flex gap-2 flex-wrap mb-3">
          {bus.amenities.map((amenity, idx) => (
            <Badge key={idx} bg="light" text="dark" className="px-2 py-1">
              <i className={`bi ${getAmenityIcon(amenity)} me-1`}></i>
              {amenity}
            </Badge>
          ))}
        </div>

        <div className="d-flex justify-content-between align-items-center mb-3">
          <div>
            <small className="text-secondary d-block">Available Seats</small>
            <span className="fw-bold text-success">{bus.availableSeats} seats</span>
          </div>
          <div className="text-end">
            <small className="text-secondary d-block">Rating</small>
            <span className="fw-bold text-warning">
              <i className="bi bi-star-fill me-1"></i>
              {bus.rating}
            </span>
          </div>
        </div>

        <ProgressBar 
          now={(bus.availableSeats / bus.totalSeats) * 100} 
          variant="success" 
          className="mb-3"
          label={`${bus.availableSeats} seats left`}
          style={{ height: '20px' }}
        />

        <Button 
          variant="success" 
          className="w-100 fw-bold"
          onClick={() => onBook(bus)}
        >
          <i className="bi bi-ticket-perforated me-2"></i>
          Book Now
        </Button>
      </Card.Body>
    </Card>
  );
};

// Alternative Bus Card Component
const AlternativeBusCard = ({ bus, onBook }) => {
  const getAmenityIcon = (amenity) => {
    const icons = {
      wifi: 'bi-wifi',
      charging: 'bi-battery-charging',
      ac: 'bi-snow2',
      water: 'bi-droplet',
      snacks: 'bi-cup-hot',
      tv: 'bi-tv'
    };
    return icons[amenity] || 'bi-check-circle';
  };

  return (
    <Card className="border-0 shadow-sm h-100 card-hover">
      <Card.Body>
        <div className="d-flex justify-content-between align-items-start mb-3">
          <div>
            <div className="d-flex align-items-center gap-2 mb-1">
              <h5 className="fw-bold mb-0">{bus.name}</h5>
              <Badge bg="primary" pill>{bus.id}</Badge>
            </div>
            <p className="text-secondary mb-0">{bus.type}</p>
          </div>
          <Badge bg="success" className="px-3 py-2 fs-6">₹{bus.price}</Badge>
        </div>

        <div className="d-flex justify-content-between align-items-center mb-3">
          <div className="text-center">
            <div className="fw-bold fs-5">{bus.departureTime}</div>
            <small className="text-secondary">{bus.from}</small>
          </div>
          <div className="text-center">
            <i className="bi bi-arrow-right text-secondary"></i>
            <div className="small text-secondary">{bus.duration}</div>
          </div>
          <div className="text-center">
            <div className="fw-bold fs-5">{bus.arrivalTime}</div>
            <small className="text-secondary">{bus.to}</small>
          </div>
        </div>

        <div className="d-flex gap-2 flex-wrap mb-3">
          {bus.amenities.slice(0, 3).map((amenity, idx) => (
            <Badge key={idx} bg="light" text="dark" className="px-2 py-1">
              <i className={`bi ${getAmenityIcon(amenity)} me-1`}></i>
              {amenity}
            </Badge>
          ))}
          {bus.amenities.length > 3 && (
            <Badge bg="light" text="dark" className="px-2 py-1">
              +{bus.amenities.length - 3} more
            </Badge>
          )}
        </div>

        <div className="d-flex justify-content-between align-items-center mb-3">
          <div>
            <small className="text-secondary d-block">Available Seats</small>
            <span className="fw-bold text-success">{bus.availableSeats} seats</span>
          </div>
          <div className="text-end">
            <small className="text-secondary d-block">Rating</small>
            <span className="fw-bold text-warning">
              <i className="bi bi-star-fill me-1"></i>
              {bus.rating}
            </span>
          </div>
        </div>

        <Button 
          variant="outline-primary" 
          className="w-100 fw-bold"
          onClick={() => onBook(bus)}
        >
          <i className="bi bi-ticket-perforated me-2"></i>
          Book This Route
        </Button>
      </Card.Body>
    </Card>
  );
};

export default HomePage;
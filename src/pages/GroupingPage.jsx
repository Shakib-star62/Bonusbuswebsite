// src/pages/GroupingPage.jsx - Premium Enhanced Version
import React, { useState, useEffect } from 'react';
import { 
  Container, Row, Col, Card, Form, Button, Badge, 
  Modal, ListGroup, Alert, ProgressBar, Table,
  InputGroup, FloatingLabel, Nav
} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const GroupingPage = () => {
  const navigate = useNavigate();
  // State declarations
  const [selectedFrom, setSelectedFrom] = useState('');
  const [selectedTo, setSelectedTo] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [returnDate, setReturnDate] = useState(null);
  const [numberOfMembers, setNumberOfMembers] = useState(10);
  const [tripType, setTripType] = useState('one_way');
  const [totalPrice, setTotalPrice] = useState(0);
  const [advancePayment, setAdvancePayment] = useState(0);
  const [balancePayment, setBalancePayment] = useState(0);
  const [showPayment, setShowPayment] = useState(false);
  const [walletBalance, setWalletBalance] = useState(2450.0);
  const [walletUsed, setWalletUsed] = useState(0);
  const [useWallet, setUseWallet] = useState(false);
  const [showTripTypeModal, setShowTripTypeModal] = useState(false);
  const [showBookingConfirmation, setShowBookingConfirmation] = useState(false);
  const [activeTab, setActiveTab] = useState('search');
  
  // Form data
  const [formData, setFormData] = useState({
    groupName: '',
    contactPerson: '',
    contactPhone: '',
    contactEmail: '',
    specialRequirements: ''
  });

  const allCities = [
    'Visakhapatnam', 'Vijayawada', 'Guntur', 'Nellore', 'Kakinada',
    'Rajahmundry', 'Tirupati', 'Anantapur', 'Kurnool', 'Kadapa',
    'Ongole', 'Chittoor', 'Machilipatnam', 'Srikakulam', 'Vizianagaram',
    'Anakapalle', 'Bheemili', 'Narsipatnam', 'Tuni', 'Paderu',
    'Araku Valley', 'Sabbavaram', 'Eluru', 'Bhimavaram', 'Tadepalligudem',
    'Palakollu', 'Tanuku', 'Nidadavole', 'Amalapuram', 'Ramachandrapuram',
    'Mandapeta', 'Chilakaluripet', 'Tenali', 'Mangalagiri', 'Tadikonda',
    'Nuzvid', 'Gudivada', 'Kavali', 'Kovvur', 'Rajanagaram',
    'Samalkot', 'Pithapuram', 'Yeleswaram', 'Madanapalle', 'Punganur',
    'Rayachoti', 'Proddatur', 'Badvel', 'Mydukur', 'Jammalamadugu',
    'Adoni', 'Nandyal', 'Dharmavaram', 'Hindupur', 'Madakasira',
    'Puttaparthi'
  ];

  // Fare per person for different routes
  const routeFares = {
    'Visakhapatnam → Vijayawada': 600.0,
    'Vijayawada → Tirupati': 500.0,
    'Visakhapatnam → Tirupati': 450.0,
    'Tirupati → Visakhapatnam': 550.0,
    'Guntur → Kurnool': 400.0,
    'Rajahmundry → Vijayawada': 450.0,
    'Visakhapatnam → Hyderabad': 650.0,
    'Vijayawada → Bengaluru': 700.0,
  };

  // Calculate total price
  useEffect(() => {
    calculateTotal();
  }, [selectedFrom, selectedTo, numberOfMembers, tripType, useWallet]);

  const calculateTotal = () => {
    const routeKey = `${selectedFrom} → ${selectedTo}`;
    const farePerPerson = routeFares[routeKey] || 500.0;
    const discount = getDiscountForGroup(numberOfMembers);
    const discountedFare = farePerPerson * (1 - discount / 100);

    let total;
    if (tripType === 'one_way') {
      total = discountedFare * numberOfMembers;
    } else {
      total = discountedFare * numberOfMembers * 2;
    }

    const advance = total * 0.25;
    const balance = total * 0.75;

    let walletUsedAmount = 0;
    if (useWallet) {
      walletUsedAmount = walletBalance >= advance ? advance : walletBalance;
    }

    setTotalPrice(total);
    setAdvancePayment(advance);
    setBalancePayment(balance);
    setWalletUsed(walletUsedAmount);
  };

  const getDiscountForGroup = (members) => {
    if (members >= 50) return 20.0;
    if (members >= 35) return 18.0;
    if (members >= 20) return 15.0;
    if (members >= 10) return 10.0;
    return 0.0;
  };

  const getGroupCategory = (members) => {
    if (members >= 50) return 'Large Group (50+ members)';
    if (members >= 35) return 'Medium-Large Group (35-49 members)';
    if (members >= 20) return 'Medium Group (20-34 members)';
    return 'Small Group (10-19 members)';
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('en-IN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const handleDateChange = (date, type) => {
    if (type === 'departure') {
      setSelectedDate(date);
      setShowPayment(false);
    } else {
      setReturnDate(date);
      setTripType('round_trip');
      setShowPayment(false);
    }
  };

  const handleMembersChange = (value) => {
    let members = parseInt(value) || 10;
    if (members < 10) members = 10;
    setNumberOfMembers(members);
    setShowPayment(false);
  };

  const handleSearch = () => {
    if (!selectedFrom || !selectedTo) {
      alert('Please select both pickup and drop points');
      return;
    }
    if (numberOfMembers < 10) {
      alert('Minimum 10 members required');
      return;
    }
    setShowTripTypeModal(true);
  };

  const handleTripTypeSelect = (type) => {
    if (type === 'one_way') {
      setTripType('one_way');
      setReturnDate(null);
      setShowTripTypeModal(false);
      calculateTotal();
      setShowPayment(true);
      setActiveTab('payment');
    } else {
      setShowTripTypeModal(false);
      const tomorrow = new Date(selectedDate);
      tomorrow.setDate(tomorrow.getDate() + 1);
      setReturnDate(tomorrow);
      setTripType('round_trip');
      calculateTotal();
      setShowPayment(true);
      setActiveTab('payment');
    }
  };

  const handleFormChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleConfirmBooking = () => {
    setShowBookingConfirmation(true);
  };

  const handleBookingDone = () => {
    setShowBookingConfirmation(false);
    setShowPayment(false);
    setActiveTab('search');
    // Reset form
    setSelectedFrom('');
    setSelectedTo('');
    setNumberOfMembers(10);
    setTripType('one_way');
    setFormData({
      groupName: '',
      contactPerson: '',
      contactPhone: '',
      contactEmail: '',
      specialRequirements: ''
    });
  };

  const routeKey = `${selectedFrom} → ${selectedTo}`;
  const farePerPerson = routeFares[routeKey] || 500.0;
  const discount = getDiscountForGroup(numberOfMembers);
  const discountedFare = farePerPerson * (1 - discount / 100);
  const cashback = totalPrice * 0.10;
  const finalAdvance = advancePayment - walletUsed;

  // Popular routes for quick selection
  const popularRoutes = [
    { from: 'Visakhapatnam', to: 'Vijayawada', price: '₹600', discount: '20% off for 50+' },
    { from: 'Vijayawada', to: 'Tirupati', price: '₹500', discount: '18% off for 35+' },
    { from: 'Visakhapatnam', to: 'Tirupati', price: '₹450', discount: '15% off for 20+' },
    { from: 'Guntur', to: 'Kurnool', price: '₹400', discount: '10% off for 10+' }
  ];

  return (
    <Container fluid className="px-4 py-4" style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
      {/* Header */}
      <div className="d-flex align-items-center gap-3 mb-4">
        <Button variant="link" className="p-0 text-white" onClick={() => navigate(-1)}>
          <i className="bi bi-arrow-left fs-4"></i>
        </Button>
        <div>
          <h4 className="fw-bold text-white mb-1">Group Booking</h4>
          <p className="text-white-50 mb-0">Save up to 20% with group travel</p>
        </div>
      </div>

      {/* Main Card */}
      <Card className="border-0 shadow-lg overflow-hidden">
        <Card.Header className="bg-white py-3">
          <Nav variant="pills" activeKey={activeTab} onSelect={(k) => setActiveTab(k)}>
            <Nav.Item>
              <Nav.Link eventKey="search" className="rounded-pill">
                <i className="bi bi-search me-2"></i>
                Search
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="payment" disabled={!showPayment} className="rounded-pill">
                <i className="bi bi-credit-card me-2"></i>
                Payment
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="confirm" disabled className="rounded-pill">
                <i className="bi bi-check-circle me-2"></i>
                Confirm
              </Nav.Link>
            </Nav.Item>
          </Nav>
        </Card.Header>

        <Card.Body className="p-4">
          {activeTab === 'search' && (
            <>
              {/* Search Section */}
              <div className="d-flex align-items-center justify-content-between mb-4">
                <h5 className="fw-bold mb-0">Find Group Fares</h5>
                <Badge bg="primary" pill className="px-3 py-2">MIN 10 MEMBERS</Badge>
              </div>

              <Row className="g-3">
                <Col md={6}>
                  <FloatingLabel label="From">
                    <Form.Select 
                      value={selectedFrom}
                      onChange={(e) => setSelectedFrom(e.target.value)}
                    >
                      <option value="">Select pickup point</option>
                      {allCities.map(city => (
                        <option key={city} value={city}>{city}</option>
                      ))}
                    </Form.Select>
                  </FloatingLabel>
                </Col>

                <Col md={6}>
                  <FloatingLabel label="To">
                    <Form.Select 
                      value={selectedTo}
                      onChange={(e) => setSelectedTo(e.target.value)}
                    >
                      <option value="">Select drop point</option>
                      {allCities.map(city => (
                        <option key={city} value={city}>{city}</option>
                      ))}
                    </Form.Select>
                  </FloatingLabel>
                </Col>

                <Col md={6}>
                  <FloatingLabel label="Departure Date">
                    <Form.Control
                      type="date"
                      value={selectedDate.toISOString().split('T')[0]}
                      onChange={(e) => handleDateChange(new Date(e.target.value), 'departure')}
                    />
                  </FloatingLabel>
                </Col>

                <Col md={6}>
                  <FloatingLabel label="Number of Members">
                    <Form.Control
                      type="number"
                      min="10"
                      value={numberOfMembers}
                      onChange={(e) => handleMembersChange(e.target.value)}
                    />
                  </FloatingLabel>
                </Col>
              </Row>

              <div className="mt-3">
                <small className="text-secondary">
                  <i className="bi bi-info-circle me-1"></i>
                  {getGroupCategory(numberOfMembers)} • {discount}% group discount applicable
                </small>
              </div>

              <Button 
                variant="primary" 
                size="lg" 
                className="w-100 mt-4 fw-bold"
                onClick={handleSearch}
                style={{ 
                  background: 'linear-gradient(135deg, #667eea, #764ba2)',
                  border: 'none'
                }}
              >
                <i className="bi bi-search me-2"></i>
                SEARCH GROUP FARES
              </Button>

              {/* Popular Routes */}
              <div className="mt-5">
                <h6 className="fw-bold mb-3">Popular Group Routes</h6>
                <Row xs={1} md={2} className="g-2">
                  {popularRoutes.map((route, index) => (
                    <Col key={index}>
                      <Card 
                        className="border-0 shadow-sm cursor-pointer"
                        style={{ cursor: 'pointer' }}
                        onClick={() => {
                          setSelectedFrom(route.from);
                          setSelectedTo(route.to);
                        }}
                      >
                        <Card.Body className="d-flex align-items-center gap-2 p-2">
                          <div className="bg-primary bg-opacity-10 rounded-2 p-2">
                            <i className="bi bi-signpost-split text-primary"></i>
                          </div>
                          <div className="flex-grow-1">
                            <small className="fw-bold">{route.from} → {route.to}</small>
                            <Badge bg="success" size="sm" className="ms-2">{route.discount}</Badge>
                          </div>
                          <div className="text-end">
                            <small className="fw-bold text-primary">{route.price}</small>
                          </div>
                        </Card.Body>
                      </Card>
                    </Col>
                  ))}
                </Row>
              </div>
            </>
          )}

          {activeTab === 'payment' && showPayment && (
            <>
              {/* Payment Section */}
              <div className="mb-4">
                <h5 className="fw-bold mb-1">Payment Details</h5>
                <small className="text-secondary">
                  {selectedFrom} → {selectedTo} • {tripType === 'one_way' ? 'One Way' : 'Round Trip'} • {numberOfMembers} members
                </small>
              </div>

              {/* Trip Summary */}
              <Card className="bg-light border-0 mb-4">
                <Card.Body>
                  <h6 className="fw-bold mb-3">Trip Summary</h6>
                  
                  {/* Departure Trip */}
                  <div className="d-flex gap-3 mb-3">
                    <div className="bg-primary bg-opacity-10 rounded-2 p-2">
                      <i className="bi bi-bus-front text-primary"></i>
                    </div>
                    <div>
                      <div className="fw-bold">Departure</div>
                      <small className="text-secondary d-block">{formatDate(selectedDate)}</small>
                      <small className="text-secondary">{selectedFrom} → {selectedTo}</small>
                    </div>
                  </div>

                  {/* Return Trip */}
                  {tripType === 'round_trip' && returnDate && (
                    <div className="d-flex gap-3">
                      <div className="bg-success bg-opacity-10 rounded-2 p-2">
                        <i className="bi bi-bus-front text-success"></i>
                      </div>
                      <div>
                        <div className="fw-bold">Return</div>
                        <small className="text-secondary d-block">{formatDate(returnDate)}</small>
                        <small className="text-secondary">{selectedTo} → {selectedFrom}</small>
                      </div>
                    </div>
                  )}
                </Card.Body>
              </Card>

              {/* Fare Breakdown */}
              <Card className="bg-light border-0 mb-4">
                <Card.Body>
                  <h6 className="fw-bold mb-3">Fare Breakdown</h6>
                  <Table borderless size="sm">
                    <tbody>
                      <tr>
                        <td className="text-secondary">Fare per person</td>
                        <td className="text-end">₹{farePerPerson.toFixed(0)}</td>
                      </tr>
                      <tr>
                        <td className="text-secondary">Group discount ({discount}%)</td>
                        <td className="text-end text-success">-₹{(farePerPerson * discount / 100).toFixed(0)}</td>
                      </tr>
                      <tr>
                        <td className="fw-bold">Discounted fare</td>
                        <td className="text-end fw-bold">₹{discountedFare.toFixed(0)}</td>
                      </tr>
                      <tr>
                        <td className="text-secondary">Number of members</td>
                        <td className="text-end">{numberOfMembers}</td>
                      </tr>
                      {tripType === 'round_trip' && (
                        <tr>
                          <td className="text-secondary">Trip type</td>
                          <td className="text-end">Round Trip (2x)</td>
                        </tr>
                      )}
                    </tbody>
                  </Table>

                  <hr className="my-2" />

                  <Table borderless size="sm">
                    <tbody>
                      <tr>
                        <td className="fw-bold">Total Amount</td>
                        <td className="text-end fw-bold fs-5">₹{totalPrice.toFixed(0)}</td>
                      </tr>
                      <tr>
                        <td className="text-secondary">Advance (25%)</td>
                        <td className="text-end text-primary fw-bold">₹{advancePayment.toFixed(0)}</td>
                      </tr>
                      <tr>
                        <td className="text-secondary">Balance (75%)</td>
                        <td className="text-end text-secondary">₹{balancePayment.toFixed(0)}</td>
                      </tr>
                      <tr>
                        <td className="text-secondary">Cashback (10%)</td>
                        <td className="text-end text-success">₹{cashback.toFixed(0)}</td>
                      </tr>
                    </tbody>
                  </Table>
                </Card.Body>
              </Card>

              {/* Wallet Option */}
              <Card className="bg-light border-0 mb-4">
                <Card.Body>
                  <Form.Group className="mb-3">
                    <Form.Check 
                      type="checkbox"
                      id="useWallet"
                      label={
                        <span className="fw-medium">Use Wallet Balance</span>
                      }
                      checked={useWallet}
                      onChange={(e) => setUseWallet(e.target.checked)}
                    />
                    <small className="text-secondary d-block mt-1">Available: ₹{walletBalance.toFixed(0)}</small>
                  </Form.Group>

                  {useWallet && (
                    <Alert variant="success" className="mb-0">
                      <div className="d-flex justify-content-between">
                        <span>Wallet Used:</span>
                        <span className="fw-bold">₹{walletUsed.toFixed(0)}</span>
                      </div>
                    </Alert>
                  )}
                </Card.Body>
              </Card>

              {/* Group Information Form */}
              <Card className="bg-light border-0 mb-4">
                <Card.Body>
                  <h6 className="fw-bold mb-3">Group Information</h6>
                  
                  <Form.Group className="mb-3">
                    <Form.Label>Group Name</Form.Label>
                    <Form.Control
                      type="text"
                      value={formData.groupName}
                      onChange={(e) => handleFormChange('groupName', e.target.value)}
                      placeholder="Enter group name"
                    />
                  </Form.Group>

                  <Row>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Contact Person</Form.Label>
                        <Form.Control
                          type="text"
                          value={formData.contactPerson}
                          onChange={(e) => handleFormChange('contactPerson', e.target.value)}
                          placeholder="Full name"
                        />
                      </Form.Group>
                    </Col>
                    
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Contact Phone</Form.Label>
                        <Form.Control
                          type="tel"
                          value={formData.contactPhone}
                          onChange={(e) => handleFormChange('contactPhone', e.target.value)}
                          placeholder="Phone number"
                        />
                      </Form.Group>
                    </Col>
                  </Row>

                  <Form.Group className="mb-3">
                    <Form.Label>Contact Email</Form.Label>
                    <Form.Control
                      type="email"
                      value={formData.contactEmail}
                      onChange={(e) => handleFormChange('contactEmail', e.target.value)}
                      placeholder="Email address"
                    />
                  </Form.Group>

                  <Form.Group>
                    <Form.Label>Special Requirements</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={3}
                      value={formData.specialRequirements}
                      onChange={(e) => handleFormChange('specialRequirements', e.target.value)}
                      placeholder="Any special requirements or requests"
                    />
                  </Form.Group>
                </Card.Body>
              </Card>

              {/* Navigation Buttons */}
              <div className="d-flex gap-3">
                <Button 
                  variant="outline-secondary" 
                  size="lg" 
                  className="flex-grow-1"
                  onClick={() => setActiveTab('search')}
                >
                  Back
                </Button>
                <Button 
                  variant="success" 
                  size="lg" 
                  className="flex-grow-1"
                  onClick={handleConfirmBooking}
                >
                  CONFIRM BOOKING
                </Button>
              </div>
            </>
          )}
        </Card.Body>
      </Card>

      {/* Group Benefits - Always Visible */}
      <Row className="g-3 mt-4">
        <Col md={3}>
          <Card className="border-0 shadow-sm h-100 bg-white bg-opacity-10 text-white">
            <Card.Body className="d-flex align-items-center gap-3">
              <div className="bg-white bg-opacity-25 rounded-2 p-2">
                <i className="bi bi-percent text-white fs-4"></i>
              </div>
              <div>
                <h6 className="fw-bold text-white mb-1">Exclusive Discounts</h6>
                <small className="text-white-50">10-20% off for groups</small>
              </div>
            </Card.Body>
          </Card>
        </Col>
        
        <Col md={3}>
          <Card className="border-0 shadow-sm h-100 bg-white bg-opacity-10 text-white">
            <Card.Body className="d-flex align-items-center gap-3">
              <div className="bg-white bg-opacity-25 rounded-2 p-2">
                <i className="bi bi-gift text-white fs-4"></i>
              </div>
              <div>
                <h6 className="fw-bold text-white mb-1">10% Cashback</h6>
                <small className="text-white-50">On total booking</small>
              </div>
            </Card.Body>
          </Card>
        </Col>
        
        <Col md={3}>
          <Card className="border-0 shadow-sm h-100 bg-white bg-opacity-10 text-white">
            <Card.Body className="d-flex align-items-center gap-3">
              <div className="bg-white bg-opacity-25 rounded-2 p-2">
                <i className="bi bi-credit-card text-white fs-4"></i>
              </div>
              <div>
                <h6 className="fw-bold text-white mb-1">Pay 25% Now</h6>
                <small className="text-white-50">Balance later</small>
              </div>
            </Card.Body>
          </Card>
        </Col>
        
        <Col md={3}>
          <Card className="border-0 shadow-sm h-100 bg-white bg-opacity-10 text-white">
            <Card.Body className="d-flex align-items-center gap-3">
              <div className="bg-white bg-opacity-25 rounded-2 p-2">
                <i className="bi bi-shield-check text-white fs-4"></i>
              </div>
              <div>
                <h6 className="fw-bold text-white mb-1">Dedicated Support</h6>
                <small className="text-white-50">Trip coordinator</small>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Trip Type Modal */}
      <Modal show={showTripTypeModal} onHide={() => setShowTripTypeModal(false)} centered>
        <Modal.Header closeButton className="border-0 pb-0">
          <Modal.Title className="fw-bold text-primary">Select Trip Type</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ListGroup variant="flush">
            <ListGroup.Item 
              action
              onClick={() => handleTripTypeSelect('one_way')}
              className="d-flex align-items-center gap-3 py-3 border-0 border-bottom"
            >
              <div className="bg-primary bg-opacity-10 rounded-2 p-2">
                <i className="bi bi-arrow-right-circle text-primary fs-2"></i>
              </div>
              <div className="flex-grow-1">
                <h6 className="fw-bold mb-1">One Way Trip</h6>
                <small className="text-secondary">Travel from {selectedFrom} to {selectedTo}</small>
              </div>
              <i className="bi bi-chevron-right text-secondary"></i>
            </ListGroup.Item>
            
            <ListGroup.Item 
              action
              onClick={() => handleTripTypeSelect('round_trip')}
              className="d-flex align-items-center gap-3 py-3 border-0"
            >
              <div className="bg-success bg-opacity-10 rounded-2 p-2">
                <i className="bi bi-arrow-left-right text-success fs-2"></i>
              </div>
              <div className="flex-grow-1">
                <h6 className="fw-bold mb-1">Round Trip</h6>
                <small className="text-secondary">Travel to {selectedTo} and return to {selectedFrom}</small>
              </div>
              <i className="bi bi-chevron-right text-secondary"></i>
            </ListGroup.Item>
          </ListGroup>
        </Modal.Body>
      </Modal>

      {/* Booking Confirmation Modal */}
      <Modal show={showBookingConfirmation} onHide={() => setShowBookingConfirmation(false)} centered>
        <Modal.Body className="text-center p-4">
          <div className="bg-success bg-opacity-10 rounded-circle d-inline-flex p-3 mb-3">
            <i className="bi bi-check-circle-fill text-success fs-1"></i>
          </div>
          <h4 className="fw-bold mb-2">Booking Confirmed!</h4>
          <p className="text-secondary mb-4">
            {numberOfMembers} members • {selectedFrom} → {selectedTo}
          </p>

          <Card className="bg-light border-0 mb-4">
            <Card.Body className="text-start">
              <div className="d-flex justify-content-between mb-2">
                <span className="text-secondary">Total Amount</span>
                <span className="fw-bold">₹{totalPrice.toFixed(0)}</span>
              </div>
              <div className="d-flex justify-content-between mb-2">
                <span className="text-secondary">Advance Paid</span>
                <span className="text-primary fw-bold">₹{advancePayment.toFixed(0)}</span>
              </div>
              {walletUsed > 0 && (
                <div className="d-flex justify-content-between mb-2">
                  <span className="text-secondary">Wallet Used</span>
                  <span className="text-success fw-bold">₹{walletUsed.toFixed(0)}</span>
                </div>
              )}
              <div className="d-flex justify-content-between">
                <span className="text-secondary">Cashback Earned</span>
                <span className="text-success fw-bold">₹{cashback.toFixed(0)}</span>
              </div>
            </Card.Body>
          </Card>

          <div className="d-flex gap-2">
            <Button variant="outline-secondary" className="flex-grow-1" onClick={() => setShowBookingConfirmation(false)}>
              Close
            </Button>
            <Button variant="success" className="flex-grow-1" onClick={handleBookingDone}>
              Done
            </Button>
          </div>
        </Modal.Body>
      </Modal>

      <style type="text/css">{`
        .nav-pills .nav-link {
          color: #6c757d;
          background: transparent;
        }
        .nav-pills .nav-link.active {
          background: linear-gradient(135deg, #667eea, #764ba2);
          color: white;
        }
        .floating-label {
          margin-bottom: 1rem;
        }
      `}</style>
    </Container>
  );
};

export default GroupingPage;
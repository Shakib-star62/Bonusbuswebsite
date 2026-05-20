// PassPage.jsx - Bootstrap Web Application Version
import React, { useState, useEffect } from 'react';
import { 
  Container, Row, Col, Card, Form, Button, Badge, 
  ListGroup, ProgressBar, InputGroup, Alert,
  Modal, Table
} from 'react-bootstrap';

const PassPage = () => {
  // State declarations
  const [selectedFrom, setSelectedFrom] = useState('');
  const [selectedTo, setSelectedTo] = useState('');
  const [selectedDuration, setSelectedDuration] = useState(30);
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const [totalPrice, setTotalPrice] = useState(0.0);
  const [walletBalance, setWalletBalance] = useState(2450.0);
  const [walletUsed, setWalletUsed] = useState(0.0);
  const [useWallet, setUseWallet] = useState(false);
  const [selectedPassType, setSelectedPassType] = useState(0);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [purchasedPass, setPurchasedPass] = useState(null);

  // All cities list
  const allCities = [
    'Visakhapatnam', 'Vijayawada', 'Guntur', 'Nellore', 'Kakinada',
    'Rajahmundry', 'Tirupati', 'Anantapur', 'Kurnool', 'Kadapa',
    'Ongole', 'Chittoor', 'Machilipatnam', 'Srikakulam', 'Vizianagaram',
    'Anakapalle', 'Bheemili', 'Narsipatnam', 'Tuni', 'Paderu',
    'Araku Valley', 'Sabbavaram', 'Eluru', 'Bhimavaram', 'Tadepalligudem',
    'Palakollu', 'Tanuku', 'Nidadavole', 'Amalapuram', 'Ramachandrapuram',
    'Mandapeta', 'Chilakaluripet', 'Tenali', 'Mangalagiri', 'Tadikonda',
    'Nuzvid', 'Gudivada'
  ];

  // Monthly pass types
  const passTypes = [
    {
      name: 'Standard Monthly Pass',
      description: 'Unlimited rides for a month',
      icon: 'bi-ticket-perforated',
      color: '#0d6efd',
      basePrice: 2499.0,
      dailyCost: 83.3,
      savings: 'Save up to 50% compared to daily tickets',
      benefits: [
        'Unlimited rides',
        'Priority boarding',
        'Free WiFi',
        'Mobile charging',
        'Dedicated support'
      ]
    },
    {
      name: 'Premium Monthly Pass',
      description: 'Premium unlimited rides for a month',
      icon: 'bi-gem',
      color: '#fd7e14',
      basePrice: 3499.0,
      dailyCost: 116.6,
      savings: 'Save up to 55% with premium benefits',
      benefits: [
        'All Standard benefits',
        'Extra discounts',
        'Premium seating',
        'Complimentary snacks',
        'Exclusive lounges'
      ]
    }
  ];

  // Calculate total price
  const calculateTotal = () => {
    const basePrice = passTypes[selectedPassType].basePrice;
    const multiplier = selectedDuration / 30.0;
    const total = Math.round(basePrice * multiplier * selectedQuantity);

    let walletUsedAmount = 0.0;
    if (useWallet) {
      walletUsedAmount = walletBalance >= total ? total : walletBalance;
    }

    setTotalPrice(total);
    setWalletUsed(walletUsedAmount);
  };

  useEffect(() => {
    calculateTotal();
  }, [selectedPassType, selectedDuration, selectedQuantity, useWallet, walletBalance]);

  const pass = passTypes[selectedPassType];
  const finalAmount = totalPrice - walletUsed;
  const walletAfter = walletBalance - walletUsed;

  const handleQuantityChange = (increment) => {
    const newQuantity = selectedQuantity + increment;
    if (newQuantity >= 1) {
      setSelectedQuantity(newQuantity);
    }
  };

  const calculateValidUntil = () => {
    const validUntil = new Date();
    validUntil.setDate(validUntil.getDate() + selectedDuration);
    return validUntil.toLocaleDateString('en-IN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const processPassPurchase = () => {
    const passData = {
      id: `PASS${Date.now()}`,
      type: pass.name,
      route: `${selectedFrom} → ${selectedTo}`,
      duration: selectedDuration,
      quantity: selectedQuantity,
      totalAmount: totalPrice,
      walletUsed: walletUsed,
      finalAmount: finalAmount,
      purchaseDate: new Date().toLocaleDateString('en-IN'),
      validUntil: calculateValidUntil(),
      status: 'Active'
    };

    setWalletBalance(walletAfter);
    setPurchasedPass(passData);
    setShowSuccessModal(true);

    // Reset form
    setSelectedFrom('');
    setSelectedTo('');
    setSelectedDuration(30);
    setSelectedQuantity(1);
    setUseWallet(false);

    return passData;
  };

  const formatCurrency = (amount) => {
    return `₹${amount.toFixed(0)}`;
  };

  const handleBuyPass = () => {
    if (!selectedFrom || !selectedTo) {
      alert('Please select both starting point and destination');
      return;
    }
    processPassPurchase();
  };

  return (
    <Container fluid className="bg-light min-vh-100 py-4">
      {/* Header Card */}
      <Card className="border-0 shadow-lg mb-4 overflow-hidden">
        <div 
          className="p-4 text-white"
          style={{ background: `linear-gradient(135deg, ${pass.color}, ${pass.color}dd)` }}
        >
          <Row className="align-items-center">
            <Col xs={8}>
              <div className="d-flex align-items-center gap-3 mb-3">
                <i className={`${pass.icon} fs-1`}></i>
                <div>
                  <h2 className="h3 mb-1">{pass.name}</h2>
                  <p className="mb-0 opacity-75">{pass.description}</p>
                </div>
              </div>
              <Badge bg="light" text="dark" className="px-3 py-2">
                <i className="bi bi-percent me-2"></i>
                {pass.savings}
              </Badge>
            </Col>
            <Col xs={4} className="text-end">
              <div className="display-6 fw-bold">{formatCurrency(pass.basePrice)}</div>
              <small className="opacity-75">per month</small>
            </Col>
          </Row>
        </div>
      </Card>

      {/* Pass Type Selection */}
      <Card className="border-0 shadow-sm mb-4">
        <Card.Header className="bg-white py-3">
          <h5 className="mb-0 text-primary">Select Pass Type</h5>
        </Card.Header>
        <Card.Body>
          <Row xs={1} md={2} className="g-3">
            {passTypes.map((type, index) => (
              <Col key={index}>
                <Card 
                  className={`h-100 border-2 cursor-pointer ${selectedPassType === index ? 'border-primary' : ''}`}
                  style={{ 
                    borderColor: selectedPassType === index ? type.color : '#dee2e6',
                    backgroundColor: selectedPassType === index ? `${type.color}10` : '#fff',
                    cursor: 'pointer'
                  }}
                  onClick={() => setSelectedPassType(index)}
                >
                  <Card.Body className="text-center">
                    <i className={`${type.icon} fs-1 mb-2`} style={{ color: type.color }}></i>
                    <h6 className="fw-bold" style={{ color: type.color }}>
                      {type.name.split(' ')[0]}
                    </h6>
                    <div className="h4 fw-bold mb-0" style={{ color: type.color }}>
                      {formatCurrency(type.basePrice)}
                    </div>
                    <small className="text-secondary">per month</small>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Card.Body>
      </Card>

      {/* Route Selection */}
      <Card className="border-0 shadow-sm mb-4">
        <Card.Header className="bg-white py-3">
          <h5 className="mb-0 text-primary">Select Your Route</h5>
          <small className="text-secondary">Choose your starting and destination points</small>
        </Card.Header>
        <Card.Body>
          <Row className="g-3">
            <Col md={6}>
              <Form.Group>
                <Form.Label className="fw-medium">
                  <i className="bi bi-geo-alt-fill text-primary me-1"></i>
                  Starting Point
                </Form.Label>
                <Form.Select 
                  value={selectedFrom}
                  onChange={(e) => {
                    setSelectedFrom(e.target.value);
                    if (selectedTo === e.target.value) {
                      setSelectedTo('');
                    }
                  }}
                >
                  <option value="">Select Starting Point</option>
                  {allCities.map(city => (
                    <option key={city} value={city}>{city}</option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group>
                <Form.Label className="fw-medium">
                  <i className="bi bi-geo-alt-fill text-success me-1"></i>
                  Destination Point
                </Form.Label>
                <Form.Select 
                  value={selectedTo}
                  onChange={(e) => setSelectedTo(e.target.value)}
                >
                  <option value="">Select Destination Point</option>
                  {allCities
                    .filter(city => city !== selectedFrom)
                    .map(city => (
                      <option key={city} value={city}>{city}</option>
                    ))}
                  </Form.Select>
              </Form.Group>
            </Col>
          </Row>

          {/* Selected Route Display */}
          {selectedFrom && selectedTo && (
            <div className="mt-4 p-3 bg-success bg-opacity-10 rounded-3">
              <div className="d-flex align-items-center justify-content-between flex-wrap">
                <div className="text-center mb-2 mb-sm-0">
                  <div className="bg-primary rounded-2 p-2 d-inline-block mb-1">
                    <i className="bi bi-geo-alt-fill text-white"></i>
                  </div>
                  <div className="fw-bold small">{selectedFrom}</div>
                </div>
                
                <div className="flex-grow-1 mx-3 text-center">
                  <i className="bi bi-arrow-right text-secondary d-block d-sm-inline"></i>
                  <hr className="my-1" />
                  <Badge bg="success" pill>Monthly Pass</Badge>
                </div>
                
                <div className="text-center">
                  <div className="bg-success rounded-2 p-2 d-inline-block mb-1">
                    <i className="bi bi-geo-alt-fill text-white"></i>
                  </div>
                  <div className="fw-bold small">{selectedTo}</div>
                </div>
              </div>
            </div>
          )}
        </Card.Body>
      </Card>

      {/* Customize Pass */}
      <Card className="border-0 shadow-sm mb-4">
        <Card.Header className="bg-white py-3">
          <h5 className="mb-0 text-primary">Customize Your Pass</h5>
        </Card.Header>
        <Card.Body>
          {/* Duration Slider */}
          <div className="mb-4">
            <div className="d-flex justify-content-between align-items-center mb-2">
              <h6 className="mb-0">Duration (Days)</h6>
              <Badge 
                bg="primary" 
                className="px-3 py-2"
                style={{ backgroundColor: pass.color }}
              >
                {selectedDuration} days
              </Badge>
            </div>
            
            <Form.Range
              min="30"
              max="180"
              value={selectedDuration}
              onChange={(e) => setSelectedDuration(parseInt(e.target.value))}
              style={{
                background: `linear-gradient(90deg, ${pass.color} 0%, ${pass.color} ${(selectedDuration - 30) / 150 * 100}%, #e9ecef ${(selectedDuration - 30) / 150 * 100}%)`
              }}
            />
            
            <div className="d-flex justify-content-between mt-1">
              <small className="text-secondary">30 days</small>
              <small className="text-secondary">180 days</small>
            </div>
          </div>

          {/* Quantity Selector */}
          <div>
            <h6 className="mb-2">Number of Passes</h6>
            <div className="d-flex align-items-center justify-content-center gap-3">
              <Button
                variant="primary"
                onClick={() => handleQuantityChange(-1)}
                disabled={selectedQuantity <= 1}
                style={{ backgroundColor: pass.color, borderColor: pass.color }}
                className="rounded-circle d-flex align-items-center justify-content-center"
              >
                <i className="bi bi-dash"></i>
              </Button>
              
              <div 
                className="h2 fw-bold mb-0 px-4 py-2 rounded-3"
                style={{ backgroundColor: `${pass.color}10`, color: pass.color }}
              >
                {selectedQuantity}
              </div>
              
              <Button
                variant="primary"
                onClick={() => handleQuantityChange(1)}
                style={{ backgroundColor: pass.color, borderColor: pass.color }}
                className="rounded-circle d-flex align-items-center justify-content-center"
              >
                <i className="bi bi-plus"></i>
              </Button>
            </div>
          </div>
        </Card.Body>
      </Card>

      {/* Payment Section */}
      <Card className="border-0 shadow-sm mb-4">
        <Card.Header className="bg-white py-3">
          <div className="d-flex align-items-center gap-2">
            <i className="bi bi-wallet2 text-success"></i>
            <h5 className="mb-0 text-primary">Payment Method</h5>
          </div>
        </Card.Header>
        <Card.Body>
          {/* Wallet Balance */}
          <div className="bg-success bg-opacity-10 rounded-3 p-3 mb-3">
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <div className="fw-bold">Wallet Balance</div>
                <small className="text-secondary">Available for payment</small>
              </div>
              <span className="h4 text-success mb-0">{formatCurrency(walletBalance)}</span>
            </div>
          </div>

          {/* Use Wallet Option */}
          <Form.Group className="mb-3">
            <div className="d-flex align-items-center gap-3 p-3 bg-light rounded-3">
              <Form.Check 
                type="checkbox"
                id="useWallet"
                checked={useWallet}
                onChange={(e) => setUseWallet(e.target.checked)}
              />
              <div>
                <div className="fw-bold">Use wallet balance</div>
                <small className="text-secondary">Pay from your available wallet balance</small>
              </div>
            </div>
          </Form.Group>

          {/* Payment Breakdown */}
          {useWallet && (
            <div className="bg-primary bg-opacity-10 rounded-3 p-3">
              <Table borderless size="sm" className="mb-0">
                <tbody>
                  <tr>
                    <td className="text-secondary">Total Amount:</td>
                    <td className="text-end fw-bold">{formatCurrency(totalPrice)}</td>
                  </tr>
                  <tr>
                    <td className="text-secondary">Wallet Used:</td>
                    <td className="text-end text-success fw-bold">-{formatCurrency(walletUsed)}</td>
                  </tr>
                  <tr>
                    <td className="text-secondary">Remaining Wallet:</td>
                    <td className="text-end fw-bold">{formatCurrency(walletAfter)}</td>
                  </tr>
                </tbody>
              </Table>
              <hr className="my-2" />
              <div className="d-flex justify-content-between align-items-center">
                <span className="fw-bold">Amount to Pay:</span>
                <span className="h4 text-primary mb-0">{formatCurrency(finalAmount)}</span>
              </div>
            </div>
          )}
        </Card.Body>
      </Card>

      {/* Pass Benefits */}
      <Card className="border-0 shadow-sm mb-4">
        <Card.Header className="bg-white py-3">
          <div className="d-flex align-items-center gap-2">
            <i className="bi bi-star text-warning"></i>
            <h5 className="mb-0 text-primary">Pass Benefits</h5>
          </div>
        </Card.Header>
        <Card.Body>
          <ListGroup variant="flush">
            {pass.benefits.map((benefit, index) => (
              <ListGroup.Item key={index} className="bg-transparent px-0">
                <div className="d-flex align-items-center gap-3">
                  <div 
                    className="rounded-2 p-1"
                    style={{ backgroundColor: `${pass.color}20` }}
                  >
                    <i className="bi bi-check-circle-fill" style={{ color: pass.color }}></i>
                  </div>
                  <span>{benefit}</span>
                </div>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Card.Body>
      </Card>

      {/* Buy Button */}
      <Button
        variant="primary"
        size="lg"
        className="w-100 fw-bold py-3 shadow"
        onClick={handleBuyPass}
        disabled={!selectedFrom || !selectedTo}
        style={{ backgroundColor: pass.color, borderColor: pass.color }}
      >
        <i className="bi bi-cart3 me-2"></i>
        BUY MONTHLY PASS - {formatCurrency(finalAmount)}
      </Button>

      {/* Success Modal */}
      <Modal show={showSuccessModal} onHide={() => setShowSuccessModal(false)} centered>
        <Modal.Header closeButton className="border-0 pb-0">
          <Modal.Title className="text-success w-100 text-center">
            <i className="bi bi-check-circle-fill fs-1 d-block mb-2"></i>
            Purchase Successful!
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center">
          {purchasedPass && (
            <>
              <p className="mb-3">Your monthly pass has been purchased successfully.</p>
              <div className="bg-light p-3 rounded-3 text-start">
                <p className="small text-secondary mb-1">Pass ID:</p>
                <p className="fw-bold mb-2">{purchasedPass.id}</p>
                
                <p className="small text-secondary mb-1">Route:</p>
                <p className="mb-2">{purchasedPass.route}</p>
                
                <p className="small text-secondary mb-1">Valid Until:</p>
                <p className="mb-2">{purchasedPass.validUntil}</p>
                
                <hr className="my-2" />
                
                <div className="d-flex justify-content-between">
                  <span>Amount Paid:</span>
                  <span className="fw-bold text-success">{formatCurrency(purchasedPass.finalAmount)}</span>
                </div>
              </div>
            </>
          )}
        </Modal.Body>
        <Modal.Footer className="border-0 pt-0">
          <Button variant="success" className="w-100" onClick={() => setShowSuccessModal(false)}>
            Great!
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default PassPage;
// pages/OffersPage.jsx
import React, { useState } from 'react';
import { Container, Row, Col, Card, Button, Badge, Modal, Form, InputGroup } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const OffersPage = () => {
  const navigate = useNavigate();
  const [showCouponModal, setShowCouponModal] = useState(false);
  const [selectedOffer, setSelectedOffer] = useState(null);
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState(null);

  const offers = [
    {
      id: 1,
      title: 'FIRST50',
      description: '50% off on your first booking',
      code: 'FIRST50',
      discount: '50%',
      maxDiscount: '₹200',
      validTill: '31 Mar 2024',
      minBooking: '₹500',
      image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400',
      bgColor: 'linear-gradient(135deg, #667eea, #764ba2)',
      terms: ['Valid for new users only', 'Maximum discount ₹200', 'Valid on all routes']
    },
    {
      id: 2,
      title: 'WEEKEND30',
      description: '30% off on weekend travel',
      code: 'WEEKEND30',
      discount: '30%',
      maxDiscount: '₹150',
      validTill: '31 Mar 2024',
      minBooking: '₹300',
      image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400',
      bgColor: 'linear-gradient(135deg, #f093fb, #f5576c)',
      terms: ['Valid on Fri-Sun travel', 'Maximum discount ₹150', 'Minimum booking ₹300']
    },
    {
      id: 3,
      title: 'GROUP10',
      description: '10% off on group bookings',
      code: 'GROUP10',
      discount: '10%',
      maxDiscount: '₹500',
      validTill: '31 Mar 2024',
      minBooking: '₹1000',
      image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400',
      bgColor: 'linear-gradient(135deg, #4facfe, #00f2fe)',
      terms: ['Valid for 5+ passengers', 'Maximum discount ₹500', 'Valid on all routes']
    },
    {
      id: 4,
      title: 'STUDENT15',
      description: '15% off for students',
      code: 'STUDENT15',
      discount: '15%',
      maxDiscount: '₹300',
      validTill: '31 Mar 2024',
      minBooking: '₹400',
      image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400',
      bgColor: 'linear-gradient(135deg, #43e97b, #38f9d7)',
      terms: ['Valid with valid student ID', 'Maximum discount ₹300', 'Valid on all routes']
    },
    {
      id: 5,
      title: 'SENIOR20',
      description: '20% off for senior citizens',
      code: 'SENIOR20',
      discount: '20%',
      maxDiscount: '₹250',
      validTill: '31 Mar 2024',
      minBooking: '₹400',
      image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400',
      bgColor: 'linear-gradient(135deg, #fa709a, #fee140)',
      terms: ['Valid for 60+ years', 'Maximum discount ₹250', 'Valid on all routes']
    },
    {
      id: 6,
      title: 'FREERIDE',
      description: 'Free ride on birthday month',
      code: 'BDAY',
      discount: '100%',
      maxDiscount: '₹850',
      validTill: '31 Dec 2024',
      minBooking: '₹0',
      image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400',
      bgColor: 'linear-gradient(135deg, #a8edea, #fed6e3)',
      terms: ['Valid in birthday month', 'One free ride up to ₹850', 'Valid on all routes']
    }
  ];

  const bankOffers = [
    {
      bank: 'HDFC Bank',
      offer: '10% instant discount',
      code: 'HDFC10',
      validTill: '31 Mar 2024',
      image: 'https://logo.clearbit.com/hdfcbank.com'
    },
    {
      bank: 'ICICI Bank',
      offer: '₹100 off on ₹500',
      code: 'ICICI100',
      validTill: '31 Mar 2024',
      image: 'https://logo.clearbit.com/icicibank.com'
    },
    {
      bank: 'SBI',
      offer: '5% cashback',
      code: 'SBICASH',
      validTill: '31 Mar 2024',
      image: 'https://logo.clearbit.com/sbi.co.in'
    },
    {
      bank: 'Paytm',
      offer: '₹50 off on UPI',
      code: 'PAYTM50',
      validTill: '31 Mar 2024',
      image: 'https://logo.clearbit.com/paytm.com'
    }
  ];

  const handleApplyOffer = (offer) => {
    setSelectedOffer(offer);
    setShowCouponModal(true);
  };

  const handleCouponApply = () => {
    setAppliedCoupon(selectedOffer.code);
    setShowCouponModal(false);
    alert(`Coupon ${selectedOffer.code} applied successfully!`);
  };

  const copyToClipboard = (code) => {
    navigator.clipboard.writeText(code);
    alert(`Coupon code ${code} copied!`);
  };

  return (
    <Container fluid className="px-4 py-4" style={{ background: '#f8f9fa' }}>
      {/* Header */}
      <div className="d-flex align-items-center justify-content-between mb-4">
        <h4 className="fw-bold mb-0">Offers & Coupons</h4>
        <Badge bg="danger" className="px-3 py-2">{offers.length} Active</Badge>
      </div>

      {/* Applied Coupon */}
      {appliedCoupon && (
        <Card className="border-0 shadow-sm mb-4 bg-success text-white">
          <Card.Body className="d-flex align-items-center justify-content-between">
            <div>
              <i className="bi bi-check-circle-fill me-2"></i>
              Coupon {appliedCoupon} applied!
            </div>
            <Button 
              variant="light" 
              size="sm" 
              onClick={() => setAppliedCoupon(null)}
            >
              Remove
            </Button>
          </Card.Body>
        </Card>
      )}

      {/* Special Offers */}
      <h5 className="fw-bold mb-3">Special Deals</h5>
      <Row className="g-3 mb-4">
        {offers.map((offer) => (
          <Col key={offer.id} md={6} lg={4}>
            <Card className="border-0 shadow-sm h-100 overflow-hidden">
              <div 
                className="p-4 text-white"
                style={{ background: offer.bgColor }}
              >
                <div className="d-flex justify-content-between align-items-start mb-3">
                  <div>
                    <h5 className="fw-bold mb-1">{offer.title}</h5>
                    <p className="small opacity-75 mb-0">{offer.description}</p>
                  </div>
                  <Badge bg="light" text="dark" className="px-3 py-2">
                    {offer.discount} OFF
                  </Badge>
                </div>
                <div className="d-flex gap-3">
                  <div>
                    <small className="opacity-75">Code</small>
                    <div className="fw-bold">{offer.code}</div>
                  </div>
                  <div>
                    <small className="opacity-75">Valid Till</small>
                    <div className="fw-bold">{offer.validTill}</div>
                  </div>
                </div>
              </div>
              <Card.Body>
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <span className="text-secondary">Min. Booking</span>
                  <span className="fw-bold">{offer.minBooking}</span>
                </div>
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <span className="text-secondary">Max Discount</span>
                  <span className="fw-bold text-success">{offer.maxDiscount}</span>
                </div>
                <div className="d-flex gap-2">
                  <Button 
                    variant="outline-primary" 
                    className="flex-grow-1"
                    onClick={() => copyToClipboard(offer.code)}
                  >
                    <i className="bi bi-files me-2"></i>
                    Copy Code
                  </Button>
                  <Button 
                    variant="primary" 
                    className="flex-grow-1"
                    onClick={() => handleApplyOffer(offer)}
                  >
                    Apply
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Bank Offers */}
      <h5 className="fw-bold mb-3">Bank Offers</h5>
      <Row className="g-3 mb-4">
        {bankOffers.map((offer, index) => (
          <Col key={index} md={6}>
            <Card className="border-0 shadow-sm">
              <Card.Body>
                <Row className="align-items-center">
                  <Col xs="auto">
                    <img 
                      src={offer.image} 
                      alt={offer.bank}
                      className="rounded-3"
                      style={{ width: '50px', height: '50px', objectFit: 'contain' }}
                    />
                  </Col>
                  <Col>
                    <h6 className="fw-bold mb-1">{offer.bank}</h6>
                    <p className="small text-secondary mb-0">{offer.offer}</p>
                    <small className="text-success">Code: {offer.code}</small>
                  </Col>
                  <Col xs="auto">
                    <Button 
                      variant="outline-primary" 
                      size="sm"
                      onClick={() => copyToClipboard(offer.code)}
                    >
                      <i className="bi bi-files"></i>
                    </Button>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Referral Program */}
      <Card className="border-0 shadow-sm mb-4 bg-primary text-white">
        <Card.Body className="p-4">
          <Row className="align-items-center">
            <Col md={8}>
              <h5 className="fw-bold mb-2">Refer & Earn</h5>
              <p className="opacity-75 mb-3">Invite your friends and earn ₹100 each</p>
              <div className="d-flex gap-2">
                <InputGroup>
                  <Form.Control 
                    value="https://bonusbus.com/ref/12345" 
                    readOnly 
                    className="bg-white bg-opacity-25 text-white border-0"
                  />
                  <Button 
                    variant="light" 
                    onClick={() => {
                      navigator.clipboard.writeText('https://bonusbus.com/ref/12345');
                      alert('Referral link copied!');
                    }}
                  >
                    <i className="bi bi-files"></i>
                  </Button>
                </InputGroup>
              </div>
            </Col>
            <Col md={4} className="text-center mt-3 mt-md-0">
              <div className="bg-white bg-opacity-25 rounded-circle d-inline-flex p-4">
                <i className="bi bi-gift text-white fs-1"></i>
              </div>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      {/* Terms Modal */}
      <Modal show={showCouponModal} onHide={() => setShowCouponModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title className="fw-bold">Apply Coupon</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedOffer && (
            <>
              <div 
                className="p-4 text-white rounded-3 mb-4"
                style={{ background: selectedOffer.bgColor }}
              >
                <h5 className="fw-bold mb-2">{selectedOffer.title}</h5>
                <p className="small opacity-75 mb-3">{selectedOffer.description}</p>
                <div className="d-flex gap-3">
                  <Badge bg="light" text="dark" className="px-3 py-2">
                    {selectedOffer.discount} OFF
                  </Badge>
                  <Badge bg="light" text="dark" className="px-3 py-2">
                    Code: {selectedOffer.code}
                  </Badge>
                </div>
              </div>

              <h6 className="fw-bold mb-3">Terms & Conditions</h6>
              <ul className="list-unstyled">
                {selectedOffer.terms.map((term, idx) => (
                  <li key={idx} className="mb-2">
                    <i className="bi bi-check-circle-fill text-success me-2"></i>
                    {term}
                  </li>
                ))}
              </ul>

              <div className="d-flex gap-3 mt-4">
                <Button variant="outline-secondary" className="flex-grow-1" onClick={() => setShowCouponModal(false)}>
                  Cancel
                </Button>
                <Button variant="primary" className="flex-grow-1" onClick={handleCouponApply}>
                  Apply Coupon
                </Button>
              </div>
            </>
          )}
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default OffersPage;
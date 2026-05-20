// src/pages/PaymentPage.jsx
import React, { useState } from 'react';
import { Container, Row, Col, Card, Button, Form, InputGroup, Badge, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const PaymentPage = () => {
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState('upi');
  const [couponCode, setCouponCode] = useState('');
  const [couponApplied, setCouponApplied] = useState(false);
  const [savedCards] = useState([
    { id: 1, last4: '4242', brand: 'Visa', expiry: '12/25' },
    { id: 2, last4: '1234', brand: 'Mastercard', expiry: '09/24' }
  ]);

  const bookingDetails = {
    id: 'EV20240120345',
    busName: 'GreenLine EV',
    route: 'Visakhapatnam → Vijayawada',
    date: '20 Jan 2024',
    time: '06:00 AM',
    seats: ['2A', '2B'],
    baseFare: 1700,
    gst: 85,
    total: 1785
  };

  const [paymentData, setPaymentData] = useState({
    upiId: 'user@okhdfcbank',
    cardNumber: '',
    cardName: '',
    cardExpiry: '',
    cardCvv: '',
    netBanking: ''
  });

  const handleApplyCoupon = () => {
    if (couponCode === 'FIRST50') {
      setCouponApplied(true);
      alert('Coupon applied successfully!');
    } else {
      alert('Invalid coupon code');
    }
  };

  const handlePayment = () => {
    alert('Payment successful! Booking confirmed.');
    navigate('/bookings');
  };

  return (
    <Container fluid className="px-4 py-4" style={{ background: '#f8f9fa' }}>
      {/* Header */}
      <div className="d-flex align-items-center gap-3 mb-4">
        <Button variant="link" className="p-0" onClick={() => navigate(-1)}>
          <i className="bi bi-arrow-left fs-4 text-primary"></i>
        </Button>
        <h4 className="fw-bold mb-0">Payment</h4>
      </div>

      <Row>
        <Col lg={8}>
          {/* Payment Methods */}
          <Card className="border-0 shadow-sm mb-4">
            <Card.Header className="bg-white">
              <h5 className="fw-bold mb-0">Select Payment Method</h5>
            </Card.Header>
            <Card.Body>
              {/* UPI Option */}
              <div className={`p-3 rounded-3 mb-3 ${paymentMethod === 'upi' ? 'border border-primary bg-primary bg-opacity-10' : 'border'}`}>
                <Form.Check
                  type="radio"
                  id="upi"
                  name="paymentMethod"
                  label={
                    <div className="d-flex align-items-center gap-3">
                      <i className="bi bi-phone fs-3 text-primary"></i>
                      <div>
                        <h6 className="fw-bold mb-0">UPI</h6>
                        <small className="text-secondary">Google Pay, PhonePe, Paytm</small>
                      </div>
                    </div>
                  }
                  checked={paymentMethod === 'upi'}
                  onChange={() => setPaymentMethod('upi')}
                  className="mb-0"
                />
                {paymentMethod === 'upi' && (
                  <div className="mt-3">
                    <Form.Group>
                      <Form.Label>Enter UPI ID</Form.Label>
                      <InputGroup>
                        <Form.Control
                          type="text"
                          placeholder="username@bank"
                          value={paymentData.upiId}
                          onChange={(e) => setPaymentData({...paymentData, upiId: e.target.value})}
                        />
                        <Button variant="outline-primary">Verify</Button>
                      </InputGroup>
                    </Form.Group>
                    <div className="text-center mt-3">
                      <img 
                        src="https://upload.wikimedia.org/wikipedia/commons/e/e1/UPI_Logo.svg" 
                        alt="UPI"
                        style={{ height: '30px' }}
                        className="me-2"
                      />
                      <span className="text-secondary mx-2">or</span>
                      <Button variant="link" className="p-0">
                        Scan QR Code
                      </Button>
                    </div>
                  </div>
                )}
              </div>

              {/* Card Option */}
              <div className={`p-3 rounded-3 mb-3 ${paymentMethod === 'card' ? 'border border-primary bg-primary bg-opacity-10' : 'border'}`}>
                <Form.Check
                  type="radio"
                  id="card"
                  name="paymentMethod"
                  label={
                    <div className="d-flex align-items-center gap-3">
                      <i className="bi bi-credit-card fs-3 text-primary"></i>
                      <div>
                        <h6 className="fw-bold mb-0">Credit/Debit Card</h6>
                        <small className="text-secondary">Visa, Mastercard, RuPay</small>
                      </div>
                    </div>
                  }
                  checked={paymentMethod === 'card'}
                  onChange={() => setPaymentMethod('card')}
                  className="mb-0"
                />
                {paymentMethod === 'card' && (
                  <div className="mt-3">
                    {/* Saved Cards */}
                    {savedCards.length > 0 && (
                      <div className="mb-3">
                        <label className="fw-medium mb-2">Saved Cards</label>
                        {savedCards.map(card => (
                          <div key={card.id} className="d-flex align-items-center justify-content-between p-2 bg-light rounded-3 mb-2">
                            <div className="d-flex align-items-center gap-2">
                              <i className={`bi bi-${card.brand === 'Visa' ? 'credit-card' : 'credit-card-2-front'}`}></i>
                              <span>•••• {card.last4}</span>
                              <small className="text-secondary">{card.expiry}</small>
                            </div>
                            <Form.Check type="radio" name="savedCard" />
                          </div>
                        ))}
                      </div>
                    )}

                    {/* New Card */}
                    <Form.Group className="mb-2">
                      <Form.Label>Card Number</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="1234 5678 9012 3456"
                        value={paymentData.cardNumber}
                        onChange={(e) => setPaymentData({...paymentData, cardNumber: e.target.value})}
                      />
                    </Form.Group>
                    <Row>
                      <Col>
                        <Form.Group>
                          <Form.Label>Expiry</Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="MM/YY"
                            value={paymentData.cardExpiry}
                            onChange={(e) => setPaymentData({...paymentData, cardExpiry: e.target.value})}
                          />
                        </Form.Group>
                      </Col>
                      <Col>
                        <Form.Group>
                          <Form.Label>CVV</Form.Label>
                          <Form.Control
                            type="password"
                            placeholder="123"
                            maxLength="3"
                            value={paymentData.cardCvv}
                            onChange={(e) => setPaymentData({...paymentData, cardCvv: e.target.value})}
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                    <Form.Group className="mt-2">
                      <Form.Label>Name on Card</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="John Doe"
                        value={paymentData.cardName}
                        onChange={(e) => setPaymentData({...paymentData, cardName: e.target.value})}
                      />
                    </Form.Group>
                  </div>
                )}
              </div>

              {/* Net Banking */}
              <div className={`p-3 rounded-3 mb-3 ${paymentMethod === 'netbanking' ? 'border border-primary bg-primary bg-opacity-10' : 'border'}`}>
                <Form.Check
                  type="radio"
                  id="netbanking"
                  name="paymentMethod"
                  label={
                    <div className="d-flex align-items-center gap-3">
                      <i className="bi bi-bank fs-3 text-primary"></i>
                      <div>
                        <h6 className="fw-bold mb-0">Net Banking</h6>
                        <small className="text-secondary">All major banks</small>
                      </div>
                    </div>
                  }
                  checked={paymentMethod === 'netbanking'}
                  onChange={() => setPaymentMethod('netbanking')}
                  className="mb-0"
                />
                {paymentMethod === 'netbanking' && (
                  <div className="mt-3">
                    <Form.Select>
                      <option>Select your bank</option>
                      <option>SBI</option>
                      <option>HDFC Bank</option>
                      <option>ICICI Bank</option>
                      <option>Axis Bank</option>
                      <option>Kotak Mahindra</option>
                    </Form.Select>
                  </div>
                )}
              </div>

              {/* Wallet */}
              <div className={`p-3 rounded-3 ${paymentMethod === 'wallet' ? 'border border-primary bg-primary bg-opacity-10' : 'border'}`}>
                <Form.Check
                  type="radio"
                  id="wallet"
                  name="paymentMethod"
                  label={
                    <div className="d-flex align-items-center gap-3">
                      <i className="bi bi-wallet2 fs-3 text-primary"></i>
                      <div>
                        <h6 className="fw-bold mb-0">Wallet</h6>
                        <small className="text-secondary">Balance: ₹2,450.75</small>
                      </div>
                    </div>
                  }
                  checked={paymentMethod === 'wallet'}
                  onChange={() => setPaymentMethod('wallet')}
                  className="mb-0"
                />
              </div>
            </Card.Body>
          </Card>
        </Col>

        <Col lg={4}>
          {/* Price Summary */}
          <Card className="border-0 shadow-sm mb-4">
            <Card.Header className="bg-white">
              <h5 className="fw-bold mb-0">Price Summary</h5>
            </Card.Header>
            <Card.Body>
              <div className="mb-3">
                <div className="d-flex justify-content-between mb-2">
                  <span className="text-secondary">Base Fare</span>
                  <span>₹{bookingDetails.baseFare}</span>
                </div>
                <div className="d-flex justify-content-between mb-2">
                  <span className="text-secondary">GST (5%)</span>
                  <span>₹{bookingDetails.gst}</span>
                </div>
                {couponApplied && (
                  <div className="d-flex justify-content-between mb-2 text-success">
                    <span>Coupon Discount</span>
                    <span>-₹170</span>
                  </div>
                )}
                <hr />
                <div className="d-flex justify-content-between fw-bold">
                  <span>Total</span>
                  <span className="text-primary fs-5">
                    ₹{couponApplied ? bookingDetails.total - 170 : bookingDetails.total}
                  </span>
                </div>
              </div>

              {/* Coupon */}
              <Form.Group className="mb-3">
                <Form.Label>Have a coupon?</Form.Label>
                <InputGroup>
                  <Form.Control
                    type="text"
                    placeholder="Enter coupon code"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    disabled={couponApplied}
                  />
                  <Button 
                    variant="outline-primary" 
                    onClick={handleApplyCoupon}
                    disabled={couponApplied}
                  >
                    Apply
                  </Button>
                </InputGroup>
              </Form.Group>

              {/* Secure Payment */}
              <Alert variant="info" className="mb-3">
                <i className="bi bi-shield-check me-2"></i>
                Your payment is secure and encrypted
              </Alert>

              {/* Pay Button */}
              <Button 
                variant="success" 
                size="lg" 
                className="w-100 mb-3"
                onClick={handlePayment}
              >
                Pay ₹{couponApplied ? bookingDetails.total - 170 : bookingDetails.total}
              </Button>

              {/* Accepted Cards */}
              <div className="text-center">
                <small className="text-secondary">We accept</small>
                <div className="d-flex justify-content-center gap-2 mt-2">
                  <i className="bi bi-credit-card fs-3 text-secondary"></i>
                  <i className="bi bi-credit-card-2-front fs-3 text-secondary"></i>
                  <i className="bi bi-bank fs-3 text-secondary"></i>
                  <i className="bi bi-phone fs-3 text-secondary"></i>
                </div>
              </div>
            </Card.Body>
          </Card>

          {/* Booking Summary */}
          <Card className="border-0 shadow-sm">
            <Card.Body>
              <h6 className="fw-bold mb-3">Booking Summary</h6>
              <div className="d-flex justify-content-between mb-2">
                <span className="text-secondary">Bus</span>
                <span className="fw-medium">{bookingDetails.busName}</span>
              </div>
              <div className="d-flex justify-content-between mb-2">
                <span className="text-secondary">Route</span>
                <span className="fw-medium">{bookingDetails.route}</span>
              </div>
              <div className="d-flex justify-content-between mb-2">
                <span className="text-secondary">Date</span>
                <span className="fw-medium">{bookingDetails.date}</span>
              </div>
              <div className="d-flex justify-content-between mb-2">
                <span className="text-secondary">Time</span>
                <span className="fw-medium">{bookingDetails.time}</span>
              </div>
              <div className="d-flex justify-content-between">
                <span className="text-secondary">Seats</span>
                <span className="fw-medium">{bookingDetails.seats.join(', ')}</span>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default PaymentPage;
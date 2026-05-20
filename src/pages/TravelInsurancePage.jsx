// src/pages/TravelInsurancePage.jsx
import React, { useState } from 'react';
import { Container, Row, Col, Card, Button, Form, Badge, ListGroup, Modal } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const TravelInsurancePage = () => {
  const navigate = useNavigate();
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [passengers] = useState([
    { name: 'Shakib Ahmed', age: 28 },
    { name: 'Rahul Sharma', age: 32 }
  ]);

  const insurancePlans = [
    {
      id: 1,
      name: 'Basic Cover',
      price: 99,
      coverage: 50000,
      icon: 'bi-shield',
      features: [
        'Accidental death cover',
        'Medical expenses up to ₹10,000',
        'Trip cancellation',
        '24/7 assistance'
      ]
    },
    {
      id: 2,
      name: 'Standard Cover',
      price: 199,
      coverage: 100000,
      icon: 'bi-shield-check',
      popular: true,
      features: [
        'Accidental death cover',
        'Medical expenses up to ₹25,000',
        'Trip cancellation',
        'Baggage loss',
        'Flight delay cover',
        '24/7 assistance'
      ]
    },
    {
      id: 3,
      name: 'Premium Cover',
      price: 299,
      coverage: 200000,
      icon: 'bi-shield-fill',
      features: [
        'Accidental death cover',
        'Medical expenses up to ₹50,000',
        'Trip cancellation',
        'Baggage loss',
        'Flight delay cover',
        'COVID-19 coverage',
        'Personal liability',
        '24/7 concierge'
      ]
    }
  ];

  const handleSelectPlan = (plan) => {
    setSelectedPlan(plan);
    setShowModal(true);
  };

  const handleBuyInsurance = () => {
    setShowModal(false);
    alert(`Insurance purchased successfully! Policy will be sent to your email.`);
    navigate(-1);
  };

  return (
    <Container fluid className="px-4 py-4" style={{ background: '#f8f9fa' }}>
      {/* Header */}
      <div className="d-flex align-items-center gap-3 mb-4">
        <Button variant="link" className="p-0" onClick={() => navigate(-1)}>
          <i className="bi bi-arrow-left fs-4 text-primary"></i>
        </Button>
        <div>
          <h4 className="fw-bold mb-1">Travel Insurance</h4>
          <p className="text-secondary mb-0">Protect your journey starting at just ₹99</p>
        </div>
      </div>

      {/* Why Insure */}
      <Card className="border-0 shadow-sm mb-4">
        <Card.Body>
          <h6 className="fw-bold mb-3">Why buy travel insurance?</h6>
          <Row className="g-3">
            <Col md={3}>
              <div className="text-center">
                <div className="bg-danger bg-opacity-10 rounded-circle d-inline-flex p-2 mb-2">
                  <i className="bi bi-hospital text-danger fs-3"></i>
                </div>
                <h6 className="small fw-bold">Medical Emergency</h6>
                <small className="text-secondary">Coverage up to ₹50,000</small>
              </div>
            </Col>
            <Col md={3}>
              <div className="text-center">
                <div className="bg-warning bg-opacity-10 rounded-circle d-inline-flex p-2 mb-2">
                  <i className="bi bi-bag-x text-warning fs-3"></i>
                </div>
                <h6 className="small fw-bold">Baggage Loss</h6>
                <small className="text-secondary">Compensation for lost luggage</small>
              </div>
            </Col>
            <Col md={3}>
              <div className="text-center">
                <div className="bg-info bg-opacity-10 rounded-circle d-inline-flex p-2 mb-2">
                  <i className="bi bi-clock-history text-info fs-3"></i>
                </div>
                <h6 className="small fw-bold">Trip Delay</h6>
                <small className="text-secondary">Coverage for delays</small>
              </div>
            </Col>
            <Col md={3}>
              <div className="text-center">
                <div className="bg-success bg-opacity-10 rounded-circle d-inline-flex p-2 mb-2">
                  <i className="bi bi-x-circle text-success fs-3"></i>
                </div>
                <h6 className="small fw-bold">Cancellation</h6>
                <small className="text-secondary">Refund on cancellation</small>
              </div>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      {/* Insurance Plans */}
      <Row className="g-3 mb-4">
        {insurancePlans.map((plan) => (
          <Col key={plan.id} md={4}>
            <Card className={`border-0 shadow-sm h-100 ${plan.popular ? 'border border-warning' : ''}`}>
              {plan.popular && (
                <Badge bg="warning" className="position-absolute top-0 end-0 m-2 px-3 py-2">
                  Most Popular
                </Badge>
              )}
              <Card.Body className="text-center p-4">
                <div className="bg-primary bg-opacity-10 rounded-circle d-inline-flex p-3 mb-3">
                  <i className={`bi ${plan.icon} text-primary fs-1`}></i>
                </div>
                <h5 className="fw-bold mb-1">{plan.name}</h5>
                <div className="display-6 fw-bold text-primary mb-2">₹{plan.price}</div>
                <p className="text-secondary mb-3">per passenger</p>
                <div className="mb-3">
                  <Badge bg="success" className="px-3 py-2">Coverage: ₹{plan.coverage}</Badge>
                </div>
                <ListGroup variant="flush" className="text-start mb-3">
                  {plan.features.map((feature, idx) => (
                    <ListGroup.Item key={idx} className="bg-transparent px-0 py-1 border-0">
                      <i className="bi bi-check-circle-fill text-success me-2"></i>
                      <small>{feature}</small>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
                <Button 
                  variant={plan.popular ? 'warning' : 'outline-primary'} 
                  className="w-100"
                  onClick={() => handleSelectPlan(plan)}
                >
                  Select Plan
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Coverage Details */}
      <Card className="border-0 shadow-sm mb-4">
        <Card.Header className="bg-white">
          <h6 className="fw-bold mb-0">Coverage Details</h6>
        </Card.Header>
        <Card.Body>
          <Table bordered className="mb-0">
            <thead className="bg-light">
              <tr>
                <th>Coverage Type</th>
                <th>Basic</th>
                <th>Standard</th>
                <th>Premium</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Accidental Death</td>
                <td>✓</td>
                <td>✓</td>
                <td>✓</td>
              </tr>
              <tr>
                <td>Medical Expenses</td>
                <td>₹10,000</td>
                <td>₹25,000</td>
                <td>₹50,000</td>
              </tr>
              <tr>
                <td>Trip Cancellation</td>
                <td>₹5,000</td>
                <td>₹10,000</td>
                <td>₹20,000</td>
              </tr>
              <tr>
                <td>Baggage Loss</td>
                <td>-</td>
                <td>₹5,000</td>
                <td>₹10,000</td>
              </tr>
              <tr>
                <td>Flight Delay</td>
                <td>-</td>
                <td>₹2,000</td>
                <td>₹5,000</td>
              </tr>
              <tr>
                <td>COVID-19 Cover</td>
                <td>-</td>
                <td>-</td>
                <td>✓</td>
              </tr>
            </tbody>
          </Table>
        </Card.Body>
      </Card>

      {/* Terms */}
      <Alert variant="info" className="border-0">
        <i className="bi bi-info-circle me-2"></i>
        <strong>Please read:</strong> Insurance is subject to terms and conditions. Coverage valid for the journey duration only.
      </Alert>

      {/* Purchase Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Insurance Purchase</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedPlan && (
            <>
              <div className="bg-light p-3 rounded-3 mb-3">
                <h6 className="fw-bold mb-2">{selectedPlan.name} Plan</h6>
                <p className="text-secondary mb-1">Coverage: ₹{selectedPlan.coverage}</p>
                <p className="text-primary fw-bold mb-0">₹{selectedPlan.price} per passenger</p>
              </div>

              <h6 className="fw-bold mb-2">Passengers</h6>
              <ListGroup className="mb-3">
                {passengers.map((p, idx) => (
                  <ListGroup.Item key={idx} className="d-flex justify-content-between">
                    <span>{p.name}</span>
                    <Badge bg="secondary">Age {p.age}</Badge>
                  </ListGroup.Item>
                ))}
              </ListGroup>

              <div className="d-flex justify-content-between fw-bold">
                <span>Total Amount</span>
                <span className="text-primary">₹{selectedPlan.price * passengers.length}</span>
              </div>

              <hr />

              <Form.Group>
                <Form.Check
                  type="checkbox"
                  label="I agree to the terms and conditions of the insurance policy"
                  required
                />
              </Form.Group>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant="success" onClick={handleBuyInsurance}>
            Buy Insurance
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default TravelInsurancePage;
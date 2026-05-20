// src/pages/WalletPage.jsx
import React, { useState } from 'react';
import { Container, Row, Col, Card, Button, Badge, ListGroup, Modal, Form, ProgressBar } from 'react-bootstrap';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const WalletPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [showAddMoneyModal, setShowAddMoneyModal] = useState(false);
  const [amount, setAmount] = useState('');

  if (!user) {
    navigate('/login');
    return null;
  }

  const transactions = [
    { id: 1, date: '2024-02-15', description: 'Booking #EV101', amount: -850, type: 'debit' },
    { id: 2, date: '2024-02-10', description: 'Added Money', amount: 2000, type: 'credit' },
    { id: 3, date: '2024-02-05', description: 'Cashback on Trip', amount: 50, type: 'credit' },
    { id: 4, date: '2024-02-01', description: 'Booking #EV089', amount: -750, type: 'debit' },
    { id: 5, date: '2024-01-28', description: 'Referral Bonus', amount: 100, type: 'credit' },
  ];

  const quickAmounts = [500, 1000, 2000, 5000];

  return (
    <Container className="py-4">
      {/* Wallet Header */}
      <Row className="mb-4">
        <Col md={8}>
          <Card className="border-0 shadow-sm overflow-hidden">
            <Card.Body className="p-4" style={{ background: 'linear-gradient(135deg, #11998e, #38ef7d)' }}>
              <Row className="align-items-center">
                <Col>
                  <small className="text-white-50">Total Balance</small>
                  <h1 className="text-white fw-bold display-4">₹{user.walletBalance}</h1>
                  <p className="text-white-50 mb-0">
                    <i className="bi bi-star-fill text-warning me-1"></i>
                    {user.greenPoints} Green Points Available
                  </p>
                </Col>
                <Col xs="auto">
                  <Button 
                    variant="light" 
                    size="lg" 
                    className="rounded-pill px-4"
                    onClick={() => setShowAddMoneyModal(true)}
                  >
                    <i className="bi bi-plus-circle me-2"></i>
                    Add Money
                  </Button>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
        
        <Col md={4}>
          <Card className="border-0 shadow-sm h-100">
            <Card.Body className="text-center">
              <i className="bi bi-gift text-warning fs-1 mb-2"></i>
              <h6 className="fw-bold mb-1">Refer & Earn</h6>
              <p className="text-secondary small mb-2">Get ₹100 for each friend</p>
              <Button variant="outline-primary" size="sm" onClick={() => navigate('/referral')}>
                Invite Now
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Stats Cards */}
      <Row className="g-4 mb-4">
        <Col md={3}>
          <Card className="border-0 shadow-sm text-center">
            <Card.Body>
              <i className="bi bi-wallet2 text-primary fs-2 mb-2"></i>
              <h6 className="fw-bold mb-0">Total Deposits</h6>
              <h5 className="text-primary fw-bold">₹5,000</h5>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="border-0 shadow-sm text-center">
            <Card.Body>
              <i className="bi bi-arrow-down-circle text-danger fs-2 mb-2"></i>
              <h6 className="fw-bold mb-0">Total Spent</h6>
              <h5 className="text-danger fw-bold">₹2,550</h5>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="border-0 shadow-sm text-center">
            <Card.Body>
              <i className="bi bi-arrow-up-circle text-success fs-2 mb-2"></i>
              <h6 className="fw-bold mb-0">Cashback Earned</h6>
              <h5 className="text-success fw-bold">₹150</h5>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="border-0 shadow-sm text-center">
            <Card.Body>
              <i className="bi bi-star text-warning fs-2 mb-2"></i>
              <h6 className="fw-bold mb-0">Points Value</h6>
              <h5 className="text-warning fw-bold">₹{(user.greenPoints / 10).toFixed(0)}</h5>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Recent Transactions */}
      <Card className="border-0 shadow-sm">
        <Card.Header className="bg-white border-0 pt-4">
          <div className="d-flex justify-content-between align-items-center">
            <h5 className="fw-bold mb-0">Recent Transactions</h5>
            <Badge bg="light" text="dark" className="px-3 py-2">
              {transactions.length} Transactions
            </Badge>
          </div>
        </Card.Header>
        <Card.Body>
          <ListGroup variant="flush">
            {transactions.map((transaction) => (
              <ListGroup.Item key={transaction.id} className="px-0">
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <h6 className="fw-bold mb-1">{transaction.description}</h6>
                    <small className="text-secondary">
                      <i className="bi bi-calendar me-1"></i>
                      {transaction.date}
                    </small>
                  </div>
                  <div className="text-end">
                    <h6 className={transaction.type === 'credit' ? 'text-success' : 'text-danger'}>
                      {transaction.type === 'credit' ? '+' : '-'} ₹{Math.abs(transaction.amount)}
                    </h6>
                    <Badge bg={transaction.type === 'credit' ? 'success' : 'danger'} pill>
                      {transaction.type === 'credit' ? 'Credited' : 'Debited'}
                    </Badge>
                  </div>
                </div>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Card.Body>
      </Card>

      {/* Add Money Modal */}
      <Modal show={showAddMoneyModal} onHide={() => setShowAddMoneyModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Add Money to Wallet</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="mb-4">
            <label className="form-label fw-bold">Select Amount</label>
            <div className="d-flex gap-2 flex-wrap mb-3">
              {quickAmounts.map((amt) => (
                <Button
                  key={amt}
                  variant={amount === amt ? 'success' : 'outline-success'}
                  onClick={() => setAmount(amt)}
                >
                  ₹{amt}
                </Button>
              ))}
            </div>
          </div>
          
          <Form.Group className="mb-4">
            <Form.Label className="fw-bold">Enter Custom Amount</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </Form.Group>

          <div className="bg-light p-3 rounded-3 mb-3">
            <div className="d-flex justify-content-between mb-2">
              <span>Amount to Add:</span>
              <span className="fw-bold">₹{amount || 0}</span>
            </div>
            <div className="d-flex justify-content-between mb-2">
              <span>Convenience Fee:</span>
              <span className="fw-bold">₹{Math.round((amount || 0) * 0.02)}</span>
            </div>
            <hr />
            <div className="d-flex justify-content-between">
              <span className="fw-bold">Total:</span>
              <span className="fw-bold text-success">₹{(amount || 0) + Math.round((amount || 0) * 0.02)}</span>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowAddMoneyModal(false)}>
            Cancel
          </Button>
          <Button variant="success" onClick={() => setShowAddMoneyModal(false)}>
            <i className="bi bi-wallet2 me-2"></i>
            Proceed to Payment
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default WalletPage;
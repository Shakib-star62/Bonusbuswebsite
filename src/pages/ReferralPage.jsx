// src/pages/ReferralPage.jsx
import React, { useState } from 'react';
import { Container, Row, Col, Card, Button, Form, InputGroup, ListGroup, Badge, ProgressBar } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const ReferralPage = () => {
  const navigate = useNavigate();
  const [referralCode] = useState('SHAKIB123');
  const [referralLink] = useState('https://bonusbus.com/ref/SHAKIB123');
  const [copied, setCopied] = useState(false);

  const referralStats = {
    totalReferrals: 12,
    successfulBookings: 8,
    totalEarned: 800,
    pendingEarnings: 200,
    referralBonus: 100,
    level: 'Gold'
  };

  const referrals = [
    { name: 'Rahul Sharma', date: '15 Jan 2024', status: 'completed', earnings: 100 },
    { name: 'Priya Reddy', date: '12 Jan 2024', status: 'completed', earnings: 100 },
    { name: 'Venkatesh', date: '10 Jan 2024', status: 'completed', earnings: 100 },
    { name: 'Lakshmi', date: '08 Jan 2024', status: 'pending', earnings: 0 },
    { name: 'Suresh', date: '05 Jan 2024', status: 'pending', earnings: 0 },
  ];

  const milestones = [
    { level: 'Bronze', referrals: 5, bonus: 250 },
    { level: 'Silver', referrals: 15, bonus: 750 },
    { level: 'Gold', referrals: 30, bonus: 1500 },
    { level: 'Platinum', referrals: 50, bonus: 3000 },
  ];

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shareViaWhatsApp = () => {
    const message = `Join Bonus Bus and get ₹100 off! Use my referral code: ${referralCode}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <Container fluid className="px-4 py-4" style={{ background: '#f8f9fa' }}>
      {/* Header */}
      <div className="d-flex align-items-center gap-3 mb-4">
        <Button variant="link" className="p-0" onClick={() => navigate(-1)}>
          <i className="bi bi-arrow-left fs-4 text-primary"></i>
        </Button>
        <h4 className="fw-bold mb-0">Refer & Earn</h4>
      </div>

      {/* Hero Card */}
      <Card className="border-0 shadow-lg mb-4 text-white" style={{ background: 'linear-gradient(135deg, #667eea, #764ba2)' }}>
        <Card.Body className="p-5 text-center">
          <i className="bi bi-gift fs-1 mb-3"></i>
          <h2 className="fw-bold mb-3">Invite Friends, Earn ₹100 Each!</h2>
          <p className="mb-4 opacity-75">Share your referral code and earn when they book their first trip</p>
          
          {/* Referral Code */}
          <Card className="border-0 mx-auto" style={{ maxWidth: '400px' }}>
            <Card.Body>
              <div className="d-flex gap-2">
                <InputGroup>
                  <Form.Control
                    value={referralCode}
                    readOnly
                    className="text-center fw-bold"
                  />
                  <Button 
                    variant={copied ? 'success' : 'primary'}
                    onClick={() => copyToClipboard(referralCode)}
                  >
                    {copied ? 'Copied!' : <i className="bi bi-files"></i>}
                  </Button>
                </InputGroup>
              </div>
            </Card.Body>
          </Card>

          {/* Share Buttons */}
          <div className="d-flex justify-content-center gap-3 mt-3">
            <Button variant="light" className="rounded-circle p-3" onClick={shareViaWhatsApp}>
              <i className="bi bi-whatsapp text-success fs-4"></i>
            </Button>
            <Button variant="light" className="rounded-circle p-3" onClick={() => copyToClipboard(referralLink)}>
              <i className="bi bi-link-45deg text-primary fs-4"></i>
            </Button>
            <Button variant="light" className="rounded-circle p-3">
              <i className="bi bi-facebook text-primary fs-4"></i>
            </Button>
            <Button variant="light" className="rounded-circle p-3">
              <i className="bi bi-twitter text-info fs-4"></i>
            </Button>
          </div>
        </Card.Body>
      </Card>

      {/* Stats */}
      <Row className="g-3 mb-4">
        <Col md={3}>
          <Card className="border-0 shadow-sm text-center">
            <Card.Body>
              <h3 className="fw-bold text-primary mb-1">{referralStats.totalReferrals}</h3>
              <small className="text-secondary">Total Referrals</small>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="border-0 shadow-sm text-center">
            <Card.Body>
              <h3 className="fw-bold text-success mb-1">{referralStats.successfulBookings}</h3>
              <small className="text-secondary">Successful</small>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="border-0 shadow-sm text-center">
            <Card.Body>
              <h3 className="fw-bold text-warning mb-1">₹{referralStats.totalEarned}</h3>
              <small className="text-secondary">Total Earned</small>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="border-0 shadow-sm text-center">
            <Card.Body>
              <h3 className="fw-bold text-info mb-1">₹{referralStats.pendingEarnings}</h3>
              <small className="text-secondary">Pending</small>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* How it Works */}
      <Row className="g-4 mb-4">
        <Col md={4}>
          <Card className="border-0 shadow-sm h-100">
            <Card.Body className="text-center">
              <div className="bg-primary bg-opacity-10 rounded-circle d-inline-flex p-3 mb-3">
                <i className="bi bi-share text-primary fs-2"></i>
              </div>
              <h6 className="fw-bold">1. Share Your Code</h6>
              <p className="text-secondary small">Share your unique referral code with friends</p>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="border-0 shadow-sm h-100">
            <Card.Body className="text-center">
              <div className="bg-success bg-opacity-10 rounded-circle d-inline-flex p-3 mb-3">
                <i className="bi bi-person-plus text-success fs-2"></i>
              </div>
              <h6 className="fw-bold">2. Friend Signs Up</h6>
              <p className="text-secondary small">They sign up and book their first trip</p>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="border-0 shadow-sm h-100">
            <Card.Body className="text-center">
              <div className="bg-warning bg-opacity-10 rounded-circle d-inline-flex p-3 mb-3">
                <i className="bi bi-cash-stack text-warning fs-2"></i>
              </div>
              <h6 className="fw-bold">3. You Earn ₹100</h6>
              <p className="text-secondary small">₹100 credited to your wallet instantly</p>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Milestones */}
      <Card className="border-0 shadow-sm mb-4">
        <Card.Header className="bg-white">
          <h5 className="fw-bold mb-0">Referral Milestones</h5>
        </Card.Header>
        <Card.Body>
          <div className="mb-3">
            <div className="d-flex justify-content-between mb-2">
              <span>Your Level: <Badge bg="warning">{referralStats.level}</Badge></span>
              <span className="text-secondary">{referralStats.totalReferrals} / 30 referrals</span>
            </div>
            <ProgressBar 
              now={(referralStats.totalReferrals / 30) * 100} 
              variant="warning" 
              style={{ height: '10px' }}
            />
          </div>

          <Row className="g-3 mt-3">
            {milestones.map((milestone, index) => (
              <Col key={index} md={3}>
                <Card className={`border-0 ${referralStats.totalReferrals >= milestone.referrals ? 'bg-success bg-opacity-10' : 'bg-light'}`}>
                  <Card.Body className="text-center">
                    <h6 className="fw-bold">{milestone.level}</h6>
                    <div className="fw-bold text-primary mb-1">{milestone.referrals}+</div>
                    <small className="text-secondary">Bonus ₹{milestone.bonus}</small>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Card.Body>
      </Card>

      {/* Recent Referrals */}
      <Card className="border-0 shadow-sm">
        <Card.Header className="bg-white">
          <h5 className="fw-bold mb-0">Recent Referrals</h5>
        </Card.Header>
        <ListGroup variant="flush">
          {referrals.map((ref, index) => (
            <ListGroup.Item key={index} className="d-flex justify-content-between align-items-center py-3">
              <div>
                <h6 className="fw-bold mb-1">{ref.name}</h6>
                <small className="text-secondary">{ref.date}</small>
              </div>
              <div>
                {ref.status === 'completed' ? (
                  <Badge bg="success" className="me-2">₹{ref.earnings} Earned</Badge>
                ) : (
                  <Badge bg="warning">Pending</Badge>
                )}
              </div>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Card>
    </Container>
  );
};

export default ReferralPage;
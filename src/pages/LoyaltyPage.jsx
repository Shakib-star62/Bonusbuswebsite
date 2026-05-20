// src/pages/LoyaltyPage.jsx
import React from 'react';
import { Container, Row, Col, Card, Button, Badge, ProgressBar, ListGroup } from 'react-bootstrap';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const LoyaltyPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  if (!user) {
    navigate('/login');
    return null;
  }

  const tiers = [
    { name: 'Silver', points: 0, color: 'secondary', icon: 'bi-star' },
    { name: 'Gold', points: 1000, color: 'warning', icon: 'bi-star-fill' },
    { name: 'Platinum', points: 5000, color: 'info', icon: 'bi-gem' },
    { name: 'Diamond', points: 10000, color: 'primary', icon: 'bi-diamond' },
  ];

  const nextTier = tiers.find(tier => tier.points > user.greenPoints) || tiers[tiers.length - 1];
  const pointsToNext = nextTier.points - user.greenPoints;
  const progress = (user.greenPoints / nextTier.points) * 100;

  const benefits = [
    { tier: 'Silver', benefits: ['5% cashback on all bookings', 'Priority customer support'] },
    { tier: 'Gold', benefits: ['10% cashback on all bookings', 'Free cancellation up to 2 hours', 'Exclusive offers'] },
    { tier: 'Platinum', benefits: ['15% cashback on all bookings', 'Free seat selection', 'Airport lounge access', 'Birthday bonus'] },
    { tier: 'Diamond', benefits: ['20% cashback on all bookings', 'Personal travel assistant', 'Free upgrades', 'Yearly gift hamper'] },
  ];

  return (
    <Container className="py-4">
      {/* Current Tier Card */}
      <Card className="border-0 shadow-sm mb-4 overflow-hidden">
        <Card.Body className="p-4" style={{ background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)' }}>
          <Row className="align-items-center">
            <Col>
              <small className="text-white-50">Your Current Tier</small>
              <h2 className="text-white fw-bold mb-1">{user.tier} Member</h2>
              <p className="text-white-50 mb-0">
                <i className="bi bi-star-fill me-1"></i>
                {user.greenPoints} Green Points
              </p>
            </Col>
            <Col xs="auto">
              <div className="bg-white bg-opacity-25 rounded-circle p-3">
                <i className={`bi ${tiers.find(t => t.name === user.tier)?.icon || 'bi-star'} text-white fs-1`}></i>
              </div>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      {/* Progress to Next Tier */}
      <Card className="border-0 shadow-sm mb-4">
        <Card.Body>
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h6 className="fw-bold mb-0">Progress to {nextTier.name}</h6>
            <Badge bg={nextTier.color} className="px-3 py-2">
              {pointsToNext} points needed
            </Badge>
          </div>
          <ProgressBar now={progress} variant={nextTier.color} className="mb-2" style={{ height: '10px' }} />
          <small className="text-secondary">
            You're just {pointsToNext} points away from reaching {nextTier.name} tier!
          </small>
        </Card.Body>
      </Card>

      {/* All Tiers */}
      <h5 className="fw-bold mb-3">Membership Tiers</h5>
      <Row className="g-4 mb-4">
        {tiers.map((tier, idx) => (
          <Col key={idx} md={3}>
            <Card className={`border-0 shadow-sm h-100 ${user.tier === tier.name ? 'border border-' + tier.color : ''}`}>
              <Card.Body className="text-center">
                <div className={`bg-${tier.color} bg-opacity-10 rounded-circle d-inline-flex p-3 mb-3`}>
                  <i className={`bi ${tier.icon} text-${tier.color} fs-2`}></i>
                </div>
                <h5 className="fw-bold mb-2">{tier.name}</h5>
                <p className="text-secondary mb-2">{tier.points}+ Points</p>
                {user.tier === tier.name && (
                  <Badge bg={tier.color} pill>Current Tier</Badge>
                )}
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Tier Benefits */}
      <h5 className="fw-bold mb-3">Tier Benefits</h5>
      <Row className="g-4">
        {benefits.map((tier, idx) => (
          <Col key={idx} md={6} lg={3}>
            <Card className="border-0 shadow-sm h-100">
              <Card.Header className={`bg-${tier.tier.toLowerCase()} bg-opacity-10 border-0`}>
                <h6 className="fw-bold mb-0 text-center">{tier.tier} Benefits</h6>
              </Card.Header>
              <Card.Body>
                <ListGroup variant="flush">
                  {tier.benefits.map((benefit, bidx) => (
                    <ListGroup.Item key={bidx} className="px-0 border-0">
                      <i className="bi bi-check-circle-fill text-success me-2"></i>
                      <small>{benefit}</small>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Ways to Earn Points */}
      <Card className="border-0 shadow-sm mt-4">
        <Card.Body>
          <h6 className="fw-bold mb-3">Ways to Earn More Points</h6>
          <Row className="g-3">
            <Col md={3}>
              <div className="d-flex align-items-center gap-3">
                <div className="bg-primary bg-opacity-10 rounded-circle p-2">
                  <i className="bi bi-ticket text-primary"></i>
                </div>
                <div>
                  <small className="fw-bold d-block">Book Tickets</small>
                  <small className="text-secondary">10 pts per ₹100</small>
                </div>
              </div>
            </Col>
            <Col md={3}>
              <div className="d-flex align-items-center gap-3">
                <div className="bg-success bg-opacity-10 rounded-circle p-2">
                  <i className="bi bi-people text-success"></i>
                </div>
                <div>
                  <small className="fw-bold d-block">Refer Friends</small>
                  <small className="text-secondary">500 pts per referral</small>
                </div>
              </div>
            </Col>
            <Col md={3}>
              <div className="d-flex align-items-center gap-3">
                <div className="bg-warning bg-opacity-10 rounded-circle p-2">
                  <i className="bi bi-star text-warning"></i>
                </div>
                <div>
                  <small className="fw-bold d-block">Write Reviews</small>
                  <small className="text-secondary">50 pts per review</small>
                </div>
              </div>
            </Col>
            <Col md={3}>
              <div className="d-flex align-items-center gap-3">
                <div className="bg-info bg-opacity-10 rounded-circle p-2">
                  <i className="bi bi-calendar text-info"></i>
                </div>
                <div>
                  <small className="fw-bold d-block">Birthday Bonus</small>
                  <small className="text-secondary">200 pts</small>
                </div>
              </div>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default LoyaltyPage;
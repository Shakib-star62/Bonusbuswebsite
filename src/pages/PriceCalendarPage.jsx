// src/pages/PriceCalendarPage.jsx
import React, { useState } from 'react';
import { Container, Row, Col, Card, Button, Badge, Table } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const PriceCalendarPage = () => {
  const navigate = useNavigate();
  const [selectedMonth, setSelectedMonth] = useState('January 2024');
  const [selectedRoute, setSelectedRoute] = useState('Visakhapatnam → Vijayawada');

  const routes = [
    'Visakhapatnam → Vijayawada',
    'Vijayawada → Tirupati',
    'Guntur → Kakinada',
    'Tirupati → Visakhapatnam',
    'Rajahmundry → Vizag'
  ];

  const months = ['January 2024', 'February 2024', 'March 2024'];

  // Mock price data
  const priceData = {
    'January 2024': [
      { date: 'Mon 15', price: 850, available: 18 },
      { date: 'Tue 16', price: 750, available: 24 },
      { date: 'Wed 17', price: 850, available: 12 },
      { date: 'Thu 18', price: 950, available: 6 },
      { date: 'Fri 19', price: 1200, available: 4 },
      { date: 'Sat 20', price: 1200, available: 8 },
      { date: 'Sun 21', price: 1000, available: 15 },
      { date: 'Mon 22', price: 850, available: 22 },
      { date: 'Tue 23', price: 750, available: 28 },
      { date: 'Wed 24', price: 850, available: 16 },
      { date: 'Thu 25', price: 950, available: 10 },
      { date: 'Fri 26', price: 1100, available: 5 },
      { date: 'Sat 27', price: 1200, available: 3 },
      { date: 'Sun 28', price: 1000, available: 12 },
      { date: 'Mon 29', price: 850, available: 20 },
      { date: 'Tue 30', price: 750, available: 25 },
      { date: 'Wed 31', price: 850, available: 14 },
    ]
  };

  const getPriceColor = (price) => {
    if (price < 800) return 'success';
    if (price < 1000) return 'primary';
    if (price < 1200) return 'warning';
    return 'danger';
  };

  const lowestPrice = Math.min(...priceData[selectedMonth].map(d => d.price));
  const highestPrice = Math.max(...priceData[selectedMonth].map(d => d.price));

  return (
    <Container fluid className="px-4 py-4" style={{ background: '#f8f9fa' }}>
      {/* Header */}
      <div className="d-flex align-items-center gap-3 mb-4">
        <Button variant="link" className="p-0" onClick={() => navigate(-1)}>
          <i className="bi bi-arrow-left fs-4 text-primary"></i>
        </Button>
        <div>
          <h4 className="fw-bold mb-1">Price Calendar</h4>
          <p className="text-secondary mb-0">Find the cheapest days to travel</p>
        </div>
      </div>

      {/* Filters */}
      <Card className="border-0 shadow-sm mb-4">
        <Card.Body>
          <Row className="g-3">
            <Col md={6}>
              <label className="fw-medium text-secondary mb-2">Select Route</label>
              <select 
                className="form-select form-select-lg"
                value={selectedRoute}
                onChange={(e) => setSelectedRoute(e.target.value)}
              >
                {routes.map(route => (
                  <option key={route} value={route}>{route}</option>
                ))}
              </select>
            </Col>
            <Col md={6}>
              <label className="fw-medium text-secondary mb-2">Select Month</label>
              <select 
                className="form-select form-select-lg"
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(e.target.value)}
              >
                {months.map(month => (
                  <option key={month} value={month}>{month}</option>
                ))}
              </select>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      {/* Price Summary */}
      <Row className="g-3 mb-4">
        <Col md={4}>
          <Card className="border-0 shadow-sm text-center">
            <Card.Body>
              <small className="text-secondary">Average Price</small>
              <h3 className="fw-bold text-primary mb-0">
                ₹{(priceData[selectedMonth].reduce((acc, curr) => acc + curr.price, 0) / priceData[selectedMonth].length).toFixed(0)}
              </h3>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="border-0 shadow-sm text-center">
            <Card.Body>
              <small className="text-secondary">Lowest Price</small>
              <h3 className="fw-bold text-success mb-0">₹{lowestPrice}</h3>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="border-0 shadow-sm text-center">
            <Card.Body>
              <small className="text-secondary">Highest Price</small>
              <h3 className="fw-bold text-danger mb-0">₹{highestPrice}</h3>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Price Calendar Grid */}
      <Card className="border-0 shadow-sm">
        <Card.Header className="bg-white py-3">
          <div className="d-flex justify-content-between align-items-center">
            <h5 className="fw-bold mb-0">{selectedMonth}</h5>
            <div className="d-flex gap-2">
              <Badge bg="success">Low</Badge>
              <Badge bg="primary">Medium</Badge>
              <Badge bg="warning">High</Badge>
              <Badge bg="danger">Peak</Badge>
            </div>
          </div>
        </Card.Header>
        <Card.Body>
          <Row className="g-2">
            {priceData[selectedMonth].map((day, index) => (
              <Col key={index} xs={6} sm={4} md={3} lg={2}>
                <Card 
                  className={`border-0 shadow-sm text-center cursor-pointer`}
                  style={{ cursor: 'pointer' }}
                  onClick={() => navigate('/home')}
                >
                  <Card.Body className="p-2">
                    <small className="text-secondary">{day.date}</small>
                    <h6 className={`fw-bold text-${getPriceColor(day.price)} mb-1`}>
                      ₹{day.price}
                    </h6>
                    <Badge 
                      bg={day.available > 10 ? 'success' : day.available > 5 ? 'warning' : 'danger'}
                      size="sm"
                    >
                      {day.available} seats
                    </Badge>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>

          {/* Legend */}
          <div className="mt-4 pt-3 border-top">
            <div className="d-flex gap-4 flex-wrap">
              <div className="d-flex align-items-center gap-2">
                <div className="bg-success rounded-circle" style={{ width: '12px', height: '12px' }}></div>
                <small>Best Deals (Below ₹800)</small>
              </div>
              <div className="d-flex align-items-center gap-2">
                <div className="bg-primary rounded-circle" style={{ width: '12px', height: '12px' }}></div>
                <small>Good Value (₹800-₹1000)</small>
              </div>
              <div className="d-flex align-items-center gap-2">
                <div className="bg-warning rounded-circle" style={{ width: '12px', height: '12px' }}></div>
                <small>Premium (₹1000-₹1200)</small>
              </div>
              <div className="d-flex align-items-center gap-2">
                <div className="bg-danger rounded-circle" style={{ width: '12px', height: '12px' }}></div>
                <small>Peak Season (Above ₹1200)</small>
              </div>
            </div>
          </div>

          {/* Price Tip */}
          <Alert variant="info" className="mt-4 mb-0">
            <i className="bi bi-lightbulb me-2"></i>
            <strong>Pro Tip:</strong> Booking on weekdays (Tue-Thu) can save you up to 30% compared to weekends!
          </Alert>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default PriceCalendarPage;
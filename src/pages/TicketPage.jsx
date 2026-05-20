// src/pages/TicketPage.jsx
import React, { useRef } from 'react';
import { Container, Row, Col, Card, Button, Badge, Table } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';

const TicketPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const ticketRef = useRef();

  const ticketData = {
    id: 'EV20240120345',
    bookingId: 'BKG' + id,
    busName: 'GreenLine EV',
    busNumber: 'AP31 EV 1234',
    operator: 'GreenLine Travels',
    route: 'Visakhapatnam → Vijayawada',
    date: '20 Jan 2024',
    departureTime: '06:00 AM',
    arrivalTime: '12:30 PM',
    duration: '6h 30m',
    boardingPoint: 'Visakhapatnam Bus Stand (Gate 3)',
    boardingTime: '05:45 AM',
    droppingPoint: 'Vijayawada Bus Stand',
    passengers: [
      { name: 'Shakib Ahmed', age: 28, seat: '2A', gender: 'Male' },
      { name: 'Rahul Sharma', age: 32, seat: '2B', gender: 'Male' }
    ],
    totalFare: 1785,
    paymentMethod: 'UPI',
    paymentId: 'pay_123456789',
    bookingDate: '15 Jan 2024, 10:30 AM',
    qrCode: 'https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=TICKET' + id
  };

  const handleDownload = () => {
    // In real app, generate PDF
    alert('Downloading ticket...');
  };

  const handlePrint = () => {
    window.print();
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Bus Ticket',
        text: `Ticket for ${ticketData.route}`,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  return (
    <Container fluid className="px-4 py-4" style={{ background: '#f8f9fa' }}>
      {/* Header */}
      <div className="d-flex align-items-center justify-content-between mb-4">
        <div className="d-flex align-items-center gap-3">
          <Button variant="link" className="p-0" onClick={() => navigate(-1)}>
            <i className="bi bi-arrow-left fs-4 text-primary"></i>
          </Button>
          <h4 className="fw-bold mb-0">E-Ticket</h4>
        </div>
        <div className="d-flex gap-2">
          <Button variant="outline-primary" onClick={handleDownload}>
            <i className="bi bi-download me-2"></i>
            Download
          </Button>
          <Button variant="outline-success" onClick={handlePrint}>
            <i className="bi bi-printer me-2"></i>
            Print
          </Button>
          <Button variant="outline-info" onClick={handleShare}>
            <i className="bi bi-share me-2"></i>
            Share
          </Button>
        </div>
      </div>

      {/* Ticket Card */}
      <Card className="border-0 shadow-lg mx-auto" style={{ maxWidth: '800px' }} ref={ticketRef}>
        {/* Ticket Header */}
        <Card.Header className="bg-primary text-white py-3">
          <Row className="align-items-center">
            <Col>
              <h5 className="fw-bold mb-0">BONUS BUS</h5>
              <small>Go Green • Travel Smart</small>
            </Col>
            <Col xs="auto">
              <Badge bg="light" text="dark" className="px-3 py-2">
                {ticketData.id}
              </Badge>
            </Col>
          </Row>
        </Card.Header>

        <Card.Body className="p-4">
          {/* Journey Details */}
          <Row className="mb-4">
            <Col xs={3} className="text-center">
              <div className="fw-bold fs-5">{ticketData.departureTime}</div>
              <small className="text-secondary">{ticketData.date}</small>
            </Col>
            <Col xs={6} className="text-center">
              <div className="position-relative">
                <i className="bi bi-arrow-right text-secondary"></i>
                <div className="small text-secondary mt-1">{ticketData.duration}</div>
              </div>
            </Col>
            <Col xs={3} className="text-center">
              <div className="fw-bold fs-5">{ticketData.arrivalTime}</div>
              <small className="text-secondary">{ticketData.date}</small>
            </Col>
          </Row>

          <Row className="mb-4">
            <Col xs={6}>
              <small className="text-secondary">From</small>
              <h6 className="fw-bold">{ticketData.route.split('→')[0]}</h6>
              <small className="text-secondary">{ticketData.boardingPoint}</small>
              <div className="text-primary small">Boarding: {ticketData.boardingTime}</div>
            </Col>
            <Col xs={6} className="text-end">
              <small className="text-secondary">To</small>
              <h6 className="fw-bold">{ticketData.route.split('→')[1]}</h6>
              <small className="text-secondary">{ticketData.droppingPoint}</small>
            </Col>
          </Row>

          {/* Bus Details */}
          <Card className="bg-light border-0 mb-4">
            <Card.Body>
              <Row>
                <Col md={4}>
                  <small className="text-secondary">Bus</small>
                  <div className="fw-bold">{ticketData.busName}</div>
                  <small>{ticketData.busNumber}</small>
                </Col>
                <Col md={4}>
                  <small className="text-secondary">Operator</small>
                  <div className="fw-bold">{ticketData.operator}</div>
                </Col>
                <Col md={4}>
                  <small className="text-secondary">Booking ID</small>
                  <div className="fw-bold">{ticketData.bookingId}</div>
                </Col>
              </Row>
            </Card.Body>
          </Card>

          {/* Passenger Details */}
          <h6 className="fw-bold mb-3">Passenger Details</h6>
          <Table bordered className="mb-4">
            <thead className="bg-light">
              <tr>
                <th>Name</th>
                <th>Age</th>
                <th>Gender</th>
                <th>Seat</th>
              </tr>
            </thead>
            <tbody>
              {ticketData.passengers.map((passenger, index) => (
                <tr key={index}>
                  <td>{passenger.name}</td>
                  <td>{passenger.age}</td>
                  <td>{passenger.gender}</td>
                  <td><Badge bg="success">{passenger.seat}</Badge></td>
                </tr>
              ))}
            </tbody>
          </Table>

          {/* Fare Details */}
          <Row>
            <Col md={6}>
              <small className="text-secondary">Total Fare</small>
              <h5 className="fw-bold text-primary">₹{ticketData.totalFare}</h5>
            </Col>
            <Col md={6}>
              <small className="text-secondary">Payment Method</small>
              <div className="fw-bold">{ticketData.paymentMethod}</div>
              <small className="text-secondary">ID: {ticketData.paymentId}</small>
            </Col>
          </Row>

          {/* QR Code */}
          <div className="text-center mt-4 pt-3 border-top">
            <Row>
              <Col md={4}>
                <img 
                  src={ticketData.qrCode} 
                  alt="QR Code" 
                  className="img-fluid"
                  style={{ width: '120px' }}
                />
              </Col>
              <Col md={8} className="text-start">
                <h6 className="fw-bold mb-2">Important Instructions</h6>
                <ul className="small text-secondary">
                  <li>Carry a printed copy or show this ticket on mobile</li>
                  <li>Carry valid ID proof matching passenger name</li>
                  <li>Reach boarding point 15 minutes before departure</li>
                  <li>Cancellation policy applies as per terms</li>
                </ul>
              </Col>
            </Row>
          </div>
        </Card.Body>

        <Card.Footer className="bg-white text-center py-3 border-top">
          <small className="text-secondary">
            This is a computer generated ticket. No signature required.
          </small>
        </Card.Footer>
      </Card>

      {/* Actions */}
      <div className="text-center mt-4">
        <Button 
          variant="outline-danger" 
          className="me-2"
          onClick={() => navigate(`/cancel-booking/${id}`)}
        >
          <i className="bi bi-x-circle me-2"></i>
          Cancel Booking
        </Button>
        <Button 
          variant="outline-success"
          onClick={() => navigate('/home')}
        >
          <i className="bi bi-plus-circle me-2"></i>
          Book Another
        </Button>
      </div>
    </Container>
  );
};

export default TicketPage;
// pages/CancelBookingPage.jsx
import React, { useState } from 'react';
import { Container, Row, Col, Card, Button, Form, Badge, Alert, ProgressBar, Modal } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';

const CancelBookingPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [cancelReason, setCancelReason] = useState('');
  const [selectedSeats, setSelectedSeats] = useState(['2A', '2B']);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [refundAmount, setRefundAmount] = useState(0);
  const [cancellationCharges, setCancellationCharges] = useState(0);

  const bookingDetails = {
    id: 'EV20240115234',
    busName: 'GreenLine EV',
    busNumber: 'EV101',
    route: 'Visakhapatnam → Vijayawada',
    date: '15 Jan 2024',
    departureTime: '06:00 AM',
    arrivalTime: '12:30 PM',
    totalFare: 1700,
    seats: ['2A', '2B'],
    passengerNames: ['Shakib', 'Rahul'],
    bookingTime: '10 Jan 2024, 2:30 PM'
  };

  const cancellationPolicies = [
    { time: 'More than 48 hours', refund: '90%', charge: '10%' },
    { time: '24-48 hours', refund: '75%', charge: '25%' },
    { time: '12-24 hours', refund: '50%', charge: '50%' },
    { time: 'Less than 12 hours', refund: '0%', charge: '100%' },
  ];

  const calculateRefund = () => {
    const hoursUntilDeparture = 36; // Mock calculation
    let refundPercent = 0;

    if (hoursUntilDeparture > 48) {
      refundPercent = 90;
      setCancellationCharges(bookingDetails.totalFare * 0.1);
    } else if (hoursUntilDeparture > 24) {
      refundPercent = 75;
      setCancellationCharges(bookingDetails.totalFare * 0.25);
    } else if (hoursUntilDeparture > 12) {
      refundPercent = 50;
      setCancellationCharges(bookingDetails.totalFare * 0.5);
    } else {
      refundPercent = 0;
      setCancellationCharges(bookingDetails.totalFare);
    }

    setRefundAmount(bookingDetails.totalFare * (refundPercent / 100));
  };

  React.useEffect(() => {
    calculateRefund();
  }, []);

  const handleCancel = () => {
    setShowConfirmModal(true);
  };

  const confirmCancel = () => {
    setShowConfirmModal(false);
    alert(`Booking cancelled successfully! Refund of ₹${refundAmount} will be processed within 5-7 working days.`);
    navigate('/bookings');
  };

  const reasons = [
    'Change of plans',
    'Found better option',
    'Medical emergency',
    'Weather conditions',
    'Personal reasons',
    'Wrong booking'
  ];

  return (
    <Container fluid className="px-4 py-4" style={{ background: '#f8f9fa' }}>
      {/* Header */}
      <div className="d-flex align-items-center gap-3 mb-4">
        <Button variant="link" className="p-0" onClick={() => navigate(-1)}>
          <i className="bi bi-arrow-left fs-4 text-primary"></i>
        </Button>
        <h4 className="fw-bold mb-0">Cancel Booking</h4>
      </div>

      {/* Progress Steps */}
      <Row className="g-2 mb-4">
        <Col xs={4}>
          <div className={`text-center ${step >= 1 ? 'text-primary' : 'text-secondary'}`}>
            <div className={`rounded-circle d-inline-flex p-2 mb-2 ${step >= 1 ? 'bg-primary text-white' : 'bg-light'}`}>
              <i className="bi bi-1-circle-fill"></i>
            </div>
            <small className="d-block">Select Seats</small>
          </div>
        </Col>
        <Col xs={4}>
          <div className={`text-center ${step >= 2 ? 'text-primary' : 'text-secondary'}`}>
            <div className={`rounded-circle d-inline-flex p-2 mb-2 ${step >= 2 ? 'bg-primary text-white' : 'bg-light'}`}>
              <i className="bi bi-2-circle-fill"></i>
            </div>
            <small className="d-block">Choose Reason</small>
          </div>
        </Col>
        <Col xs={4}>
          <div className={`text-center ${step >= 3 ? 'text-primary' : 'text-secondary'}`}>
            <div className={`rounded-circle d-inline-flex p-2 mb-2 ${step >= 3 ? 'bg-primary text-white' : 'bg-light'}`}>
              <i className="bi bi-3-circle-fill"></i>
            </div>
            <small className="d-block">Confirmation</small>
          </div>
        </Col>
      </Row>

      {/* Booking Summary */}
      <Card className="border-0 shadow-sm mb-4">
        <Card.Body>
          <h5 className="fw-bold mb-3">Booking Summary</h5>
          <div className="d-flex justify-content-between mb-2">
            <span className="text-secondary">Booking ID</span>
            <span className="fw-medium">{bookingDetails.id}</span>
          </div>
          <div className="d-flex justify-content-between mb-2">
            <span className="text-secondary">Bus</span>
            <span className="fw-medium">{bookingDetails.busName} ({bookingDetails.busNumber})</span>
          </div>
          <div className="d-flex justify-content-between mb-2">
            <span className="text-secondary">Route</span>
            <span className="fw-medium">{bookingDetails.route}</span>
          </div>
          <div className="d-flex justify-content-between mb-2">
            <span className="text-secondary">Date & Time</span>
            <span className="fw-medium">{bookingDetails.date} • {bookingDetails.departureTime}</span>
          </div>
          <div className="d-flex justify-content-between mb-2">
            <span className="text-secondary">Seats</span>
            <span className="fw-medium">{bookingDetails.seats.join(', ')}</span>
          </div>
          <div className="d-flex justify-content-between mb-2">
            <span className="text-secondary">Passengers</span>
            <span className="fw-medium">{bookingDetails.passengerNames.join(', ')}</span>
          </div>
          <hr />
          <div className="d-flex justify-content-between">
            <span className="fw-bold">Total Fare</span>
            <span className="fw-bold text-primary">₹{bookingDetails.totalFare}</span>
          </div>
        </Card.Body>
      </Card>

      {step === 1 && (
        <Card className="border-0 shadow-sm mb-4">
          <Card.Body>
            <h5 className="fw-bold mb-3">Select Seats to Cancel</h5>
            <div className="bg-light p-3 rounded-3 mb-3">
              <div className="d-flex gap-2 mb-3">
                <Badge bg="success">Available</Badge>
                <Badge bg="danger">Selected for Cancellation</Badge>
                <Badge bg="secondary">Other Bookings</Badge>
              </div>
              <Row className="g-2">
                {['1A', '1B', '1C', '1D', '2A', '2B', '2C', '2D', '3A', '3B', '3C', '3D'].map((seat) => {
                  const isSelected = selectedSeats.includes(seat);
                  const isBooked = ['2A', '2B'].includes(seat);
                  return (
                    <Col key={seat} xs={3} sm={2}>
                      <Button
                        variant={isSelected ? 'danger' : isBooked ? 'outline-danger' : 'outline-secondary'}
                        className="w-100"
                        onClick={() => {
                          if (isBooked) {
                            if (isSelected) {
                              setSelectedSeats(selectedSeats.filter(s => s !== seat));
                            } else {
                              setSelectedSeats([...selectedSeats, seat]);
                            }
                          }
                        }}
                        disabled={!isBooked}
                      >
                        {seat}
                      </Button>
                    </Col>
                  );
                })}
              </Row>
            </div>
            <Button 
              variant="primary" 
              className="w-100"
              onClick={() => setStep(2)}
              disabled={selectedSeats.length === 0}
            >
              Continue ({selectedSeats.length} seats selected)
            </Button>
          </Card.Body>
        </Card>
      )}

      {step === 2 && (
        <Card className="border-0 shadow-sm mb-4">
          <Card.Body>
            <h5 className="fw-bold mb-3">Reason for Cancellation</h5>
            <div className="mb-4">
              {reasons.map((reason, index) => (
                <Form.Check
                  key={index}
                  type="radio"
                  name="cancelReason"
                  id={`reason-${index}`}
                  label={reason}
                  className="mb-2"
                  onChange={() => setCancelReason(reason)}
                />
              ))}
            </div>

            <Form.Group className="mb-4">
              <Form.Label>Additional Comments (Optional)</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Tell us more about your cancellation..."
              />
            </Form.Group>

            <Button 
              variant="primary" 
              className="w-100"
              onClick={() => setStep(3)}
              disabled={!cancelReason}
            >
              Next
            </Button>
          </Card.Body>
        </Card>
      )}

      {step === 3 && (
        <>
          <Card className="border-0 shadow-sm mb-4">
            <Card.Body>
              <h5 className="fw-bold mb-3">Refund Summary</h5>
              
              <div className="bg-light p-3 rounded-3 mb-3">
                <div className="d-flex justify-content-between mb-2">
                  <span className="text-secondary">Total Fare</span>
                  <span className="fw-bold">₹{bookingDetails.totalFare}</span>
                </div>
                <div className="d-flex justify-content-between mb-2">
                  <span className="text-secondary">Cancellation Charges</span>
                  <span className="fw-bold text-danger">-₹{cancellationCharges}</span>
                </div>
                <hr />
                <div className="d-flex justify-content-between">
                  <span className="fw-bold">Refund Amount</span>
                  <span className="fw-bold text-success fs-5">₹{refundAmount}</span>
                </div>
              </div>

              <Alert variant="info">
                <i className="bi bi-info-circle me-2"></i>
                Refund will be credited to original payment source within 5-7 working days.
              </Alert>

              <h6 className="fw-bold mb-3">Cancellation Policy</h6>
              <div className="table-responsive">
                <table className="table table-sm">
                  <thead>
                    <tr>
                      <th>Time before departure</th>
                      <th>Refund</th>
                      <th>Charges</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cancellationPolicies.map((policy, index) => (
                      <tr key={index}>
                        <td>{policy.time}</td>
                        <td className="text-success">{policy.refund}</td>
                        <td className="text-danger">{policy.charge}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card.Body>
          </Card>

          <div className="d-flex gap-3">
            <Button variant="outline-secondary" className="flex-grow-1" onClick={() => setStep(2)}>
              Back
            </Button>
            <Button variant="danger" className="flex-grow-1" onClick={handleCancel}>
              Confirm Cancellation
            </Button>
          </div>
        </>
      )}

      {/* Confirmation Modal */}
      <Modal show={showConfirmModal} onHide={() => setShowConfirmModal(false)} centered>
        <Modal.Body className="text-center p-4">
          <div className="bg-danger bg-opacity-10 rounded-circle d-inline-flex p-3 mb-3">
            <i className="bi bi-exclamation-triangle text-danger fs-1"></i>
          </div>
          <h4 className="fw-bold mb-2">Confirm Cancellation</h4>
          <p className="text-secondary mb-4">
            Are you sure you want to cancel {selectedSeats.length} seat(s)? 
            Refund of ₹{refundAmount} will be processed.
          </p>
          <div className="d-flex gap-2 justify-content-center">
            <Button variant="outline-secondary" onClick={() => setShowConfirmModal(false)}>
              No, Keep Booking
            </Button>
            <Button variant="danger" onClick={confirmCancel}>
              Yes, Cancel Booking
            </Button>
          </div>
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default CancelBookingPage;
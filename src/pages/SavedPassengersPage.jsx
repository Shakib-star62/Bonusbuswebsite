// src/pages/SavedPassengersPage.jsx
import React, { useState } from 'react';
import { Container, Row, Col, Card, Button, Form, Badge, Modal, InputGroup } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const SavedPassengersPage = () => {
  const navigate = useNavigate();
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingPassenger, setEditingPassenger] = useState(null);

  const [passengers, setPassengers] = useState([
    { id: 1, name: 'Shakib Ahmed', age: 28, gender: 'Male', phone: '9390629750', email: 'shakib@example.com', idProof: 'Aadhar', idNumber: '1234-5678-9012' },
    { id: 2, name: 'Rahul Sharma', age: 32, gender: 'Male', phone: '9876543210', email: 'rahul@example.com', idProof: 'PAN', idNumber: 'ABCDE1234F' },
    { id: 3, name: 'Priya Reddy', age: 25, gender: 'Female', phone: '8765432109', email: 'priya@example.com', idProof: 'Passport', idNumber: 'P1234567' },
  ]);

  const [newPassenger, setNewPassenger] = useState({
    name: '',
    age: '',
    gender: 'Male',
    phone: '',
    email: '',
    idProof: 'Aadhar',
    idNumber: ''
  });

  const handleAddPassenger = () => {
    setPassengers([...passengers, { ...newPassenger, id: passengers.length + 1 }]);
    setShowAddModal(false);
    setNewPassenger({ name: '', age: '', gender: 'Male', phone: '', email: '', idProof: 'Aadhar', idNumber: '' });
  };

  const handleEditPassenger = (passenger) => {
    setEditingPassenger(passenger);
    setNewPassenger(passenger);
    setShowAddModal(true);
  };

  const handleUpdatePassenger = () => {
    setPassengers(passengers.map(p => p.id === editingPassenger.id ? newPassenger : p));
    setShowAddModal(false);
    setEditingPassenger(null);
    setNewPassenger({ name: '', age: '', gender: 'Male', phone: '', email: '', idProof: 'Aadhar', idNumber: '' });
  };

  const handleDeletePassenger = (id) => {
    if (window.confirm('Are you sure you want to delete this passenger?')) {
      setPassengers(passengers.filter(p => p.id !== id));
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
          <h4 className="fw-bold mb-0">Saved Passengers</h4>
        </div>
        <Button variant="primary" onClick={() => {
          setEditingPassenger(null);
          setNewPassenger({ name: '', age: '', gender: 'Male', phone: '', email: '', idProof: 'Aadhar', idNumber: '' });
          setShowAddModal(true);
        }}>
          <i className="bi bi-plus-circle me-2"></i>
          Add New
        </Button>
      </div>

      {/* Passenger List */}
      <Row className="g-3">
        {passengers.map((passenger) => (
          <Col key={passenger.id} md={6}>
            <Card className="border-0 shadow-sm h-100">
              <Card.Body>
                <div className="d-flex justify-content-between align-items-start mb-3">
                  <div className="d-flex align-items-center gap-2">
                    <div className="bg-primary bg-opacity-10 rounded-circle p-2">
                      <i className="bi bi-person-circle text-primary fs-4"></i>
                    </div>
                    <div>
                      <h6 className="fw-bold mb-0">{passenger.name}</h6>
                      <small className="text-secondary">{passenger.age} years • {passenger.gender}</small>
                    </div>
                  </div>
                  <Badge bg="success">Verified</Badge>
                </div>

                <div className="mb-2">
                  <small className="text-secondary d-block">
                    <i className="bi bi-telephone me-2"></i>
                    {passenger.phone}
                  </small>
                  <small className="text-secondary d-block">
                    <i className="bi bi-envelope me-2"></i>
                    {passenger.email}
                  </small>
                </div>

                <div className="bg-light p-2 rounded-3 mb-3">
                  <small className="text-secondary d-block">
                    <i className="bi bi-card-text me-2"></i>
                    {passenger.idProof}: {passenger.idNumber}
                  </small>
                </div>

                <div className="d-flex gap-2">
                  <Button 
                    variant="outline-primary" 
                    size="sm" 
                    className="flex-grow-1"
                    onClick={() => handleEditPassenger(passenger)}
                  >
                    <i className="bi bi-pencil me-1"></i>
                    Edit
                  </Button>
                  <Button 
                    variant="outline-danger" 
                    size="sm" 
                    className="flex-grow-1"
                    onClick={() => handleDeletePassenger(passenger.id)}
                  >
                    <i className="bi bi-trash me-1"></i>
                    Delete
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Quick Select */}
      <Card className="border-0 shadow-sm mt-4">
        <Card.Header className="bg-white">
          <h6 className="fw-bold mb-0">Quick Select for Booking</h6>
        </Card.Header>
        <Card.Body>
          <div className="d-flex gap-2 flex-wrap">
            {passengers.map(p => (
              <Button 
                key={p.id} 
                variant="outline-primary" 
                size="sm" 
                className="rounded-pill"
                onClick={() => alert(`${p.name} selected for booking!`)}
              >
                <i className="bi bi-person me-1"></i>
                {p.name}
              </Button>
            ))}
          </div>
        </Card.Body>
      </Card>

      {/* Add/Edit Modal */}
      <Modal show={showAddModal} onHide={() => setShowAddModal(false)} centered size="lg">
        <Modal.Header closeButton>
          <Modal.Title>{editingPassenger ? 'Edit Passenger' : 'Add New Passenger'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Full Name</Form.Label>
                  <Form.Control
                    type="text"
                    value={newPassenger.name}
                    onChange={(e) => setNewPassenger({...newPassenger, name: e.target.value})}
                    placeholder="Enter full name"
                  />
                </Form.Group>
              </Col>
              <Col md={3}>
                <Form.Group className="mb-3">
                  <Form.Label>Age</Form.Label>
                  <Form.Control
                    type="number"
                    value={newPassenger.age}
                    onChange={(e) => setNewPassenger({...newPassenger, age: e.target.value})}
                    placeholder="Age"
                  />
                </Form.Group>
              </Col>
              <Col md={3}>
                <Form.Group className="mb-3">
                  <Form.Label>Gender</Form.Label>
                  <Form.Select
                    value={newPassenger.gender}
                    onChange={(e) => setNewPassenger({...newPassenger, gender: e.target.value})}
                  >
                    <option>Male</option>
                    <option>Female</option>
                    <option>Other</option>
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Phone Number</Form.Label>
                  <Form.Control
                    type="tel"
                    value={newPassenger.phone}
                    onChange={(e) => setNewPassenger({...newPassenger, phone: e.target.value})}
                    placeholder="10-digit mobile number"
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Email (Optional)</Form.Label>
                  <Form.Control
                    type="email"
                    value={newPassenger.email}
                    onChange={(e) => setNewPassenger({...newPassenger, email: e.target.value})}
                    placeholder="Email address"
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col md={4}>
                <Form.Group className="mb-3">
                  <Form.Label>ID Proof Type</Form.Label>
                  <Form.Select
                    value={newPassenger.idProof}
                    onChange={(e) => setNewPassenger({...newPassenger, idProof: e.target.value})}
                  >
                    <option>Aadhar Card</option>
                    <option>PAN Card</option>
                    <option>Passport</option>
                    <option>Driving License</option>
                    <option>Voter ID</option>
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={8}>
                <Form.Group className="mb-3">
                  <Form.Label>ID Number</Form.Label>
                  <Form.Control
                    type="text"
                    value={newPassenger.idNumber}
                    onChange={(e) => setNewPassenger({...newPassenger, idNumber: e.target.value})}
                    placeholder="Enter ID number"
                  />
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className="mb-3">
              <Form.Check
                type="checkbox"
                label="Save this passenger for future bookings"
                defaultChecked
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-secondary" onClick={() => setShowAddModal(false)}>
            Cancel
          </Button>
          <Button 
            variant="success" 
            onClick={editingPassenger ? handleUpdatePassenger : handleAddPassenger}
            disabled={!newPassenger.name || !newPassenger.age || !newPassenger.phone || !newPassenger.idNumber}
          >
            {editingPassenger ? 'Update' : 'Save Passenger'}
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default SavedPassengersPage;
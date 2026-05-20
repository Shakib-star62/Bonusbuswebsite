// pages/SupportPage.jsx
import React, { useState } from 'react';
import { Container, Row, Col, Card, Button, Form, Accordion, Badge, Modal } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const SupportPage = () => {
  const navigate = useNavigate();
  const [showTicketModal, setShowTicketModal] = useState(false);
  const [ticketSubject, setTicketSubject] = useState('');
  const [ticketMessage, setTicketMessage] = useState('');
  const [showChat, setShowChat] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    { sender: 'bot', message: 'Hello! How can I help you today?', time: '10:00 AM' }
  ]);
  const [chatInput, setChatInput] = useState('');

  const faqs = [
    {
      category: 'Bookings',
      questions: [
        {
          q: 'How do I book a ticket?',
          a: 'You can book a ticket by selecting your route, date, and bus on the home page. Then select your seats and proceed to payment.'
        },
        {
          q: 'Can I modify my booking?',
          a: 'Yes, you can modify your booking up to 24 hours before departure. Go to My Bookings and select "Modify".'
        },
        {
          q: 'How do I cancel my ticket?',
          a: 'Cancellation can be done from My Bookings. Refund will be processed as per cancellation policy.'
        }
      ]
    },
    {
      category: 'Payments',
      questions: [
        {
          q: 'What payment methods are accepted?',
          a: 'We accept all major credit/debit cards, UPI (Google Pay, PhonePe, Paytm), net banking, and wallet balance.'
        },
        {
          q: 'When will I get refund?',
          a: 'Refunds are processed within 5-7 working days and credited to original payment source.'
        },
        {
          q: 'Is it safe to pay online?',
          a: 'Yes, all payments are secure and encrypted. We use industry-standard security protocols.'
        }
      ]
    },
    {
      category: 'Travel',
      questions: [
        {
          q: 'What amenities are provided?',
          a: 'All our buses have AC, WiFi, charging points, and water bottles. Luxury buses have additional amenities.'
        },
        {
          q: 'Can I carry luggage?',
          a: 'Yes, you can carry up to 25kg of luggage. Additional luggage may be charged.'
        },
        {
          q: 'Are pets allowed?',
          a: 'Service animals are allowed. Please contact support for pet travel policy.'
        }
      ]
    },
    {
      category: 'Account',
      questions: [
        {
          q: 'How do I reset my password?',
          a: 'Go to login page and click "Forgot Password". Follow the instructions sent to your email/phone.'
        },
        {
          q: 'How to update my profile?',
          a: 'Go to Account section and click on Edit Profile to update your information.'
        },
        {
          q: 'What are Green Points?',
          a: 'Green Points are loyalty points earned on every booking. They can be redeemed for discounts.'
        }
      ]
    }
  ];

  const contactOptions = [
    { icon: 'bi-telephone', label: 'Call Us', value: '1800-123-4567', action: 'tel:18001234567', color: 'success' },
    { icon: 'bi-whatsapp', label: 'WhatsApp', value: '+91 98765 43210', action: 'https://wa.me/919876543210', color: 'success' },
    { icon: 'bi-envelope', label: 'Email', value: 'support@bonusbus.com', action: 'mailto:support@bonusbus.com', color: 'primary' },
    { icon: 'bi-chat', label: 'Live Chat', value: '24/7 Support', action: () => setShowChat(true), color: 'info' },
  ];

  const handleSendMessage = () => {
    if (chatInput.trim()) {
      setChatMessages([...chatMessages, { sender: 'user', message: chatInput, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }]);
      setChatInput('');
      
      // Simulate bot response
      setTimeout(() => {
        setChatMessages(prev => [...prev, { 
          sender: 'bot', 
          message: 'Thank you for your message. A support agent will respond shortly.', 
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) 
        }]);
      }, 1000);
    }
  };

  const handleSubmitTicket = () => {
    alert('Support ticket submitted successfully! We will respond within 24 hours.');
    setShowTicketModal(false);
    setTicketSubject('');
    setTicketMessage('');
  };

  return (
    <Container fluid className="px-4 py-4" style={{ background: '#f8f9fa' }}>
      {/* Header */}
      <div className="d-flex align-items-center gap-3 mb-4">
        <Button variant="link" className="p-0" onClick={() => navigate(-1)}>
          <i className="bi bi-arrow-left fs-4 text-primary"></i>
        </Button>
        <h4 className="fw-bold mb-0">Help & Support</h4>
      </div>

      {/* Contact Cards */}
      <Row className="g-3 mb-4">
        {contactOptions.map((option, index) => (
          <Col key={index} md={3}>
            <Card 
              className="border-0 shadow-sm text-center h-100"
              style={{ cursor: 'pointer' }}
              onClick={() => {
                if (typeof option.action === 'function') {
                  option.action();
                } else {
                  window.open(option.action, '_blank');
                }
              }}
            >
              <Card.Body className="p-4">
                <div className={`bg-${option.color} bg-opacity-10 rounded-circle d-inline-flex p-3 mb-3`}>
                  <i className={`bi ${option.icon} text-${option.color} fs-2`}></i>
                </div>
                <h6 className="fw-bold mb-1">{option.label}</h6>
                <small className="text-secondary">{option.value}</small>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Quick Actions */}
      <Row className="g-3 mb-4">
        <Col md={6}>
          <Card className="border-0 shadow-sm">
            <Card.Body className="d-flex align-items-center gap-3">
              <div className="bg-primary bg-opacity-10 rounded-2 p-3">
                <i className="bi bi-ticket text-primary fs-3"></i>
              </div>
              <div className="flex-grow-1">
                <h6 className="fw-bold mb-1">Cancel Booking</h6>
                <small className="text-secondary">Instant cancellation with refund</small>
              </div>
              <Button variant="link" className="text-primary" onClick={() => navigate('/bookings')}>
                <i className="bi bi-arrow-right fs-5"></i>
              </Button>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6}>
          <Card className="border-0 shadow-sm">
            <Card.Body className="d-flex align-items-center gap-3">
              <div className="bg-warning bg-opacity-10 rounded-2 p-3">
                <i className="bi bi-clock-history text-warning fs-3"></i>
              </div>
              <div className="flex-grow-1">
                <h6 className="fw-bold mb-1">Track My Bus</h6>
                <small className="text-secondary">Real-time bus tracking</small>
              </div>
              <Button variant="link" className="text-primary" onClick={() => navigate('/bookings')}>
                <i className="bi bi-arrow-right fs-5"></i>
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* FAQ Section */}
      <h5 className="fw-bold mb-3">Frequently Asked Questions</h5>
      <Card className="border-0 shadow-sm mb-4">
        <Card.Body className="p-4">
          <Accordion defaultActiveKey="0" flush>
            {faqs.map((category, catIdx) => (
              <div key={catIdx}>
                <h6 className="fw-bold mt-3 mb-2">{category.category}</h6>
                {category.questions.map((faq, idx) => (
                  <Accordion.Item key={`${catIdx}-${idx}`} eventKey={`${catIdx}-${idx}`} className="border-0 border-bottom">
                    <Accordion.Header>
                      <span className="fw-medium">{faq.q}</span>
                    </Accordion.Header>
                    <Accordion.Body>
                      <p className="text-secondary mb-0">{faq.a}</p>
                    </Accordion.Body>
                  </Accordion.Item>
                ))}
              </div>
            ))}
          </Accordion>
        </Card.Body>
      </Card>

      {/* Raise Ticket Button */}
      <Button 
        variant="primary" 
        size="lg" 
        className="w-100 rounded-pill py-3 mb-4"
        onClick={() => setShowTicketModal(true)}
      >
        <i className="bi bi-ticket-detailed me-2"></i>
        Raise a Support Ticket
      </Button>

      {/* Chat Widget */}
      {showChat && (
        <Card className="position-fixed bottom-0 end-0 m-4 shadow-lg" style={{ width: '350px', zIndex: 1050 }}>
          <Card.Header className="bg-primary text-white d-flex justify-content-between align-items-center">
            <span>
              <i className="bi bi-chat-dots me-2"></i>
              Live Chat
            </span>
            <Button variant="link" className="text-white p-0" onClick={() => setShowChat(false)}>
              <i className="bi bi-x-lg"></i>
            </Button>
          </Card.Header>
          <Card.Body style={{ height: '300px', overflowY: 'auto' }}>
            {chatMessages.map((msg, idx) => (
              <div key={idx} className={`d-flex mb-3 ${msg.sender === 'user' ? 'justify-content-end' : ''}`}>
                <div 
                  className={`p-2 rounded-3 ${msg.sender === 'user' ? 'bg-primary text-white' : 'bg-light'}`}
                  style={{ maxWidth: '80%' }}
                >
                  <small>{msg.message}</small>
                  <div className={`small ${msg.sender === 'user' ? 'text-white-50' : 'text-secondary'}`}>
                    {msg.time}
                  </div>
                </div>
              </div>
            ))}
          </Card.Body>
          <Card.Footer className="bg-white">
            <div className="d-flex gap-2">
              <Form.Control
                type="text"
                placeholder="Type your message..."
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              />
              <Button variant="primary" onClick={handleSendMessage}>
                <i className="bi bi-send"></i>
              </Button>
            </div>
          </Card.Footer>
        </Card>
      )}

      {/* Support Ticket Modal */}
      <Modal show={showTicketModal} onHide={() => setShowTicketModal(false)} centered>
        <Modal.Header closeButton className="border-0">
          <Modal.Title className="fw-bold">Raise Support Ticket</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label className="fw-medium">Subject</Form.Label>
              <Form.Select value={ticketSubject} onChange={(e) => setTicketSubject(e.target.value)}>
                <option value="">Select issue type</option>
                <option value="booking">Booking Issue</option>
                <option value="payment">Payment Problem</option>
                <option value="refund">Refund Status</option>
                <option value="technical">Technical Issue</option>
                <option value="other">Other</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label className="fw-medium">Message</Form.Label>
              <Form.Control
                as="textarea"
                rows={5}
                placeholder="Describe your issue in detail..."
                value={ticketMessage}
                onChange={(e) => setTicketMessage(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label className="fw-medium">Attachments (Optional)</Form.Label>
              <Form.Control type="file" multiple />
            </Form.Group>

            <div className="d-flex gap-3">
              <Button variant="outline-secondary" className="flex-grow-1" onClick={() => setShowTicketModal(false)}>
                Cancel
              </Button>
              <Button 
                variant="primary" 
                className="flex-grow-1" 
                onClick={handleSubmitTicket}
                disabled={!ticketSubject || !ticketMessage}
              >
                Submit Ticket
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default SupportPage;
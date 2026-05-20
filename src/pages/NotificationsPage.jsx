// src/pages/NotificationsPage.jsx
import React, { useState } from 'react';
import { Container, Card, Button, Badge, ListGroup, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const NotificationsPage = () => {
  const navigate = useNavigate();
  const [filter, setFilter] = useState('all');

  const notifications = [
    {
      id: 1,
      type: 'booking',
      title: 'Booking Confirmed',
      message: 'Your booking EV101 from Visakhapatnam to Vijayawada is confirmed',
      time: '2 hours ago',
      read: false,
      icon: 'bi-check-circle-fill',
      color: 'success'
    },
    {
      id: 2,
      type: 'payment',
      title: 'Payment Successful',
      message: '₹1,700 paid successfully for booking EV101',
      time: '2 hours ago',
      read: false,
      icon: 'bi-wallet2',
      color: 'primary'
    },
    {
      id: 3,
      type: 'offer',
      title: 'Special Offer!',
      message: 'Get 30% off on your next booking with code WEEKEND30',
      time: '1 day ago',
      read: true,
      icon: 'bi-tag-fill',
      color: 'warning'
    },
    {
      id: 4,
      type: 'reminder',
      title: 'Bus Departure Reminder',
      message: 'Your bus to Vijayawada departs tomorrow at 6:00 AM',
      time: '1 day ago',
      read: true,
      icon: 'bi-clock-fill',
      color: 'info'
    },
    {
      id: 5,
      type: 'update',
      title: 'Live Tracking Available',
      message: 'Track your bus EV103 in real-time now',
      time: '2 days ago',
      read: true,
      icon: 'bi-pin-map-fill',
      color: 'danger'
    },
    {
      id: 6,
      type: 'wallet',
      title: 'Wallet Credited',
      message: '₹100 added to your wallet from referral bonus',
      time: '3 days ago',
      read: true,
      icon: 'bi-cash-stack',
      color: 'success'
    },
    {
      id: 7,
      type: 'review',
      title: 'How was your trip?',
      message: 'Rate your recent trip EV101 and earn 25 Green Points',
      time: '4 days ago',
      read: true,
      icon: 'bi-star-fill',
      color: 'warning'
    }
  ];

  const unreadCount = notifications.filter(n => !n.read).length;

  const filteredNotifications = notifications.filter(n => {
    if (filter === 'all') return true;
    if (filter === 'unread') return !n.read;
    return n.type === filter;
  });

  const markAllAsRead = () => {
    alert('All notifications marked as read');
  };

  const getTimeColor = (time) => {
    if (time.includes('hour')) return 'danger';
    if (time.includes('day')) return 'warning';
    return 'secondary';
  };

  return (
    <Container fluid className="px-4 py-4" style={{ background: '#f8f9fa' }}>
      {/* Header */}
      <div className="d-flex align-items-center justify-content-between mb-4">
        <div className="d-flex align-items-center gap-3">
          <Button variant="link" className="p-0" onClick={() => navigate(-1)}>
            <i className="bi bi-arrow-left fs-4 text-primary"></i>
          </Button>
          <div>
            <h4 className="fw-bold mb-0">Notifications</h4>
            <p className="text-secondary mb-0">You have {unreadCount} unread notifications</p>
          </div>
        </div>
        {unreadCount > 0 && (
          <Button variant="link" className="text-primary" onClick={markAllAsRead}>
            Mark all as read
          </Button>
        )}
      </div>

      {/* Filter Tabs */}
      <div className="d-flex gap-2 mb-4 overflow-auto" style={{ whiteSpace: 'nowrap' }}>
        <Button
          variant={filter === 'all' ? 'primary' : 'outline-primary'}
          size="sm"
          className="rounded-pill px-3"
          onClick={() => setFilter('all')}
        >
          All
          <Badge bg="light" text="dark" className="ms-2">{notifications.length}</Badge>
        </Button>
        <Button
          variant={filter === 'unread' ? 'primary' : 'outline-primary'}
          size="sm"
          className="rounded-pill px-3"
          onClick={() => setFilter('unread')}
        >
          Unread
          <Badge bg="danger" className="ms-2">{unreadCount}</Badge>
        </Button>
        <Button
          variant={filter === 'booking' ? 'primary' : 'outline-primary'}
          size="sm"
          className="rounded-pill px-3"
          onClick={() => setFilter('booking')}
        >
          Bookings
        </Button>
        <Button
          variant={filter === 'payment' ? 'primary' : 'outline-primary'}
          size="sm"
          className="rounded-pill px-3"
          onClick={() => setFilter('payment')}
        >
          Payments
        </Button>
        <Button
          variant={filter === 'offer' ? 'primary' : 'outline-primary'}
          size="sm"
          className="rounded-pill px-3"
          onClick={() => setFilter('offer')}
        >
          Offers
        </Button>
      </div>

      {/* Notifications List */}
      <Card className="border-0 shadow-sm">
        <ListGroup variant="flush">
          {filteredNotifications.length === 0 ? (
            <ListGroup.Item className="text-center py-5">
              <i className="bi bi-bell-slash text-secondary" style={{ fontSize: '3rem' }}></i>
              <p className="text-secondary mt-3">No notifications found</p>
            </ListGroup.Item>
          ) : (
            filteredNotifications.map((notification) => (
              <ListGroup.Item 
                key={notification.id} 
                className={`py-3 ${!notification.read ? 'bg-primary bg-opacity-10' : ''}`}
                action
                onClick={() => alert(`Opening ${notification.title}`)}
              >
                <div className="d-flex gap-3">
                  <div className={`bg-${notification.color} bg-opacity-10 rounded-circle d-flex align-items-center justify-content-center`} 
                       style={{ width: '48px', height: '48px' }}>
                    <i className={`bi ${notification.icon} text-${notification.color} fs-4`}></i>
                  </div>
                  <div className="flex-grow-1">
                    <div className="d-flex justify-content-between align-items-start mb-1">
                      <h6 className={`fw-bold mb-0 ${!notification.read ? 'text-primary' : ''}`}>
                        {notification.title}
                        {!notification.read && (
                          <Badge bg="danger" className="ms-2">New</Badge>
                        )}
                      </h6>
                      <small className={`text-${getTimeColor(notification.time)}`}>
                        {notification.time}
                      </small>
                    </div>
                    <p className="text-secondary small mb-1">{notification.message}</p>
                    <div className="d-flex gap-2">
                      {notification.type === 'booking' && (
                        <Button size="sm" variant="outline-primary" className="rounded-pill">
                          View Booking
                        </Button>
                      )}
                      {notification.type === 'offer' && (
                        <Button size="sm" variant="warning" className="rounded-pill">
                          Apply Coupon
                        </Button>
                      )}
                      {notification.type === 'review' && (
                        <Button size="sm" variant="outline-warning" className="rounded-pill">
                          Write Review
                        </Button>
                      )}
                      {notification.type === 'reminder' && (
                        <Button size="sm" variant="outline-info" className="rounded-pill">
                          Set Reminder
                        </Button>
                      )}
                      {notification.type === 'update' && (
                        <Button size="sm" variant="outline-success" className="rounded-pill">
                          Track Now
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </ListGroup.Item>
            ))
          )}
        </ListGroup>
      </Card>

      {/* Notification Settings */}
      <Card className="border-0 shadow-sm mt-4">
        <Card.Header className="bg-white">
          <h6 className="fw-bold mb-0">Notification Settings</h6>
        </Card.Header>
        <Card.Body>
          <div className="d-flex justify-content-between align-items-center mb-3">
            <div>
              <h6 className="fw-bold mb-1">Push Notifications</h6>
              <small className="text-secondary">Receive instant alerts on your device</small>
            </div>
            <Form.Check type="switch" id="push-notifications" defaultChecked />
          </div>
          <div className="d-flex justify-content-between align-items-center mb-3">
            <div>
              <h6 className="fw-bold mb-1">Email Notifications</h6>
              <small className="text-secondary">Get updates via email</small>
            </div>
            <Form.Check type="switch" id="email-notifications" defaultChecked />
          </div>
          <div className="d-flex justify-content-between align-items-center mb-3">
            <div>
              <h6 className="fw-bold mb-1">SMS Alerts</h6>
              <small className="text-secondary">Important updates via SMS</small>
            </div>
            <Form.Check type="switch" id="sms-alerts" defaultChecked />
          </div>
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <h6 className="fw-bold mb-1">WhatsApp Updates</h6>
              <small className="text-secondary">Get booking confirmations on WhatsApp</small>
            </div>
            <Form.Check type="switch" id="whatsapp-alerts" />
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default NotificationsPage;
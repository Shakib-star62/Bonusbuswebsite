// pages/ReviewsPage.jsx
import React, { useState } from 'react';
import { Container, Row, Col, Card, Button, Form, Badge, ProgressBar, Modal, Image } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import ReactStars from 'react-stars';

const ReviewsPage = () => {
  const { busId } = useParams();
  const navigate = useNavigate();
  const [showWriteReview, setShowWriteReview] = useState(false);
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState('');
  const [selectedImages, setSelectedImages] = useState([]);
  const [filterRating, setFilterRating] = useState(0);
  const [sortBy, setSortBy] = useState('recent');

  const busInfo = {
    id: 'EV101',
    name: 'GreenLine EV',
    operator: 'GreenLine Travels',
    totalRatings: 1234,
    averageRating: 4.5,
    ratingDistribution: {
      5: 750,
      4: 300,
      3: 100,
      2: 50,
      1: 34
    }
  };

  const reviews = [
    {
      id: 1,
      user: 'Rahul Sharma',
      rating: 5,
      date: '2 days ago',
      comment: 'Amazing experience! The bus was super clean, on time, and the staff was very helpful. The WiFi worked perfectly throughout the journey.',
      helpful: 24,
      images: [
        'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=100',
        'https://images.unsplash.com/photo-1570125909232-eb263c188f7e?w=100'
      ],
      reply: 'Thank you for your kind words! We\'re glad you enjoyed your journey.',
      verified: true
    },
    {
      id: 2,
      user: 'Priya Reddy',
      rating: 4,
      date: '5 days ago',
      comment: 'Good service. Comfortable seats and smooth ride. The charging points were a bit loose but overall good experience.',
      helpful: 12,
      images: [],
      reply: null,
      verified: true
    },
    {
      id: 3,
      user: 'Venkatesh',
      rating: 5,
      date: '1 week ago',
      comment: 'Best EV bus service in AP! The green initiative is commendable. Will definitely travel again.',
      helpful: 45,
      images: [
        'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=100'
      ],
      reply: 'Thank you for supporting our green initiative!',
      verified: true
    },
    {
      id: 4,
      user: 'Lakshmi',
      rating: 3,
      date: '1 week ago',
      comment: 'Average experience. The bus was delayed by 30 mins. Seats were comfortable though.',
      helpful: 8,
      images: [],
      reply: null,
      verified: true
    }
  ];

  const ratingStats = {
    cleanliness: 4.6,
    punctuality: 4.3,
    comfort: 4.7,
    staff: 4.5,
    valueForMoney: 4.4
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    setSelectedImages([...selectedImages, ...files]);
  };

  const handleSubmitReview = () => {
    alert('Review submitted successfully! It will be published after moderation.');
    setShowWriteReview(false);
    setRating(0);
    setReviewText('');
    setSelectedImages([]);
  };

  const handleHelpful = (reviewId) => {
    alert('Thank you for your feedback!');
  };

  const filteredReviews = reviews.filter(r => filterRating === 0 || r.rating === filterRating);

  const getRatingPercent = (stars) => {
    return (busInfo.ratingDistribution[stars] / busInfo.totalRatings) * 100;
  };

  return (
    <Container fluid className="px-4 py-4" style={{ background: '#f8f9fa' }}>
      {/* Header */}
      <div className="d-flex align-items-center gap-3 mb-4">
        <Button variant="link" className="p-0" onClick={() => navigate(-1)}>
          <i className="bi bi-arrow-left fs-4 text-primary"></i>
        </Button>
        <div>
          <h4 className="fw-bold mb-0">Reviews & Ratings</h4>
          <small className="text-secondary">{busInfo.name} • {busInfo.operator}</small>
        </div>
      </div>

      {/* Overall Rating */}
      <Card className="border-0 shadow-sm mb-4">
        <Card.Body>
          <Row className="align-items-center">
            <Col md={4} className="text-center mb-3 mb-md-0">
              <div className="display-1 fw-bold text-warning">{busInfo.averageRating}</div>
              <div className="mb-2">
                {[1,2,3,4,5].map((star) => (
                  <i key={star} className={`bi bi-star-fill ${star <= busInfo.averageRating ? 'text-warning' : 'text-secondary'}`}></i>
                ))}
              </div>
              <span className="text-secondary">{busInfo.totalRatings} verified reviews</span>
            </Col>
            <Col md={8}>
              {[5,4,3,2,1].map((stars) => (
                <div key={stars} className="d-flex align-items-center gap-2 mb-2">
                  <span className="text-nowrap" style={{ width: '40px' }}>{stars} ★</span>
                  <ProgressBar 
                    now={getRatingPercent(stars)} 
                    variant="warning" 
                    className="flex-grow-1"
                    style={{ height: '8px' }}
                  />
                  <span className="text-secondary" style={{ width: '40px' }}>{busInfo.ratingDistribution[stars]}</span>
                </div>
              ))}
            </Col>
          </Row>
        </Card.Body>
      </Card>

      {/* Detailed Ratings */}
      <Card className="border-0 shadow-sm mb-4">
        <Card.Body>
          <h5 className="fw-bold mb-3">Detailed Ratings</h5>
          <Row>
            {Object.entries(ratingStats).map(([key, value]) => (
              <Col md={6} key={key}>
                <div className="d-flex align-items-center gap-2 mb-3">
                  <span className="text-capitalize" style={{ width: '100px' }}>{key}:</span>
                  <ProgressBar 
                    now={(value/5)*100} 
                    variant="success" 
                    className="flex-grow-1"
                    style={{ height: '8px' }}
                  />
                  <span className="fw-bold">{value}</span>
                </div>
              </Col>
            ))}
          </Row>
        </Card.Body>
      </Card>

      {/* Filters and Sort */}
      <Card className="border-0 shadow-sm mb-4">
        <Card.Body>
          <Row className="align-items-center">
            <Col md={6}>
              <div className="d-flex gap-2 flex-wrap">
                <Button 
                  variant={filterRating === 0 ? 'primary' : 'outline-primary'} 
                  size="sm"
                  className="rounded-pill"
                  onClick={() => setFilterRating(0)}
                >
                  All
                </Button>
                {[5,4,3,2,1].map(r => (
                  <Button 
                    key={r}
                    variant={filterRating === r ? 'primary' : 'outline-primary'} 
                    size="sm"
                    className="rounded-pill"
                    onClick={() => setFilterRating(r)}
                  >
                    {r} ★
                  </Button>
                ))}
              </div>
            </Col>
            <Col md={6}>
              <Form.Select 
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="mt-2 mt-md-0"
              >
                <option value="recent">Most Recent</option>
                <option value="helpful">Most Helpful</option>
                <option value="high">Highest Rating</option>
                <option value="low">Lowest Rating</option>
              </Form.Select>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      {/* Reviews List */}
      {filteredReviews.map((review) => (
        <Card key={review.id} className="border-0 shadow-sm mb-3">
          <Card.Body>
            <Row>
              <Col xs="auto">
                <div className="bg-primary bg-opacity-10 rounded-circle p-3">
                  <i className="bi bi-person-circle text-primary fs-4"></i>
                </div>
              </Col>
              <Col>
                <div className="d-flex justify-content-between align-items-start mb-2">
                  <div>
                    <h6 className="fw-bold mb-1">{review.user}</h6>
                    <div className="d-flex align-items-center gap-2 mb-1">
                      <div>
                        {[1,2,3,4,5].map(star => (
                          <i key={star} className={`bi bi-star-fill ${star <= review.rating ? 'text-warning' : 'text-secondary'}`}></i>
                        ))}
                      </div>
                      <Badge bg="success" pill className="px-2">Verified</Badge>
                    </div>
                    <small className="text-secondary">{review.date}</small>
                  </div>
                </div>

                <p className="mb-3">{review.comment}</p>

                {review.images.length > 0 && (
                  <div className="d-flex gap-2 mb-3">
                    {review.images.map((img, idx) => (
                      <img 
                        key={idx}
                        src={img} 
                        alt="Review" 
                        className="rounded-3"
                        style={{ width: '80px', height: '80px', objectFit: 'cover' }}
                      />
                    ))}
                  </div>
                )}

                {review.reply && (
                  <div className="bg-light p-3 rounded-3 mb-3">
                    <small className="text-primary fw-bold d-block mb-1">Operator Response:</small>
                    <p className="small text-secondary mb-0">{review.reply}</p>
                  </div>
                )}

                <div className="d-flex align-items-center gap-3">
                  <Button 
                    variant="link" 
                    className="p-0 text-secondary small"
                    onClick={() => handleHelpful(review.id)}
                  >
                    <i className="bi bi-hand-thumbs-up me-1"></i>
                    Helpful ({review.helpful})
                  </Button>
                  <Button variant="link" className="p-0 text-secondary small">
                    <i className="bi bi-share me-1"></i>
                    Share
                  </Button>
                  <Button variant="link" className="p-0 text-secondary small">
                    <i className="bi bi-flag me-1"></i>
                    Report
                  </Button>
                </div>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      ))}

      {/* Write Review Button */}
      <Button 
        variant="primary" 
        size="lg" 
        className="w-100 rounded-pill py-3 mb-4"
        onClick={() => setShowWriteReview(true)}
      >
        <i className="bi bi-pencil-square me-2"></i>
        Write a Review
      </Button>

      {/* Write Review Modal */}
      <Modal show={showWriteReview} onHide={() => setShowWriteReview(false)} centered size="lg">
        <Modal.Header closeButton className="border-0">
          <Modal.Title className="fw-bold">Write a Review</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-4">
              <Form.Label className="fw-medium">Your Rating</Form.Label>
              <div className="d-flex align-items-center gap-3">
                <ReactStars
                  count={5}
                  value={rating}
                  onChange={setRating}
                  size={40}
                  color2={'#ffc107'}
                />
                <span className="text-secondary">{rating > 0 ? `${rating} star` : 'Select rating'}</span>
              </div>
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Label className="fw-medium">Your Review</Form.Label>
              <Form.Control
                as="textarea"
                rows={5}
                placeholder="Share your experience with this bus..."
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Label className="fw-medium">Add Photos (Optional)</Form.Label>
              <div className="d-flex gap-3 flex-wrap mb-2">
                {selectedImages.map((img, idx) => (
                  <div key={idx} className="position-relative">
                    <img 
                      src={URL.createObjectURL(img)} 
                      alt="Preview" 
                      className="rounded-3"
                      style={{ width: '100px', height: '100px', objectFit: 'cover' }}
                    />
                    <Button 
                      variant="danger" 
                      size="sm" 
                      className="position-absolute top-0 end-0 rounded-circle p-1"
                      onClick={() => setSelectedImages(selectedImages.filter((_, i) => i !== idx))}
                    >
                      <i className="bi bi-x"></i>
                    </Button>
                  </div>
                ))}
                <label className="border rounded-3 d-flex align-items-center justify-content-center" 
                       style={{ width: '100px', height: '100px', cursor: 'pointer' }}>
                  <input 
                    type="file" 
                    multiple 
                    accept="image/*" 
                    className="d-none" 
                    onChange={handleImageUpload}
                  />
                  <i className="bi bi-plus-circle text-secondary fs-2"></i>
                </label>
              </div>
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Check 
                type="checkbox"
                id="anonymous"
                label="Post anonymously"
              />
            </Form.Group>

            <Alert variant="info">
              <i className="bi bi-info-circle me-2"></i>
              Your review will be published after moderation to ensure authenticity.
            </Alert>

            <div className="d-flex gap-3">
              <Button variant="outline-secondary" className="flex-grow-1" onClick={() => setShowWriteReview(false)}>
                Cancel
              </Button>
              <Button 
                variant="primary" 
                className="flex-grow-1" 
                onClick={handleSubmitReview}
                disabled={!rating || !reviewText}
              >
                Submit Review
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default ReviewsPage;
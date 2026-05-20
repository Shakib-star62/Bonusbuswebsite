// src/pages/SignupPage.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from '../context/AuthContext';
import { Container, Row, Col, Card, Form, Button, Alert, Spinner } from "react-bootstrap";

const SignupPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertVariant, setAlertVariant] = useState("success");

  const validatePhone = () => {
    if (phone.length !== 10) {
      setAlertMessage("Enter valid 10-digit mobile number");
      setAlertVariant("danger");
      setShowAlert(true);
      return false;
    }
    return true;
  };

  const validateName = () => {
    if (!name.trim()) {
      setAlertMessage("Please enter your name");
      setAlertVariant("danger");
      setShowAlert(true);
      return false;
    }
    return true;
  };

  const validateOTP = () => {
    if (otp.length !== 6) {
      setAlertMessage("Enter valid 6-digit OTP");
      setAlertVariant("danger");
      setShowAlert(true);
      return false;
    }
    return true;
  };

  const handleSendOTP = () => {
    if (!validateName() || !validatePhone()) return;
    
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setOtpSent(true);
      setAlertMessage(`OTP sent to ${phone}`);
      setAlertVariant("success");
      setShowAlert(true);
    }, 2000);
  };

  const handleVerifyOTP = async () => {
    if (!validateOTP()) return;
    
    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const userData = {
        name: name,
        email: email || `${phone}@user.com`,
        phone: phone,
        walletBalance: 100, // Signup bonus
        greenPoints: 500, // Welcome points
        memberSince: new Date().toISOString().split('T')[0],
        totalTrips: 0,
        tier: 'Silver Member'
      };
      
      await login(userData, true);
      navigate('/'); // Redirect to home
      
    } catch (error) {
      setAlertMessage("Signup failed. Please try again.");
      setAlertVariant("danger");
      setShowAlert(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container fluid className="min-vh-100 d-flex align-items-center justify-content-center bg-light">
      <Row className="w-100 justify-content-center">
        <Col xs={12} sm={8} md={6} lg={5} xl={4}>
          <Card className="border-0 shadow">
            <Card.Body className="p-5">
              <div className="text-center mb-4">
                <div className="bg-success bg-opacity-10 rounded-circle d-inline-flex p-3 mb-3">
                  <i className="bi bi-person-plus-fill text-success fs-2"></i>
                </div>
                <h3 className="fw-bold">Create Account</h3>
                <p className="text-muted small">Join Bonus Bus family</p>
              </div>

              {showAlert && (
                <Alert variant={alertVariant} onClose={() => setShowAlert(false)} dismissible className="mb-3">
                  {alertMessage}
                </Alert>
              )}

              <Form>
                <Form.Group className="mb-3">
                  <Form.Label className="small fw-medium">Full Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    disabled={otpSent}
                    size="lg"
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label className="small fw-medium">Email (Optional)</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={otpSent}
                    size="lg"
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label className="small fw-medium">Phone Number</Form.Label>
                  <Form.Control
                    type="tel"
                    placeholder="Enter 10-digit number"
                    value={phone}
                    maxLength={10}
                    onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                    disabled={otpSent}
                    size="lg"
                  />
                </Form.Group>

                {otpSent && (
                  <Form.Group className="mb-3">
                    <Form.Label className="small fw-medium">OTP Verification</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter 6-digit OTP"
                      value={otp}
                      maxLength={6}
                      onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                      size="lg"
                    />
                    <Form.Text className="text-muted">
                      Didn't receive? <Button variant="link" className="p-0" onClick={handleSendOTP}>Resend</Button>
                    </Form.Text>
                  </Form.Group>
                )}

                {!otpSent ? (
                  <Button
                    variant="primary"
                    size="lg"
                    className="w-100 py-3 fw-bold mb-4"
                    onClick={handleSendOTP}
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <Spinner size="sm" className="me-2" />
                        Sending...
                      </>
                    ) : (
                      "Send OTP"
                    )}
                  </Button>
                ) : (
                  <Button
                    variant="success"
                    size="lg"
                    className="w-100 py-3 fw-bold mb-4"
                    onClick={handleVerifyOTP}
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <Spinner size="sm" className="me-2" />
                        Verifying...
                      </>
                    ) : (
                      "Verify & Sign Up"
                    )}
                  </Button>
                )}

                {/* Signup Bonus Info */}
                <div className="bg-success bg-opacity-10 rounded-3 p-3 mb-4">
                  <h6 className="fw-bold mb-2 text-success">🎉 Signup Bonus!</h6>
                  <div className="d-flex justify-content-around">
                    <small><i className="bi bi-wallet2 me-1"></i> ₹100 Wallet</small>
                    <small><i className="bi bi-star-fill me-1 text-warning"></i> 500 Points</small>
                    <small><i className="bi bi-trophy me-1"></i> Silver Tier</small>
                  </div>
                </div>

                <div className="text-center border-top pt-4">
                  <p className="text-secondary small mb-2">
                    Already have an account?
                  </p>
                  <Button
                    variant="outline-primary"
                    onClick={() => navigate("/login")}
                    className="px-4"
                  >
                    Sign In
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default SignupPage;
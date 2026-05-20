// src/pages/LoginPage.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from '../context/AuthContext';
import { Container, Card, Form, Button, Alert, Spinner } from "react-bootstrap";

const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [timer, setTimer] = useState(60);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertVariant, setAlertVariant] = useState("success");

  // Countdown timer
  useEffect(() => {
    let interval;
    if (otpSent && timer > 0 && timer < 60) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    } else if (timer === 0) {
      setTimer(60);
    }
    return () => clearInterval(interval);
  }, [timer, otpSent]);

  const validatePhone = () => {
    if (phone.length !== 10) {
      setAlertMessage("Enter valid 10-digit mobile number");
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

  const requestOTP = () => {
    if (!validatePhone()) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setOtpSent(true);
      setTimer(59);
      setAlertMessage(`OTP sent to ${phone}`);
      setAlertVariant("success");
      setShowAlert(true);
    }, 2000);
  };

  const verifyOTP = async () => {
    if (!validateOTP()) return;
    setLoading(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const userData = {
        name: 'Shakib Ahmed',
        email: 'shakib@example.com',
        phone: phone,
        walletBalance: 2450.75,
        greenPoints: 1250,
        memberSince: '2023-06-15',
        totalTrips: 24,
        tier: 'Gold Member'
      };
      
      await login(userData, rememberMe);
      navigate('/'); // Redirect to home
      
    } catch (error) {
      setAlertMessage("Invalid OTP. Please try again.");
      setAlertVariant("danger");
      setShowAlert(true);
    } finally {
      setLoading(false);
    }
  };

  const resendOTP = () => {
    setTimer(59);
    setAlertMessage(`OTP resent to ${phone}`);
    setAlertVariant("success");
    setShowAlert(true);
  };

  return (
    <Container fluid className="min-vh-100 d-flex flex-column align-items-center py-4" style={{ backgroundColor: '#f8f9fa' }}>
      
      {/* Logo */}
      <div 
        className="d-flex justify-content-center align-items-center rounded-circle mb-3"
        style={{ 
          width: '120px', 
          height: '120px', 
          background: 'linear-gradient(135deg, #1e88e5, #4caf50)',
          marginTop: '40px'
        }}
      >
        <i className="bi bi-bus-front text-white" style={{ fontSize: '60px' }}></i>
      </div>

      <h1 className="text-primary display-4 fw-bold">BONUS BUS</h1>
      <p className="text-success fs-5">EV Bus Service - Go Green!</p>
      <p className="text-secondary mb-4">Andhra Pradesh</p>

      {/* Alert Message */}
      {showAlert && (
        <Alert 
          variant={alertVariant} 
          onClose={() => setShowAlert(false)} 
          dismissible
          className="w-100"
          style={{ maxWidth: '400px' }}
        >
          {alertMessage}
        </Alert>
      )}

      {/* Login Card */}
      <Card className="border-0 shadow-sm w-100" style={{ maxWidth: '400px', backgroundColor: '#e3f2fd' }}>
        <Card.Body className="p-4">
          <Form onSubmit={(e) => e.preventDefault()}>
            <Form.Group className="mb-3">
              <Form.Control
                type="tel"
                placeholder="Enter 10-digit mobile number"
                maxLength={10}
                value={phone}
                onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                className="py-2"
                disabled={otpSent}
              />
            </Form.Group>

            {otpSent && (
              <div className="position-relative mb-3">
                <Form.Group>
                  <Form.Control
                    type="text"
                    placeholder="Enter 6-digit OTP"
                    maxLength={6}
                    value={otp}
                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                    className="py-2"
                  />
                </Form.Group>
                <Button
                  variant="link"
                  className="position-absolute end-0 top-0 text-primary text-decoration-none"
                  disabled={timer !== 60}
                  onClick={resendOTP}
                  style={{ marginTop: '6px' }}
                >
                  {timer === 60 ? "Resend OTP" : `Resend in ${timer}s`}
                </Button>
              </div>
            )}

            <Form.Group className="mb-3">
              <Form.Check
                type="checkbox"
                label="Remember me"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
            </Form.Group>

            {!otpSent ? (
              <Button 
                variant="primary" 
                className="w-100 py-2 fw-bold"
                onClick={requestOTP}
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Spinner
                      as="span"
                      animation="border"
                      size="sm"
                      role="status"
                      aria-hidden="true"
                      className="me-2"
                    />
                    Sending...
                  </>
                ) : (
                  "REQUEST OTP"
                )}
              </Button>
            ) : (
              <Button 
                variant="success" 
                className="w-100 py-2 fw-bold"
                onClick={verifyOTP}
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Spinner
                      as="span"
                      animation="border"
                      size="sm"
                      role="status"
                      aria-hidden="true"
                      className="me-2"
                    />
                    Verifying...
                  </>
                ) : (
                  "VERIFY & LOGIN"
                )}
              </Button>
            )}

            <p className="text-center mt-3 mb-0">
              Don't have an account?{' '}
              <Button 
                variant="link" 
                className="p-0 text-primary fw-bold text-decoration-none"
                onClick={() => navigate("/signup")}
              >
                Sign Up
              </Button>
            </p>
          </Form>
        </Card.Body>
      </Card>

      {/* EV Message */}
      <Card className="border-success mt-4 w-100" style={{ maxWidth: '420px', backgroundColor: '#e8f5e9' }}>
        <Card.Body className="d-flex align-items-center gap-3">
          <i className="bi bi-tree text-success" style={{ fontSize: '30px' }}></i>
          <div>
            <h6 className="fw-bold mb-1">Travel Green with EV Buses</h6>
            <p className="text-secondary small mb-0">Reducing Carbon Emissions in AP</p>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default LoginPage;
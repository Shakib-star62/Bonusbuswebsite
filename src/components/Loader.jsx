// src/components/Loader.jsx
import React from 'react';
import { Spinner, Container } from 'react-bootstrap';

const Loader = ({ size = 'md', variant = 'primary', text = 'Loading...' }) => {
  const sizeMap = {
    sm: { width: '2rem', height: '2rem' },
    md: { width: '3rem', height: '3rem' },
    lg: { width: '4rem', height: '4rem' }
  };

  return (
    <Container className="d-flex flex-column align-items-center justify-content-center py-5">
      <Spinner 
        animation="border" 
        variant={variant} 
        style={sizeMap[size]} 
        role="status"
      />
      {text && <p className="mt-3 text-secondary">{text}</p>}
    </Container>
  );
};

export default Loader;
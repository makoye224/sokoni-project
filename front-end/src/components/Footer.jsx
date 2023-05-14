import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const Footer = () => {
  return (
    <footer className="bg-dark text-white py-3">
      <Container>
        <Row>
          <Col md={6}>
            <p>&copy; 2023 Sokoni - Supporting small businessmen and providing high-quality products</p>
          </Col>
          <Col md={6} className="text-md-end">
            <p>Follow Us:</p>
            <ul className="" >
              <a href="#"><p>Facebook</p></a>
              <a href="#"><p>Twitter</p></a>
             <a href="#"><p>Instagram</p></a>
            </ul>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;

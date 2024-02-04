import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import Logo from "../assets/images/etherealeclat.png";
import 'bootstrap/dist/css/bootstrap.min.css';
const Footer = () => {
  return (
    <footer className="bg-dark text-light py-4">
      <Container>
        <Row>
          <Col xs={12} md={6} className="text-center text-md-left mb-3 mb-md-0">
            <p>&copy; 2024 Your Company. All rights reserved.</p>
          </Col>
          <Col xs={12} md={6} className="text-center text-md-right">
            <img src={Logo} alt="Company Logo" width="100" />
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;

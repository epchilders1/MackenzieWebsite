import React from 'react';
import './App.css';
import './Contact.css';
import { Container, Nav, Navbar, Carousel } from 'react-bootstrap';

function Contact() {
  return (
    <div className="contact-page">
    <div className="Contact">
    <Navbar className="navbar-custom" expand="lg">
        <Container>
          <Navbar.Brand href="/" className="navbar-brand-custom">Mackenzie Sweat</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link href="/blog">Blog</Nav.Link>
              <Nav.Link href="/contact">Contact</Nav.Link>
              <Nav.Link href="/about-me">About Me</Nav.Link>
              <Nav.Link href="/gallery">Gallery</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <div className= "contact-container">
      <h1>Contact Me</h1>
      <p>Phone Number: 404 984-4114</p>
      <p>Email: mjsweat18@gmail.com</p>
      <p>Instagram: <a href="https://www.instagram.com/mackenziejane.photography/">mackenziejane.photography</a></p>
      </div>
    </div>
    </div>
  );
}

export default Contact;

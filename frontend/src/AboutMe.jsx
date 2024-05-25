import React from 'react';
import { Container, Nav, Navbar, Carousel } from 'react-bootstrap';
import './AboutMe.css';
import kenzieField from './assets/kenzieField.jpeg'

function AboutMe() {
  return (
      <div className="AboutMe">
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
      <div className="aboutme-container">
      <div className="photo">
      <img
              className="d-block w-100"
              src={kenzieField}
              alt="Kenzie Field"
            />
            </div>
            <div className="text-box">
      <h1>About Me</h1>
      <p>Hey! I'm Mackenzie Sweat, a junior majoring in Communications at the University of Tennessee at Chattanooga. Ever since I can remember, I've been passionate about photography. Whether it was capturing the beauty of nature, the energy of a bustling city, or the candid moments of everyday life, I've always found joy in freezing those special moments in time. Here, you'll find a collection of my favorite shots, each one telling its own unique story. I hope you enjoy exploring my work as much as I enjoyed creating it!</p>
      </div>
      </div>
    </div>
  );
}

export default AboutMe;

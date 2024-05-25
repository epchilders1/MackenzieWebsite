import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import painting from './assets/painting.jpg';
import LA from './assets/LA.jpeg';
import house from './assets/chatthouse.jpeg';
import './HomePage.css'; // Rename App.css to HomePage.css
import { Container, Nav, Navbar, Carousel } from 'react-bootstrap';
import wall from './assets/wall.jpeg';

function HomePage() {
  return (
    <div className="HomePage">
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
      <div className="carousel-container">
        <Carousel fade interval={5000}>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src={painting}
              alt="Painting"
            />
            <Carousel.Caption>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src={LA}
              alt="Los Angeles Skyline"
            />
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src={house}
              alt="Chattanooga House"
            />
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src={wall}
              alt="wall"
            />
            <Carousel.Caption>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      </div>
    </div>
  );
}

export default HomePage;

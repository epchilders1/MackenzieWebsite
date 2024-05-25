import React from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import {getProducts} from "../public/data/galleryImage";
import { getImageURL } from "../public/utils/galleryImage-util";
import './App.css';
import './Gallery.css';

function Gallery() {
  const products = getProducts();

  return (
    <div className="Gallery">
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
      
      {/* Access files from the specified directory */}
     {/* Access files from the specified directory */}
     <div className="gallery-container">
    <ul className="gallery-grid">
        {
            products.map(product => (
                <li
                    key={product.id}
                    className="gallery-image" // Add class for individual gallery images
                >
                    <img
                        src={getImageURL(product.cover)}
                        alt={product.name}
                        className="w-full object-cover"
                        style={{ maxWidth: '400px'}} // Apply max-width to limit the image size
                    />
                </li>
            ))
        }
    </ul>
</div>



    </div>
  );
}

export default Gallery;

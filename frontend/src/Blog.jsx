import React, { useState } from 'react';
import { Container, Nav, Navbar, Row, Col, Modal, Carousel, Button } from 'react-bootstrap';
import { getImageURL } from "../public/utils/blogImage-util";
import { getPosts } from "../public/data/blogData";
import './Blog.css';

function Blog() {
  const posts = getPosts();

  const [showModal, setShowModal] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);

  const handleCarouselClick = (post) => {
    setSelectedPost(post);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedPost(null);
  };

  return (
    <div className="Blog">
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

      <Container className="blog-page">
        <Row xs={1} md={2} className="mb-0">
          {posts.map((post, index) => (
            <Col key={post.id} className="mb-3">
              <Button 
                variant="light"
                className="custom-button w-100 p-0 rounded-0" // Added p-0 class to remove padding
                onClick={() => handleCarouselClick(post)}
              >
                <img 
                  src={getImageURL(post.images[0])} 
                  alt={`Thumbnail ${index}`} 
                  className="thumbnail-image"
                />
              </Button>
            </Col>
          ))}
        </Row>
      </Container>

      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Body>
          <div className="modal-body">
            <Carousel>
              {selectedPost && selectedPost.images.map((image, index) => (
                <Carousel.Item key={index}>
                  <img
                    src={getImageURL(image)}
                    alt={`Image ${index + 1}`}
                    className="d-block w-100"
                  />
                </Carousel.Item>
              ))}
            </Carousel>
            {selectedPost && (
              <div className="description">
                <p className="description-text">{selectedPost.desc}</p>
              </div>
            )}
          </div>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Blog;

import React, { useState } from 'react';
import './App.css';
import './FormSubmit.css';
import { Container, Nav, Navbar, Form as BootstrapForm, Button } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

function Form() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [reason, setReason] = useState('');
  const [selectedDate, setSelectedDate] = useState(null); // State for selected date and time

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission logic here
    console.log('Name:', name);
    console.log('Phone:', phone);
    console.log('Reason:', reason);
    console.log('Selected Date:', selectedDate);
  };

  return (
    <div className="form-page">
      <div className="Form">
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
                <Nav.Link href="/form">Booking</Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
        <div className="form-container">
          <h1>Booking</h1>
          <BootstrapForm onSubmit={handleSubmit}>
            <BootstrapForm.Group controlId="formName">
              <BootstrapForm.Label>Name</BootstrapForm.Label>
              <BootstrapForm.Control
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </BootstrapForm.Group>
            <BootstrapForm.Group controlId="formPhone">
              <BootstrapForm.Label>Phone Number</BootstrapForm.Label>
              <BootstrapForm.Control
                type="tel"
                placeholder="Enter your phone number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            </BootstrapForm.Group>
            <BootstrapForm.Group controlId="formReason">
              <BootstrapForm.Label>Booking Description</BootstrapForm.Label>
              <BootstrapForm.Control
                as="textarea"
                rows={3}
                placeholder="Describe the reason for your booking"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                required
              />
            </BootstrapForm.Group>
            <BootstrapForm.Group controlId="formDate">
              <BootstrapForm.Label>Select Date and Time (EST)</BootstrapForm.Label>
              <br />
              <DatePicker
                selected={selectedDate}
                onChange={(date) => setSelectedDate(date)}
                showTimeSelect
                timeFormat="h:mm aa"
                timeIntervals={15}
                dateFormat="MMMM d, yyyy h:mm aa"
                className="form-control"
                placeholderText="Click to select date and time"
                required
              />
            </BootstrapForm.Group>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </BootstrapForm>
        </div>
      </div>
    </div>
  );
}

export default Form;

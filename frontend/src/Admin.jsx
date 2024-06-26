import React, { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import { Container, Nav, Navbar, Button } from 'react-bootstrap';
import axios from 'axios'; // Import axios for making HTTP requests
import { createRef } from 'react';
import './Admin.css';

function Admin() {
    const [user, setUser] = useState({});
    const [loginAttempt, setLoginAttempt] = useState(false);
    const acceptableEmails = ["echilders2004@gmail.com", "mjsweat18@gmail.com"];
    const [image, setImage] = useState(null);
    const [description, setDescription] = useState('');
    const [selectedButton, setSelectedButton] = useState(''); // State to track selected button
    const [showDescriptionField, setShowDescriptionField] = useState(false); // State to manage visibility of description field
    const fileInput = createRef();

    const onGallerySubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("avatar", fileInput.current.files[0]); // Access files array
        
        try {
            console.log('Submitting file to /profile');
            const response = await fetch('https://kenzie-websiteapp-08e2d0899b03.herokuapp.com/profile', { // Correct URL https://kenzie-websiteapp-08e2d0899b03.herokuapp.com/profile
                method: 'POST',
                body: formData
            });
            if (response.ok) {
                alert("File uploaded successfully");
            } else {
                const errorText = await response.text();
                console.error('Upload error:', errorText);
                alert("Some error occurred");
            }
        } catch (error) {
            console.error('Error uploading file:', error);
            alert("Some error occurred");
        }
    };
    
    const onBlogSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        const files = fileInput.current.files;
    
        // Append description field to FormData
        formData.append("description", description);
    
        // Append each file to FormData
        for (let i = 0; i < files.length; i++) {
            formData.append("images", files[i]);
        }
    
        try {
            console.log('Submitting files to /blogpost');
            const response = await fetch('https://kenzie-websiteapp-08e2d0899b03.herokuapp.com/blogpost', {
                method: 'POST',
                body: formData
            });
            if (response.ok) {
                alert("Blog post created successfully");
            } else {
                const errorText = await response.text();
                console.error('Upload error:', errorText);
                alert("Some error occurred");
            }
        } catch (error) {
            console.error('Error creating blog post:', error);
            alert("Some error occurred");
        }
    };
    


    function handleCallbackResponse(response) {
        console.log("Encoded JWT ID token: " + response.credential);
        var userObject = jwtDecode(response.credential);
        console.log(userObject);
        setUser(userObject);
        setLoginAttempt(true);
    }

    useEffect(() => {
        console.log('Client ID:', process.env.REACT_APP_GOOGLE_CLIENT_ID);

        const script = document.createElement('script');
        script.src = 'https://accounts.google.com/gsi/client';
        script.async = true;
        script.defer = true;
        document.body.appendChild(script);

        script.onload = () => {
            if (window.google) {
                window.google.accounts.id.initialize({
                    client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
                    callback: handleCallbackResponse
                });

                window.google.accounts.id.renderButton(
                    document.getElementById('signInDiv'),
                    { theme: 'outline', size: 'large' }
                );
            } else {
                console.error('Google Sign-In script failed to load');
            }
        };

        return () => {
            document.body.removeChild(script);
        };
    }, []);


    // Function to handle file input change
    const handleFileChange = (e) => {
        setImage(e.target.files);
    };

    // Function to handle button click
    const handleButtonClick = (button) => {
        setSelectedButton(button);
        setShowDescriptionField(button === 'blog'); // Show description field only for "Upload to Blog" button
    };

    // Function to handle description input change for blog
    const handleDescriptionChange = (e) => {
        setDescription(e.target.value);
    };

    return (
        <div className="Admin">
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
                            <Nav.Link href="/admin">Admin</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <div className="admin-container">
    {!acceptableEmails.includes(user.email) && loginAttempt && (
        <>
            <h1>Invalid Credentials</h1>
            {/* Remove the "Verify Identity" section and the sign-in button */}
        </>
    )}
    {!acceptableEmails.includes(user.email) && !loginAttempt && (
        <>
            <h1>Verify Identity to continue</h1>
            <div id="signInDiv"></div>
        </>
    )}
    {acceptableEmails.includes(user.email) && (
        <>
            <p className="welcome-text">Welcome {user.name}</p>
            {selectedButton && (
                <form onSubmit={selectedButton === 'blog' ? onBlogSubmit : onGallerySubmit}>
                {selectedButton === 'blog' && (
                    <div>
                        <label>Description:</label>
                        <input 
                            type="text" 
                            name="description" 
                            value={description} 
                            onChange={handleDescriptionChange} 
                            placeholder="Description" 
                        />
                    </div>
                )}
                <input 
                    type="file" 
                    name="images" // Ensure that the name attribute matches the parameter name used in multer
                    ref={fileInput} 
                    multiple 
                />
                <input type="submit" value="Submit" />
            </form>
            )}
            {!selectedButton && (
                <div className="button-group">
                    <Button 
                        variant="primary" 
                        className="upload-button" 
                        onClick={() => handleButtonClick('blog')} // Show description field only for "Upload to Blog" button
                    >
                        Upload To Blog
                    </Button>{' '}
                    <Button 
                        variant="primary" 
                        className="upload-button" 
                        onClick={() => handleButtonClick('gallery')}
                    >
                        Upload To Gallery
                    </Button>
                </div>
            )}
        </>
    )}
</div>

        </div>
    );
}

export default Admin;

import React from 'react';
import './App.css';
import HomePage from './HomePage.jsx';
import AboutMe from './AboutMe.jsx';
import Blog from './Blog.jsx';
import Contact from './Contact.jsx';
import Gallery from './Gallery.jsx';
import Admin from './Admin.jsx';
import Form from './FormSubmit.jsx';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router basename="/">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about-me" element={<AboutMe />} />
        <Route path="/blog" element={<Blog />} /> 
        <Route path="/contact" element={<Contact />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/form" element={<Form />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </Router>
  );
}

export default App;

// src/components/Navbar/CustomerNavbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import './CustomerNavbar.css';
import { FaShoppingCart } from 'react-icons/fa';

const CustomerNavbar = () => {
  return (
    <Navbar expand="lg" className='fixed-top bg-body-primary shadow'>
      <Container>
        <Navbar.Brand>
          <Link to="/" className='navbar-brand text-success fw-semibold'>
            ABC Restaurant
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls='customer-navbar-nav' />
        <Navbar.Collapse id='customer-navbar-nav'>
          <Nav className='me-auto justify-content-end w-100'>
            <Link to="/customerdashboard" className='nav-link active text-uppercase'>Home</Link>
            <Link to="/menu" className='nav-link text-uppercase'>Menu</Link>
            <Link to="/gallery" className='nav-link text-uppercase'>Gallery</Link>
            <Link to="/reservation" className='nav-link text-uppercase'>Reservation</Link>
            <Link to="/about" className='nav-link text-uppercase'>About</Link>
            <Link to="/contact" className='nav-link text-uppercase'>Contact</Link>
            <Link to="/feedback" className='nav-link text-uppercase'>Feedback</Link>
            <Link to='/cart' className='nav-link text-uppercase cart-icon' aria-label="Cart">
              <FaShoppingCart style={{ fontSize: '2rem', color: 'green' }} />
            </Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default CustomerNavbar;

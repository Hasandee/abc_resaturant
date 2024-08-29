// src/components/Navbar/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import { FaShoppingCart } from 'react-icons/fa';

const AppNavbar = ({ setShowLogin }) => {
  return (
    <Navbar expand="lg" className='fixed-top bg-body-tertiary shadow'>
      <Container>
        <Navbar.Brand>
          <Link to="/" className='navbar-brand text-success fw-semibold'>
            ABC Restaurant
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls='basic-navbar-nav' />
        <Navbar.Collapse id='basic-navbar-nav'>
          <Nav className='me-auto justify-content-end w-100'>
            <Link to="/" className='nav-link active text-uppercase'>Home</Link>
            <Link to="/menu" className='nav-link text-uppercase'>Menu</Link>
            <Link to="/gallery" className='nav-link text-uppercase'>Gallery</Link>
            <Link to="/reservation" className='nav-link text-uppercase'>Reservation</Link>
            <Link to="/about" className='nav-link text-uppercase'>About</Link>
            <Link to="/contact" className='nav-link text-uppercase'>Contact</Link>
          </Nav>
          <Nav>
            <Button 
              variant='outline-success' 
              className='text-uppercase' 
              onClick={() => setShowLogin(true)} 
            >
              Sign In
            </Button>
            <Link to='/cart' className='nav-link text-uppercase cart-icon' aria-label="Cart">
              <FaShoppingCart style={{ fontSize: '2rem' }} />
            </Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default AppNavbar;

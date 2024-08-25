import './App.css';
import { Link, Routes, Route } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import Home from './pages/Home'; 
import Menu from './pages/Menu';
import Gallery from './pages/Gallery';
import Reservation from './pages/Reservation';
import About from './pages/About';
import Contact from './pages/Contact';
import { FaShoppingCart } from 'react-icons/fa'; 
import React from 'react';
import Cart from './pages/Cart/Cart';
import Admin from './components/Admin';
import PlaceOrder from './pages/PlaceOrder/PlaceOrder';
import Footer from './components/Footer/Footer';

function App() {
  return (
    <div>
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
              <Button variant='outline-success' className='text-uppercase'>
                Sign In
              </Button>
              <Link to='/cart' className='nav-link text-uppercase cart-icon' aria-label="Cart">
                <FaShoppingCart style={{ fontSize: '2rem' }} />
              </Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/menu' element={<Menu />} /> 
        <Route path='/gallery' element={<Gallery />} />
        <Route path='/reservation' element={<Reservation />} />
        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<Contact />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/order" element={<PlaceOrder />} />
      </Routes>

    <Footer />
    </div>
  );
}

export default App;

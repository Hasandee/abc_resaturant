// src/App.js
import React, { useState } from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home'; 
import Menu from './pages/Menu';
import Gallery from './pages/Gallery';
import Reservation from './pages/Reservation';
import About from './pages/About';
import Contact from './pages/Contact';
import Cart from './pages/Cart/Cart';
import PlaceOrder from './pages/PlaceOrder/PlaceOrder';
import LoginPopup from './components/LoginPopup/LoginPopup'; 
import AdminDashboard from './components/AdminDashboard/AdminDashboard';
import AdminGallery from './components/AdminDashboard/AdminGallery';
import StaffDashboard from './components/StaffDashboard/StaffDashboard';
import AppNavbar from './components/Navbar/Navbar';

const App = () => {
  const [showLogin, setShowLogin] = useState(false);

  return (
    <>
      {showLogin ? <LoginPopup setShowLogin={setShowLogin}/>:<></>}
      <div className='app'>
        <AppNavbar setShowLogin={setShowLogin} />  {/* Use Navbar */}
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/menu' element={<Menu />} /> 
          <Route path='/gallery' element={<Gallery />} />
          <Route path='/reservation' element={<Reservation />} />
          <Route path='/about' element={<About />} />
          <Route path='/contact' element={<Contact />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/order" element={<PlaceOrder />} />
          <Route path="/admindashboard" element={<AdminDashboard />} />
          <Route path="/admingallery" element={<AdminGallery />} />
          <Route path="/staffdashboard" element={<StaffDashboard />} />
        </Routes>
      </div>
    </>
  );
}

export default App;

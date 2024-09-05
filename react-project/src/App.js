import React, { useState } from 'react';
import './App.css';
import { Routes, Route, useLocation } from 'react-router-dom';
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
import HomeNavbar from './components/Navbar/HomeNavbar';
import AdminReservations from './components/AdminDashboard/AdminReservations';
import AdminUsers from './components/AdminDashboard/AdminUsers';
import CustomerDashboard from './components/CustomerDashboard/CustomerDashboard';
import CustomerNavbar from './components/Navbar/CustomerNavbar';
import StaffReservations from './components/StaffDashboard/StaffReservations';
import Feedback from './components/Feedback/Feedback';
import AdminFeedback from './components/AdminDashboard/AdminFeedback';
import GuestMenu from './pages/GuestMenu';
import AdminProduct from './components/AdminDashboard/AdminProduct';
import ExampleComponent from './components/ExampleComponent';
import Offers from './pages/Offers';
import AdminOffers from './components/AdminDashboard/AdminOffers';
import AdminBranch from './components/AdminDashboard/AdminBranch';
import AdminCategory from './components/AdminDashboard/AdminCategory';
import AdminOrder from './components/AdminDashboard/AdminOrder';
import StaffOrder from './components/StaffDashboard/StaffOrder';
import Query from './components/Query/Query';
import StaffQuery from './components/StaffDashboard/StaffQuery';
import ViewQuery from './components/ViewQuery';
import AdminQuery from './components/AdminDashboard/AdminQuery';
import AdminFacility from './components/AdminDashboard/AdminFacility';
import Facility from './components/Facilities/Facility';



const App = () => {
  const [showLogin, setShowLogin] = useState(false);
  const location = useLocation();

  // Check if the current path is an admin-related route
  const isAdminRoute = location.pathname.startsWith('/admindashboard') || 
                       location.pathname.startsWith('/admingallery') ||
                       location.pathname.startsWith('/adminreservation') ||
                       location.pathname.startsWith('/adminuser') ||
                       location.pathname.startsWith('/adminfeedback') ||
                       location.pathname.startsWith('/adminorder') ||
                       location.pathname.startsWith('/adminquery') ||
                       location.pathname.startsWith('/adminbranch');

const isStaffRoute = location.pathname.startsWith('/staffdashboard') || 
                       location.pathname.startsWith('/stafforder') ||
                       location.pathname.startsWith('/staffreservation') ;
                       location.pathname.startsWith('/staffquery') ;
                    


  const isCustomerDashboard = location.pathname === '/customerdashboard';
  
  return (
    <>
      {showLogin ? <LoginPopup setShowLogin={setShowLogin}/> : null}
      <div className='app'>
        {/* Render HomeNavbar only if it's not an admin route */}
        {!isAdminRoute && !isCustomerDashboard && !isStaffRoute && <HomeNavbar setShowLogin={setShowLogin} />}  
        
        {/* Render CustomerNavbar only on the customer dashboard */}
        {isCustomerDashboard && <CustomerNavbar />}  
        
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
          <Route path="/customerdashboard" element={<CustomerDashboard />} />
          <Route path="/adminreservation" element={<AdminReservations />} />
          <Route path="/adminuser" element={<AdminUsers />} />
          <Route path="/staffreservation" element={<StaffReservations />} />
          <Route path="/feedback" element={<Feedback />} />
          <Route path="/adminfeedback" element={<AdminFeedback />} />
          <Route path="/guestmenu" element={<GuestMenu />} />
          <Route path="/adminproduct" element={<AdminProduct />} />
          <Route path="/examplecomponent" element={<ExampleComponent />} />
          <Route path="/offers" element={<Offers />} />
          <Route path="/adminoffers" element={<AdminOffers />} />
          <Route path="/adminbranch" element={<AdminBranch />} />
          <Route path="/facility" element={<Facility />} />
          <Route path="/admincategory" element={<AdminCategory />} />
          <Route path="/adminorder" element={<AdminOrder />} />
          <Route path="/admin/orders/add" element={<AdminOrder />} />
        <Route path="/admin/orders/edit/:orderId" element={<AdminOrder />} />
        <Route path="/stafforder" element={<StaffOrder />} />
        <Route path="/query" element={<Query />} />
        <Route path="/staffquery" element={<StaffQuery />} />
        <Route path="/viewquery" element={<ViewQuery />} />
        <Route path="/adminquery" element={<AdminQuery />} />
        <Route path="/adminfacility" element={<AdminFacility />} />
        
        
       
        </Routes>
      </div>
    </>
  );
}

export default App;

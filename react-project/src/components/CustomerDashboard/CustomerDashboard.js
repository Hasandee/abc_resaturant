
import React from 'react';
import './CustomerDashboard.css';
import CustomerNavbar from '../Navbar/CustomerNavbar'; 

function Home() {
  return (
    <div className='customerhome-page'>
      <CustomerNavbar /> 
      <header className='h-100 min-vh-100 d-flex align-items-center text-light shadow'>
        <div className='container'>
          <div className='row'>
            <div className='col-sm-6 d-flex d-sm-block flex-column align-items-center'>
              <h2 className='mb-0 text-black fw-bold'>Welcome To</h2>
              <h1 className='mb-5 text-black fw-bold text-center text-sm-start'>ABC Restaurant</h1>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}

export default Home;

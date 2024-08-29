// src/pages/Home.js
import React from 'react';
import { Link } from 'react-router-dom';
import { MenuBtn } from '../components/MenuBtn';
import './Home.css';
import AboutImg from '../utils/img/img3.jpg';
import { ImageGallery } from '../components/ImageGallery';
import { ContactInfo } from '../components/ContactInfo';
import ContactImage from '../utils/img/img11.jpg';
import Footer from '../components/Footer/Footer';


function Home() {
  return (
    <div className='home-page'>
      <header className='h-100 min-vh-100 d-flex align-items-center text-light shadow'>
        <div className='container'>
          <div className='row'>
            <div className='col-sm-6 d-flex d-sm-block flex-column align-items-center'>
              <h2 className='mb-0 text-black fw-bold'>Welcome To</h2>
              <h1 className='mb-5 text-black fw-bold text-center text-sm-start'>ABC Restaurant</h1>
              <MenuBtn />
            </div>
          </div>
        </div>
      </header>

      <div className='container my-5'>
        <div className='row'>
          <div className='col-lg-6 d-flex justify-content-center d-none d-lg-flex'>
            <img src={AboutImg} className='img-fluid w-50' alt="about img" />
          </div>
          <div className='col-lg-6 d-flex flex-column align-items-center justify-content-center'>
            <h2 className='fs-1 mb-5 text-uppercase fw-bold'>About Us</h2>
            <p>Welcome to ABC Restaurant, where culinary passion meets exceptional service! Established in 2012, we have been dedicated to providing our guests with an unforgettable dining experience.</p>
            <p className='mb-5'>We have been committed to creating memorable dining experiences with fresh, locally sourced ingredients. Our welcoming atmosphere is the perfect place to enjoy a meal, celebrate special moments, and create lasting memories.</p>
            <Link to="/about">
              <button type='button' className='btn btn-outline-success btn-lg custom-about-btn'>More About Us</button>
            </Link>
          </div>
        </div>
      </div>

      <div className='menu-section py-5 text-light shadow'>
        <div className='container d-flex flex-column align-items-center'>
          <h2 className='fs-1 mb-5 text-uppercase fw-bold'>Our Favorites</h2>
          <div className='row mb-5 w-100'>
            <div className='col-lg-6 d-flex flex-column align-items-center mb-5 mb-lg-0'>
              <h3 className='fs-2 mb-5'>Food</h3>
              <ul className='px-0'>
                <li className='d-flex justify-content-between'>
                  <p className='fs-3 mx-2'>English Breakfast</p>
                  <p className='fs-3 mx-2 text-success fw-bold'>£12</p>
                </li>
                <li className='d-flex justify-content-between'>
                  <p className='fs-3 mx-2'>Spicy Beef</p>
                  <p className='fs-3 mx-2 text-success fw-bold'>£15</p>
                </li>
                <li className='d-flex justify-content-between'>
                  <p className='fs-3 mx-2'>Spaghetti Bolognese</p>
                  <p className='fs-3 mx-2 text-success fw-bold'>£11</p>
                </li>
              </ul>
            </div>
            <div className='col-lg-6 d-flex flex-column align-items-center mb-5 mb-lg-0'>
              <h3 className='fs-2 mb-5'>Drinks</h3>
              <ul className='px-0'>
                <li className='d-flex justify-content-between'>
                  <p className='fs-3 mx-2'>Coffee</p>
                  <p className='fs-3 mx-2 text-success fw-bold'>£2</p>
                </li>
                <li className='d-flex justify-content-between'>
                  <p className='fs-3 mx-2'>Juice</p>
                  <p className='fs-3 mx-2 text-success fw-bold'>£1</p>
                </li>
                <li className='d-flex justify-content-between'>
                  <p className='fs-3 mx-2'>Spirits</p>
                  <p className='fs-3 mx-2 text-success fw-bold'>£5</p>
                </li>
              </ul>
            </div>
          </div>
          <Link to="/menu">
            <button type='button' className='btn btn-outline-success btn-lg'>Go to Menu</button>
          </Link>
        </div>
      </div>

      <ImageGallery />
      <div className='bg-dark text-light py-5 shadow'>
        <div className='container'>
          <div className='row'>
            <div className='col-lg-6 d-flex flex-column align-items-center justify-content-center mb-5 mb-lg-0'>
              <ContactInfo />
            </div>
            <div className='col-lg-6 d-flex justify-content-center'>
              <img src={ContactImage} className='img-fluid w-50' alt="contact img" />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Home;

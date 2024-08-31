import React from 'react';
import './About.css';
import AboutChef1 from '../utils/img/about-chef1.jpg';
import AboutChef2 from '../utils/img/about-chef2.jpg';
import { ImageGallery } from '../components/ImageGallery';
import Footer from '../components/Footer/Footer';


function About() {
    return (
        <div className='about-page'>
            <header className='mt-5'>
                <div className='container h-100 d-flex align-items-center justify-content-center'>
                    <h1 className='text-light'>About</h1>
                </div>
            </header>

            <div className='container my-5'>
                <p>Welcome to ABC Restaurant, where culinary passion meets exceptional service. Nestled in the heart of Colombo, we are more than just a dining destination—we are a celebration of flavors, community, and the art of gastronomy. </p>
                <p>Since our founding in 2012, our mission has been to craft memorable dining experiences. Our chefs bring a wealth of expertise, blending traditional recipes with innovative techniques to create dishes that are as visually stunning as they are delicious. Every ingredient is carefully selected, ensuring that only the freshest and highest quality produce graces our kitchen.At ABC Restaurant, we believe that dining is more than just a meal—it's an experience to be savored. Our elegant yet comfortable ambiance provides the perfect setting for every occasion, from intimate dinners to lively gatherings.</p>

                <div className='row'>
                    <div className='col-lg-6'>
                        <img src={AboutChef1} className='img-fluid my-4' alt="" />
                    </div>
                    <div className='col-lg-6'>
                        <img src={AboutChef2} className='img-fluid my-4' alt="" />
                    </div>
                </div>

                <p>Our commitment to excellence extends beyond our food. We pride ourselves on offering warm and attentive service, ensuring that every guest feels at home from the moment they walk through our doors. Whether you're joining us for a casual lunch, a celebratory dinner, or simply to unwind with a glass of wine, we are dedicated to making your time with us unforgettable.Thank you for choosing ABC Restaurant We look forward to welcoming you and making your dining experience truly special.</p>
            </div>

            <div className='bg-dark text-light'>
                <ImageGallery />
            </div>
            <Footer />

            <div className='my-5'>
               
            </div>
        </div>
    )
}

export default About;
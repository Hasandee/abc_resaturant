// src/pages/Contact.js
import React from 'react';
import './Contact.css';
import Footer from '../components/Footer/Footer';
import BranchList from '../components/BranchList'; // Import the BranchList component

function Contact() {
    return (
        <div className='contact-page'>
            <header className='mt-5'>
                <div className='container h-100 d-flex align-items-center justify-content-center'>
                    <h1 className='text-light'>Contact</h1>
                </div>
            </header>

            <div className='container my-5'>
                <div className='row'>
                    <div className='col-lg-6 d-flex justify-content-center'>
                        
                    </div>
                </div>
            </div>

            <BranchList /> {/* Display the branches list on the Contact page */}

            <div className='bg-dark text-light py-5'>
                <Footer />
            </div>
        </div>
    );
}

export default Contact;

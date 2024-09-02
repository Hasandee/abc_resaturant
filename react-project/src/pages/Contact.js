// src/pages/Contact.js
import React from 'react';
import './Contact.css';
import { ContactInfo } from '../components/ContactInfo';
import AdminBranch from '../components/AdminDashboard/AdminBranch'; // Import the new component

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
                        {/* Contact information or other content */}
                        <ContactInfo />
                    </div>
                </div>
            </div>

            <AdminBranch /> {/* Add the branch management section */}

            <div className='bg-dark text-light py-5'>
                {/* Footer or additional information */}
            </div>
        </div>
    );
}

export default Contact;

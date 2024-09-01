import React from 'react';
import './Contact.css';
import { ContactInfo } from '../components/ContactInfo';
import { Form } from 'react-bootstrap';

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

            <div className='branches-section'>
                <div className='container'>
                    <h2 className='text-center mb-5'>Our Branches</h2>
                    <div className='row'>
                        <div className='col-md-4'>
                            <div className='branch-box'>
                                <h3>Townhall Branch</h3>
                                <p>2nd Cross Street,Colombo 03</p>
                                <p>Phone: (070) 456-7890</p>
                                <h3>Opening Hours</h3>
            <p>Mon - Fri: 09:00 - 10:00</p>
            <p>Sat - Sun: 10:00 - 12:00</p>
                            </div>
                        </div>
                        <div className='col-md-4'>
                            <div className='branch-box'>
                                <h3>Rajagiriya Branch</h3>
                                <p>Malwatta Road,Rajagiriya</p>
                                <p>Phone: (075) 654-3210</p>
                                <h3>Opening Hours</h3>
            <p className="m-0">Mon - Fri: 09:00 - 10:00</p>
            <p>Sat - Sun: 10:00 - 12:00</p>
                            </div>
                        </div>
                        <div className='col-md-4'>
                            <div className='branch-box'>
                                <h3>Borella Branch</h3>
                                <p>3rd Avenue,Borella</p>
                                <p>Phone: (070) 123-4567</p>
                                <h3>Opening Hours</h3>
            <p className="m-0">Mon - Fri: 09:00 - 10:00</p>
            <p>Sat - Sun: 10:00 - 12:00</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className='bg-dark text-light py-5'>
                {/* Footer or additional information */}
            </div>
        </div>
    )
}

export default Contact;

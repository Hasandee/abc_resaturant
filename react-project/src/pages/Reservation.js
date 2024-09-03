import React, { useState } from 'react';
import './Reservation.css';
import CustomerNavbar from '../components/Navbar/CustomerNavbar';
import ReservationImage from '../utils/img/img17.jpg'; 

const Reservation = () => {
    const [formData, setFormData] = useState({
        userName: '',
        reservationType: '',
        reservationDate: '',
        time: '',
        numberOfPeople: '',
        specialRequests: '',
        branch: '',
        phone: '',
        email: ''
    });

    const branches = ['Townhall Branch', 'Rajagiriya Branch', 'Borella Branch'];

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            const response = await fetch('http://localhost:8080/reservation', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const responseData = await response.json();
            console.log('Response Status:', response.status);
            console.log('Response Data:', responseData);

            if (response.ok) {
                alert('Reservation successfully added');
                setFormData({
                    userName: '',
                    reservationType: '',
                    reservationDate: '',
                    time: '',
                    numberOfPeople: '',
                    specialRequests: '',
                    branch: '',
                    phone: '',
                    email: ''
                });
            } else {
                alert(`Failed to add reservation: ${responseData.message || 'Unknown error'}`);
            }
        } catch (error) {
            console.error('Error submitting reservation:', error);
            alert('An error occurred while submitting the reservation');
        }
    };

    return (
        <div className="reservation-container">
            <CustomerNavbar /> 
            <form className="reservation-form" onSubmit={handleSubmit}>
                <div className="form-header">
                    <img src={ReservationImage} alt="Header" /> {/* Add image URLs */}
                </div>
                <h2>Get Reservation</h2>
                
                <div className="form-row">
                    <div className="form-group">
                        <label>User Name:</label>
                        <input 
                            type="text" 
                            name="userName" 
                            value={formData.userName} 
                            onChange={handleChange} 
                            required 
                        />
                    </div>
                    <div className="form-group">
                        <label>Reservation Type:</label>
                        <input 
                            type="text" 
                            name="reservationType" 
                            value={formData.reservationType} 
                            onChange={handleChange} 
                            required 
                        />
                    </div>
                </div>
                
                <div className="form-row">
                    <div className="form-group">
                        <label>Date:</label>
                        <input 
                            type="datetime-local" 
                            name="reservationDate" 
                            value={formData.reservationDate} 
                            onChange={handleChange} 
                            required 
                        />
                    </div>
                    <div className="form-group">
                        <label>Number of People:</label>
                        <input 
                            type="number" 
                            name="numberOfPeople" 
                            value={formData.numberOfPeople} 
                            onChange={handleChange} 
                            required 
                        />
                    </div>
                </div>
                
                <div className="form-row">
                    <div className="form-group">
                        <label>Branch:</label>
                        <select 
                            name="branch" 
                            value={formData.branch} 
                            onChange={handleChange} 
                            required
                        >
                            <option value="" disabled>Select Branch</option>
                            {branches.map((branch, index) => (
                                <option key={index} value={branch}>
                                    {branch}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Phone Number:</label>
                        <input 
                            type="tel" 
                            name="phone" 
                            value={formData.phone} 
                            onChange={handleChange} 
                            required 
                        />
                    </div>
                </div>
                
                <div className="form-row">
                    <div className="form-group">
                        <label>Email:</label>
                        <input 
                            type="email" 
                            name="email" 
                            value={formData.email} 
                            onChange={handleChange} 
                            required 
                        />
                    </div>
                    <div className="form-group">
                        <label>Special Requests:</label>
                        <textarea 
                            name="specialRequests" 
                            value={formData.specialRequests} 
                            onChange={handleChange} 
                        />
                    </div>
                </div>

                <button type="submit">Submit Reservation</button>
            </form>
        </div>
    );
};

export default Reservation;

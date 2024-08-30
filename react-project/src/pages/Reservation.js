import React, { useState } from 'react';
import './Reservation.css';

const ReservationForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        date: '',
        time: '',
        numberOfPeople: '',
        specialRequests: '',
        branch: '', // Field for Branch
        phone: '', // New field for Phone Number
        email: ''  // New field for Email
    });

    const branches = ['Downtown', 'Uptown', 'Midtown', 'Suburbs']; // Example branches

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission (e.g., send data to the backend)
        alert('Reservation successfully added');
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Reservation Form</h2>
            <div>
                <label>Name:</label>
                <input 
                    type="text" 
                    name="name" 
                    value={formData.name} 
                    onChange={handleChange} 
                    required 
                />
            </div>
            <div>
                <label>Date:</label>
                <input 
                    type="datetime-local" 
                    name="date" 
                    value={formData.date} 
                    onChange={handleChange} 
                    required 
                />
            </div>
            <div>
                <label>Number of People:</label>
                <input 
                    type="number" 
                    name="numberOfPeople" 
                    value={formData.numberOfPeople} 
                    onChange={handleChange} 
                    required 
                />
            </div>
            <div>
                <label>Branch:</label> {/* Branch field */}
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
            <div>
                <label>Phone Number:</label> {/* New Phone Number field */}
                <input 
                    type="tel" 
                    name="phone" 
                    value={formData.phone} 
                    onChange={handleChange} 
                    required 
                />
            </div>
            <div>
                <label>Email:</label> {/* New Email field */}
                <input 
                    type="email" 
                    name="email" 
                    value={formData.email} 
                    onChange={handleChange} 
                    required 
                />
            </div>
            <div>
                <label>Special Requests:</label>
                <textarea 
                    name="specialRequests" 
                    value={formData.specialRequests} 
                    onChange={handleChange} 
                />
            </div>
            <button type="submit">Submit Reservation</button>
        </form>
    );
};

export default ReservationForm;

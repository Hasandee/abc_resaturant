import React, { useState } from 'react';
import './Reservation.css';

const ReservationForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        date: '',
        time: '',
        numberOfPeople: '',
        specialRequests: '',
        branch: '', // New field for Branch
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
                <label>Branch:</label> {/* New Branch field */}
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

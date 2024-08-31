import React, { useState } from 'react';
import './Reservation.css';
import CustomerNavbar from '../components/Navbar/CustomerNavbar'; // Correct import

const Reservation = () => {
    const [formData, setFormData] = useState({
        name: '',
        date: '',
        time: '',
        numberOfPeople: '',
        specialRequests: '',
        branch: '', 
        phone: '', 
        email: ''
    });

    const branches = ['Downtown', 'Uptown', 'Midtown', 'Suburbs'];

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
            const response = await fetch('/reservation', { // Ensure this matches backend path
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
                    name: '',
                    date: '',
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
        <div>
            <CustomerNavbar /> 
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
                <div>
                    <label>Phone Number:</label>
                    <input 
                        type="tel" 
                        name="phone" 
                        value={formData.phone} 
                        onChange={handleChange} 
                        required 
                    />
                </div>
                <div>
                    <label>Email:</label>
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
        </div>
    );
};

export default Reservation;

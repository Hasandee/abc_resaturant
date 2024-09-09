import React, { useState } from 'react';
import './Reservation.css';
import CustomerNavbar from '../components/Navbar/CustomerNavbar';
import ReservationImage from '../utils/img/img17.jpg';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

// Validation Schema
const reservationSchema = yup.object().shape({
    userName: yup.string().required('User Name is required'),
    reservationType: yup.string().required('Reservation Type is required'),
    reservationDate: yup.date().required('Reservation Date is required'),
    numberOfPeople: yup.number()
        .positive('Number of People must be positive')
        .required('Number of People is required'),
    branch: yup.string().required('Branch is required'),
    phone: yup.string().required('Phone Number is required'),
    email: yup.string().email('Invalid email format').required('Email is required'),
});

const Reservation = () => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        resolver: yupResolver(reservationSchema),
    });

    const onSubmit = async (data) => {
        console.log(data);
        
        try {
            const response = await fetch('http://localhost:8080/reservation', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            const responseData = await response.json();
            console.log('Response Status:', response.status);
            console.log('Response Data:', responseData);

            if (response.ok) {
                alert('Reservation successfully added')
                ;

                reset();
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
            <form className="reservation-form" onSubmit={handleSubmit(onSubmit)}>
                <div className="form-header">
                    <img src={ReservationImage} alt="Header" />
                </div>
                <h2>Get Reservation</h2>

                <div className="form-row">
                    <div className="form-group">
                        <label>User Name:</label>
                        <input 
                        id='name'
                            type="text"
                            {...register('userName')}
                            placeholder="Enter Your Name"
                        />
                        {errors.userName && <p className="error-message">{errors.userName.message}</p>}
                    </div>
                    <div className="form-group">
                        <label>Reservation Type:</label>
                        <input 
                        id='type'
                            type="text"
                            {...register('reservationType')}
                            placeholder="Enter Reservation Type"
                        />
                        {errors.reservationType && <p className="error-message">{errors.reservationType.message}</p>}
                    </div>
                </div>

                <div className="form-row">
                    <div className="form-group">
                        <label>Date:</label>
                        <input 
                        id='date'
                            type="datetime-local"
                            {...register('reservationDate')}
                        />
                        {errors.reservationDate && <p className="error-message">{errors.reservationDate.message}</p>}
                    </div>
                    <div className="form-group">
                        <label>Number of People:</label>
                        <input 
                        id='peopleno'
                            type="number"
                            {...register('numberOfPeople')}
                            placeholder="Number of People"
                        />
                        {errors.numberOfPeople && <p className="error-message">{errors.numberOfPeople.message}</p>}
                    </div>
                </div>

                <div className="form-row">
                    <div className="form-group">
                        <label>Branch:</label>
                        
                        <select 
                            {...register('branch')}
                            id='branch'
                        >
                            <option value="" disabled>Select Branch</option>
                            {['Townhall Branch', 'Rajagiriya Branch', 'Borella Branch'].map((branch, index) => (
                                <option key={index} value={branch}>
                                    {branch}
                                </option>
                            ))}
                        </select>
                        {errors.branch && <p className="error-message">{errors.branch.message}</p>}
                    </div>
                    <div className="form-group">
                        <label>Phone Number:</label>
                        <input 
                        id='phone'
                            type="tel"
                            {...register('phone')}
                            placeholder="Enter Phone Number"
                        />
                        {errors.phone && <p className="error-message">{errors.phone.message}</p>}
                    </div>
                </div>

                <div className="form-row">
                    <div className="form-group">
                        <label>Email:</label>
                        <input 
                        id='email'
                            type="email"
                            {...register('email')}
                            placeholder="Enter Email"
                        />
                        {errors.email && <p className="error-message">{errors.email.message}</p>}
                    </div>
                    <div className="form-group">
                        <label>Special Requests:</label>
                        
                        <textarea 
                        id='requests'
                            {...register('specialRequests')}
                        />
                    </div>
                </div>

                <button type="submit" id='submit'>Submit Reservation</button>
            </form>
        </div>
    );
};

export default Reservation;

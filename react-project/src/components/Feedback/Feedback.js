import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import axios from 'axios';
import './Feedback.css';
import CustomerNavbar from '../Navbar/CustomerNavbar';

// Validation Schema
const feedbackSchema = yup.object().shape({
    userId: yup.string().required('User ID is required'),
    message: yup.string().required('Message is required'),
    rating: yup.number().min(1).max(5).required('Rating is required'),
});

const Feedback = () => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        resolver: yupResolver(feedbackSchema),
    });

    const onSubmit = async (data) => {
        data.date = new Date().toISOString().split('T')[0]; // Set the current date
        try {
            const response = await axios.post('http://localhost:8080/feedback', data); // Ensure this matches your backend
            console.log('Feedback submitted:', response.data);
            alert('Thank you for your feedback!');
            reset(); // Reset form data
        } catch (error) {
            console.error('Error submitting feedback:', error);
            alert('Failed to submit feedback. Please try again later.');
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="feedback-form">
            <h2>Submit Your Feedback</h2>
            <CustomerNavbar />

            <div className="form-group">
                <label htmlFor="userId">User ID:</label>
                <input
                    type="text"
                    id="userId"
                    {...register('userId')}
                />
                {errors.userId && <p className="error-message">{errors.userId.message}</p>}
            </div>

            <div className="form-group">
                <label htmlFor="message">Message:</label>
                <textarea
                    id="message"
                    {...register('message')}
                />
                {errors.message && <p className="error-message">{errors.message.message}</p>}
            </div>

            <div className="form-group">
                <label htmlFor="rating">Rating:</label>
                <select
                    id="rating"
                    {...register('rating')}
                >
                    {[1, 2, 3, 4, 5].map((r) => (
                        <option key={r} value={r}>
                            {r}
                        </option>
                    ))}
                </select>
                {errors.rating && <p className="error-message">{errors.rating.message}</p>}
            </div>

            <button type="submit">Submit Feedback</button>
        </form>
    );
};

export default Feedback;

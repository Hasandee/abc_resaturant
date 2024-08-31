import React, { useState } from 'react';
import axios from 'axios';

const FeedbackForm = () => {
    const [feedback, setFeedback] = useState({
        userId: '',
        message: '',
        rating: 1,
        date: ''
    });

    const handleChange = (e) => {
        setFeedback({
            ...feedback,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        feedback.date = new Date().toISOString().split('T')[0]; // Set the current date
        try {
            const response = await axios.post('/feedback', feedback);
            console.log('Feedback submitted:', response.data);
            alert('Thank you for your feedback!');
            setFeedback({ userId: '', message: '', rating: 1, date: '' });
        } catch (error) {
            console.error('Error submitting feedback:', error);
            alert('Failed to submit feedback. Please try again later.');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="feedback-form">
            <h2>Submit Your Feedback</h2>

            <div className="form-group">
                <label htmlFor="userId">User ID:</label>
                <input
                    type="text"
                    id="userId"
                    name="userId"
                    value={feedback.userId}
                    onChange={handleChange}
                    required
                />
            </div>

            <div className="form-group">
                <label htmlFor="message">Message:</label>
                <textarea
                    id="message"
                    name="message"
                    value={feedback.message}
                    onChange={handleChange}
                    required
                />
            </div>

            <div className="form-group">
                <label htmlFor="rating">Rating:</label>
                <select
                    id="rating"
                    name="rating"
                    value={feedback.rating}
                    onChange={handleChange}
                    required
                >
                    {[1, 2, 3, 4, 5].map((r) => (
                        <option key={r} value={r}>
                            {r}
                        </option>
                    ))}
                </select>
            </div>

            <button type="submit">Submit Feedback</button>
        </form>
    );
};

export default FeedbackForm;

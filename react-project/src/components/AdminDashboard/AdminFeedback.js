import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AdminFeedback.css';

const AdminFeedback = () => {
    const [feedbacks, setFeedbacks] = useState([]);
    const [selectedFeedback, setSelectedFeedback] = useState(null);
    const [newFeedback, setNewFeedback] = useState({
        userId: '',
        message: '',
        rating: 1,
        date: ''
    });

    useEffect(() => {
        fetchFeedbacks();
    }, []);

    const fetchFeedbacks = async () => {
        try {
            const response = await axios.get('/feedback');
            setFeedbacks(response.data);
        } catch (error) {
            console.error('Error fetching feedbacks:', error);
        }
    };

    const handleInputChange = (e) => {
        setNewFeedback({
            ...newFeedback,
            [e.target.name]: e.target.value
        });
    };

    const handleAddFeedback = async () => {
        try {
            await axios.post('/feedback', newFeedback);
            fetchFeedbacks();
            setNewFeedback({ userId: '', message: '', rating: 1, date: '' });
        } catch (error) {
            console.error('Error adding feedback:', error);
        }
    };

    const handleEditFeedback = async () => {
        try {
            await axios.put(`/feedback/${selectedFeedback.feedbackId}`, selectedFeedback);
            fetchFeedbacks();
            setSelectedFeedback(null);
        } catch (error) {
            console.error('Error updating feedback:', error);
        }
    };

    const handleDeleteFeedback = async (feedbackId) => {
        try {
            await axios.delete(`/feedback/${feedbackId}`);
            fetchFeedbacks();
        } catch (error) {
            console.error('Error deleting feedback:', error);
        }
    };

    const handleEditClick = (feedback) => {
        setSelectedFeedback(feedback);
    };

    const handleCancelEdit = () => {
        setSelectedFeedback(null);
    };

    return (
        <div className="admin-feedback-page">
            <h1>Manage Feedbacks</h1>

            <h2>Add New Feedback</h2>
            <div className="form-group">
                <label>User ID:</label>
                <input
                    type="text"
                    name="userId"
                    value={newFeedback.userId}
                    onChange={handleInputChange}
                />
            </div>
            <div className="form-group">
                <label>Message:</label>
                <textarea
                    name="message"
                    value={newFeedback.message}
                    onChange={handleInputChange}
                />
            </div>
            <div className="form-group">
                <label>Rating:</label>
                <select
                    name="rating"
                    value={newFeedback.rating}
                    onChange={handleInputChange}
                >
                    {[1, 2, 3, 4, 5].map((r) => (
                        <option key={r} value={r}>
                            {r}
                        </option>
                    ))}
                </select>
            </div>
            <button onClick={handleAddFeedback}>Add Feedback</button>

            <h2>Existing Feedbacks</h2>
            <table>
                <thead>
                    <tr>
                        <th>User ID</th>
                        <th>Message</th>
                        <th>Rating</th>
                        <th>Date</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {feedbacks.map((feedback) => (
                        <tr key={feedback.feedbackId}>
                            <td>{feedback.userId}</td>
                            <td>{feedback.message}</td>
                            <td>{feedback.rating}</td>
                            <td>{feedback.date}</td>
                            <td>
                                <button onClick={() => handleEditClick(feedback)}>Edit</button>
                                <button onClick={() => handleDeleteFeedback(feedback.feedbackId)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {selectedFeedback && (
                <div className="edit-feedback-form">
                    <h2>Edit Feedback</h2>
                    <div className="form-group">
                        <label>User ID:</label>
                        <input
                            type="text"
                            name="userId"
                            value={selectedFeedback.userId}
                            onChange={(e) =>
                                setSelectedFeedback({ ...selectedFeedback, userId: e.target.value })
                            }
                        />
                    </div>
                    <div className="form-group">
                        <label>Message:</label>
                        <textarea
                            name="message"
                            value={selectedFeedback.message}
                            onChange={(e) =>
                                setSelectedFeedback({ ...selectedFeedback, message: e.target.value })
                            }
                        />
                    </div>
                    <div className="form-group">
                        <label>Rating:</label>
                        <select
                            name="rating"
                            value={selectedFeedback.rating}
                            onChange={(e) =>
                                setSelectedFeedback({ ...selectedFeedback, rating: e.target.value })
                            }
                        >
                            {[1, 2, 3, 4, 5].map((r) => (
                                <option key={r} value={r}>
                                    {r}
                                </option>
                            ))}
                        </select>
                    </div>
                    <button onClick={handleEditFeedback}>Save Changes</button>
                    <button onClick={handleCancelEdit}>Cancel</button>
                </div>
            )}
        </div>
    );
};

export default AdminFeedback;

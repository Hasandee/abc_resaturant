
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './StaffQuery.css';

const StaffQuery = () => {
    const [queries, setQueries] = useState([]);
    const [reply, setReply] = useState('');

    useEffect(() => {
        fetchQueries();
    }, []);

    const fetchQueries = async () => {
        try {
            const response = await axios.get('/query');
            setQueries(response.data);
        } catch (error) {
            console.error('There was an error fetching the queries!', error);
        }
    };

    const handleReplySubmit = async (queryId) => {
        try {
            await axios.put(`/query/${queryId}`, { adminReply: reply });
            setReply('');
            fetchQueries(); 
        } catch (error) {
            console.error('There was an error submitting the reply!', error);
        }
    };

    const handleDelete = async (queryId) => {
        try {
            await axios.delete(`/query/${queryId}`);
            fetchQueries(); 
        } catch (error) {
            console.error('There was an error deleting the query!', error);
        }
    };

    return (
        <div className="admin-query-management">
            <h2>Manage Customer Queries</h2>
            <ul>
                {queries.map(q => (
                    <li key={q.queryId}>
                        <p><strong>User ID:</strong> {q.userId}</p>
                        <p><strong>Date:</strong> {q.queryDate}</p>
                        <p><strong>Query:</strong> {q.query}</p>
                        <p><strong>Admin Reply:</strong> {q.adminReply || 'No reply yet'}</p>
                        <div>
                            <textarea
                                placeholder="Write your reply here"
                                value={reply}
                                onChange={(e) => setReply(e.target.value)}
                            />
                            <button onClick={() => handleReplySubmit(q.queryId)}>Reply</button>
                            <button onClick={() => handleDelete(q.queryId)}>Delete</button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default StaffQuery;

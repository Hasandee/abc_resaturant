import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AdminQuery.css';

const AdminQuery = () => {
    const [queries, setQueries] = useState([]);

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

    return (
        <div className="staff-query-view">
            <h2>Customer Queries</h2>
            <table>
                <thead>
                    <tr>
                        <th>User ID</th>
                        <th>Date</th>
                        <th>Query</th>
                        <th>Admin Reply</th>
                    </tr>
                </thead>
                <tbody>
                    {queries.map(q => (
                        <tr key={q.queryId}>
                            <td>{q.userId}</td>
                            <td>{q.queryDate}</td>
                            <td>{q.query}</td>
                            <td>{q.adminReply || 'No reply yet'}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AdminQuery;

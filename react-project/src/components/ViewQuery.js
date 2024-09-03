import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Query/Query.css';

const ViewQuery = ({ userId }) => {
    const [queries, setQueries] = useState([]);

    useEffect(() => {
        if (userId) {
            fetchCustomerQueries();
        }
    }, [userId]);

    const fetchCustomerQueries = async () => {
        try {
            const response = await axios.get('/query');
            const userQueries = response.data.filter(q => q.userId === userId);
            setQueries(userQueries);
        } catch (error) {
            console.error('Error fetching queries:', error);
        }
    };

    return (
        <div>
            <h2>Your Submitted Queries</h2>
            {queries.length > 0 ? (
                <ul>
                    {queries.map(query => (
                        <li key={query.queryId}>
                            <p><strong>Date:</strong> {query.queryDate}</p>
                            <p><strong>Query:</strong> {query.query}</p>
                            <p><strong>Admin Reply:</strong> {query.adminReply || 'No reply yet'}</p>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No queries found.</p>
            )}
        </div>
    );
};

export default ViewQuery;

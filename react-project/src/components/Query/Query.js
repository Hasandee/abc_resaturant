import React, { useState } from 'react';
import axios from 'axios';
import './Query.css';
import CustomerNavbar from '../Navbar/CustomerNavbar';

const Query = ({ userId }) => {
    const [queryDate, setQueryDate] = useState('');
    const [query, setQuery] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [enteredUserId, setEnteredUserId] = useState(userId);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newQuery = {
            userId: enteredUserId,
            queryDate,
            query,
        };

        try {
            const response = await axios.post('/query', newQuery);
            if (response.status === 201) {
                setSuccessMessage('Your query has been submitted successfully.');
                setQueryDate('');
                setQuery('');
            }
        } catch (error) {
            console.error('There was an error submitting your query!', error);
        }
    };

    return (
        <div className="query-form">
              <CustomerNavbar />
            <h2><b>Submit Your Query</b></h2>
            {successMessage && <p>{successMessage}</p>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label>User Name:</label>
                    <input
                        type="text"
                        value={userId}
                        onChange={(e) => setEnteredUserId(e.target.value)}
                        required
                        // Disable if userId should be pre-filled and not editable
                    />
                </div>
                <div>
                    <label>Query Date:</label>
                    <input
                        type="date"
                        value={queryDate}
                        onChange={(e) => setQueryDate(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Query:</label>
                    <textarea
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default Query;

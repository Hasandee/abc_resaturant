
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function BranchList() {
    const [branches, setBranches] = useState([]);

    useEffect(() => {
        fetchBranches();
    }, []);

    const fetchBranches = async () => {
        try {
            const response = await axios.get('/branch');
            setBranches(response.data);
        } catch (error) {
            console.error("Error fetching branches:", error);
            alert("There was an error fetching the branches.");
        }
    };

    return (
        <div className='branches-section'>
            <h2>Our Branches</h2>
            <div className='row'>
                {branches.map((branch) => (
                    <div key={branch.branchId} className='col-md-4'>
                        <div className='branch-box'>
                            <h3>{branch.branchName}</h3>
                            <p>{branch.address}</p>
                            <p>{branch.phoneNumber}</p>
                            <p>{branch.openingHours}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default BranchList;

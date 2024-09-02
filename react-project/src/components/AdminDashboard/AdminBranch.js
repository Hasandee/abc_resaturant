import React, { useState, useEffect } from 'react';
import axios from 'axios';

function AdminBranch() {
    const [branches, setBranches] = useState([]);
    const [formData, setFormData] = useState({
        branchId: '',
        branchName: '',
        address: '',
        phoneNumber: '',
        openingHours: '',
    });
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        fetchBranches();
    }, []);

    const fetchBranches = async () => {
        const response = await axios.get('/branch');
        setBranches(response.data);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleAddOrUpdateBranch = async (e) => {
        e.preventDefault();
        try {
            if (isEditing) {
                // Update existing branch
                await axios.put(`/branch/${formData.branchId}`, formData);
            } else {
                // Add new branch
                await axios.post('/branch', formData);
            }
            clearForm();
            fetchBranches();
        } catch (error) {
            console.error("Error adding/updating branch:", error);
            alert("There was an error processing your request.");
        }
    };

    const handleEditBranch = (branch) => {
        setFormData(branch);
        setIsEditing(true);
    };

    const handleDeleteBranch = async (branchId) => {
        if (window.confirm('Are you sure you want to delete this branch?')) {
            await axios.delete(`/branch/${branchId}`);
            fetchBranches();
        }
    };

    const clearForm = () => {
        setFormData({
            branchId: '',
            branchName: '',
            address: '',
            phoneNumber: '',
            openingHours: '',
        });
        setIsEditing(false);
    };

    return (
        <div className='admin-branches'>
            <h2>Manage Branches</h2>
            <form onSubmit={handleAddOrUpdateBranch}>
                <input
                    type='text'
                    name='branchName'
                    placeholder='Branch Name'
                    value={formData.branchName}
                    onChange={handleInputChange}
                    required
                />
                <input
                    type='text'
                    name='address'
                    placeholder='Address'
                    value={formData.address}
                    onChange={handleInputChange}
                    required
                />
                <input
                    type='text'
                    name='phoneNumber'
                    placeholder='Phone Number'
                    value={formData.phoneNumber}
                    onChange={handleInputChange}
                    required
                />
                <input
                    type='text'
                    name='openingHours'
                    placeholder='Opening Hours'
                    value={formData.openingHours}
                    onChange={handleInputChange}
                    required
                />
                <button type='submit'>
                    {isEditing ? 'Update Branch' : 'Add Branch'}
                </button>
            </form>

            <div className='branches-list'>
                {branches.map((branch) => (
                    <div key={branch.branchId} className='branch-item'>
                        <h3>{branch.branchName}</h3>
                        <p>{branch.address}</p>
                        <p>{branch.phoneNumber}</p>
                        <p>{branch.openingHours}</p>
                        <button onClick={() => handleEditBranch(branch)}>Edit</button>
                        <button onClick={() => handleDeleteBranch(branch.branchId)}>Delete</button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default AdminBranch                                                                       ;

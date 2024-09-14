import React, { useEffect, useState } from 'react';
import './AdminUsers.css';

const AdminUser = () => {
    const [users, setUsers] = useState([]);
    const [showAddForm, setShowAddForm] = useState(false);
    const [showEditForm, setShowEditForm] = useState(false);
    const [currentUserId, setCurrentUserId] = useState(null);
    const [newUser, setNewUser] = useState({
        username: '',
        userEmail: '',
        userType: '',
        password: '' // Added password field
    });

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch('/user');
                if (response.ok) {
                    const data = await response.json();
                    setUsers(data);
                } else {
                    console.error('Failed to fetch users');
                }
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };

        fetchUsers();
    }, []);

    const handleDelete = async (userId) => {
        try {
            const response = await fetch(`/user/${userId}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                setUsers(users.filter(user => user.userId !== userId));
            } else {
                console.error('Failed to delete user');
            }
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };

    const handleAddUser = async () => {
        try {
            const response = await fetch('/user', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newUser),
            });

            if (response.ok) {
                const addedUser = await response.json();
                setUsers([...users, addedUser]);
                setShowAddForm(false);
                setNewUser({ username: '', userEmail: '', userType: '', password: '' });
            } else {
                console.error('Failed to add user');
            }
        } catch (error) {
            console.error('Error adding user:', error);
        }
    };

    const handleEditUser = async () => {
        try {
            const response = await fetch(`/user/${currentUserId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newUser),
            });

            if (response.ok) {
                const updatedUser = await response.json();
                setUsers(users.map(user => (user.userId === currentUserId ? updatedUser : user)));
                setShowEditForm(false);
                setCurrentUserId(null);
                setNewUser({ username: '', userEmail: '', userType: '', password: '' });
            } else {
                console.error('Failed to edit user');
            }
        } catch (error) {
            console.error('Error editing user:', error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewUser({
            ...newUser,
            [name]: value,
        });
    };

    const handleEditButtonClick = (user) => {
        setCurrentUserId(user.userId);
        setNewUser({
            username: user.username,
            userEmail: user.userEmail,
            userType: user.userType,
            password: '' // Password field is kept empty for security
        });
        setShowEditForm(true);
        setShowAddForm(false);
    };

    return (
        <div className='admin-user-management'>
            <h2>Manage Users</h2>
            
            <button className="add-user-button" onClick={() => setShowAddForm(true)}>Add Staff & User</button>

            {showAddForm && (
                <div className="modal-overlay" onClick={() => setShowAddForm(false)}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <h3>Add New</h3>
                        <input
                            type="text"
                            name="username"
                            placeholder="Username"
                            value={newUser.username}
                            onChange={handleInputChange}
                        />
                        <input
                            type="email"
                            name="userEmail"
                            placeholder="Email"
                            value={newUser.userEmail}
                            onChange={handleInputChange}
                        />
                        <select
                            name="userType"
                            value={newUser.userType}
                            onChange={handleInputChange}
                        >
                            <option value="">Select User Type</option>
                            <option value="admin">Admin</option>
                            <option value="staff">Staff</option>
                            <option value="customer">Customer</option>
                        </select>
                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            value={newUser.password}
                            onChange={handleInputChange}
                        />
                        <button className="submit-button" onClick={handleAddUser}>Submit</button>
                        <button className="cancel-button" onClick={() => setShowAddForm(false)}>Cancel</button>
                    </div>
                </div>
            )}

            {showEditForm && (
                <div className="modal-overlay" onClick={() => setShowEditForm(false)}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <h3>Edit User</h3>
                        <input
                            type="text"
                            name="username"
                            placeholder="Username"
                            value={newUser.username}
                            onChange={handleInputChange}
                        />
                        <input
                            type="email"
                            name="userEmail"
                            placeholder="Email"
                            value={newUser.userEmail}
                            onChange={handleInputChange}
                        />
                        <select
                            name="userType"
                            value={newUser.userType}
                            onChange={handleInputChange}
                        >
                            <option value="">Select User Type</option>
                            <option value="admin">Admin</option>
                            <option value="staff">Staff</option>
                        </select>
                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            value={newUser.password}
                            onChange={handleInputChange}
                        />
                        <button className="submit-button" onClick={handleEditUser}>Save Changes</button>
                        <button className="cancel-button" onClick={() => setShowEditForm(false)}>Cancel</button>
                    </div>
                </div>
            )}

            <table>
                <thead>
                    <tr>
                        <th>User ID</th>
                        <th>Username</th>
                        <th>Email</th>
                        <th>User Type</th>
                        <th>Password</th> {/* Added Password column */}
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user.userId}>
                            <td>{user.userId}</td>
                            <td>{user.username}</td>
                            <td>{user.userEmail}</td>
                            <td>{user.userType}</td>
                            <td>{user.password}</td> {/* Displaying Password */}
                            <td>
                                <button onClick={() => handleEditButtonClick(user)}>Edit</button>
                                <button onClick={() => handleDelete(user.userId)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

           
        </div>
    );
};

export default AdminUser;

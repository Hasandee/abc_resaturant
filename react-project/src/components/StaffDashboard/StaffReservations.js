import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './StaffReservation.css';

const StaffReservations = () => {
    const [reservations, setReservations] = useState([]);
    const [newReservation, setNewReservation] = useState({
        userName: '',
        reservationDate: '',
        reservationType: '',
        numberOfPeople: '',
        specialRequests: '',
        status: '',
        branch: '',
        phone: '',
        email: ''
    });
    const [editReservation, setEditReservation] = useState(null);
    const [showAddForm, setShowAddForm] = useState(false); // New state to toggle form visibility

    useEffect(() => {
        fetchReservations();
    }, []);

    const fetchReservations = () => {
        axios.get('/reservation')
            .then(response => {
                if (Array.isArray(response.data)) {
                    setReservations(response.data);
                } else {
                    setReservations([]);
                    console.error("Unexpected response format", response.data);
                }
            })
            .catch(error => {
                console.error("There was an error fetching the reservations!", error);
            });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewReservation({ ...newReservation, [name]: value });
    };

    const handleAddReservation = () => {
        axios.post('/reservation', newReservation)
            .then(() => {
                fetchReservations();
                setNewReservation({
                    userName: '',
                    reservationDate: '',
                    reservationType: '',
                    numberOfPeople: '',
                    specialRequests: '',
                    status: '',
                    branch: '',
                    phone: '',
                    email: ''
                });
                setShowAddForm(false); // Hide form after adding a reservation
            })
            .catch(error => {
                console.error("There was an error adding the reservation!", error);
            });
    };

    const handleEditReservation = (reservation) => {
        setEditReservation({ ...reservation });
        setShowAddForm(false); // Hide add form when editing
    };

    const handleUpdateReservation = () => {
        axios.put(`/reservation/${editReservation.reservationId}`, editReservation)
            .then(() => {
                fetchReservations();
                setEditReservation(null);
            })
            .catch(error => {
                console.error("There was an error updating the reservation!", error);
            });
    };

    const handleDeleteReservation = (reservationId) => {
        if (window.confirm('Are you sure you want to delete this reservation?')) {
            axios.delete(`/reservation/${reservationId}`)
                .then(() => {
                    fetchReservations();
                })
                .catch(error => {
                    console.error("There was an error deleting the reservation!", error);
                });
        }
    };

    const handleConfirmReservation = (reservationId) => {
        axios.put(`/reservation/confirm/${reservationId}`)
            .then(() => {
                fetchReservations();
            })
            .catch(error => {
                console.error("There was an error confirming the reservation!", error);
            });
    };

    return (
        <div className="staff-reservations">
            {/* Toggle Add Reservation Form */}
            <button onClick={() => setShowAddForm(!showAddForm)}>
                {showAddForm ? 'Cancel' : 'Add Reservation'}
            </button>

            {/* Add Reservation Form */}
            {showAddForm && (
                <div className="reservation-form">
                    <h3>Add New Reservation</h3>
                    <input
                        type="text"
                        name="userName"
                        placeholder="User Name"
                        value={newReservation.userName}
                        onChange={handleInputChange}
                    />
                    <input
                        type="date"
                        name="reservationDate"
                        value={newReservation.reservationDate}
                        onChange={handleInputChange}
                    />
                    <input
                        type="text"
                        name="reservationType"
                        placeholder="Reservation Type"
                        value={newReservation.reservationType}
                        onChange={handleInputChange}
                    />
                    <input
                        type="number"
                        name="numberOfPeople"
                        placeholder="Number of People"
                        value={newReservation.numberOfPeople}
                        onChange={handleInputChange}
                    />
                    <textarea
                        name="specialRequests"
                        placeholder="Special Requests"
                        value={newReservation.specialRequests}
                        onChange={handleInputChange}
                    />
                    <input
                        type="text"
                        name="branch"
                        placeholder="Branch"
                        value={newReservation.branch}
                        onChange={handleInputChange}
                    />
                    <input
                        type="text"
                        name="phone"
                        placeholder="Phone"
                        value={newReservation.phone}
                        onChange={handleInputChange}
                    />
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={newReservation.email}
                        onChange={handleInputChange}
                    />
                    <button onClick={handleAddReservation}>Submit Reservation</button>
                </div>
            )}

            {/* Edit Reservation Form */}
            {editReservation && (
                <div className="reservation-form">
                    <h3>Edit Reservation</h3>
                    <input
                        type="text"
                        name="reservationId"
                        placeholder="Reservation ID"
                        value={editReservation.reservationId}
                        onChange={e => setEditReservation({ ...editReservation, reservationId: e.target.value })}
                        disabled
                    />
                    <input
                        type="text"
                        name="userName"
                        placeholder="User Name"
                        value={editReservation.userName}
                        onChange={e => setEditReservation({ ...editReservation, userName: e.target.value })}
                    />
                    <input
                        type="reservationDate"
                        name="reservationDate"
                        value={editReservation.reservationDate}
                        onChange={e => setEditReservation({ ...editReservation, reservationDate: e.target.value })}
                    />
                    <input
                        type="text"
                        name="reservationType"
                        placeholder="Reservation Type"
                        value={editReservation.reservationType}
                        onChange={e => setEditReservation({ ...editReservation, reservationType: e.target.value })}
                    />
                    <input
                        type="number"
                        name="numberOfPeople"
                        placeholder="Number of People"
                        value={editReservation.numberOfPeople}
                        onChange={e => setEditReservation({ ...editReservation, numberOfPeople: e.target.value })}
                    />
                    <textarea
                        name="specialRequests"
                        placeholder="Special Requests"
                        value={editReservation.specialRequests}
                        onChange={e => setEditReservation({ ...editReservation, specialRequests: e.target.value })}
                    />
                    <input
                        type="text"
                        name="branch"
                        placeholder="Branch"
                        value={editReservation.branch}
                        onChange={e => setEditReservation({ ...editReservation, branch: e.target.value })}
                    />
                    <input
                        type="text"
                        name="phone"
                        placeholder="Phone"
                        value={editReservation.phone}
                        onChange={e => setEditReservation({ ...editReservation, phone: e.target.value })}
                    />
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={editReservation.email}
                        onChange={e => setEditReservation({ ...editReservation, email: e.target.value })}
                    />
                    <button onClick={handleUpdateReservation}>Update Reservation</button>
                </div>
            )}

            {/* Reservation List */}
            <div className="reservation-list">
                <h3>Reservations</h3>
                <table>
                    <thead>
                        <tr>
                            <th>Reservation ID</th>
                            <th>User Name</th>
                            <th>Reservation Date</th>
                            <th>Type</th>
                            <th>People</th>
                            <th>Special Requests</th>
                            <th>Status</th>
                            <th>Branch</th>
                            <th>Phone</th>
                            <th>Email</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {reservations.length > 0 ? (
                            reservations.map(reservation => (
                                <tr key={reservation.reservationId}>
                                    <td>{reservation.reservationId}</td>
                                    <td>{reservation.userName}</td>
                                    <td>{reservation.reservationDate}</td>
                                    <td>{reservation.reservationType}</td>
                                    <td>{reservation.numberOfPeople}</td>
                                    <td>{reservation.specialRequests}</td>
                                    <td>{reservation.status}</td>
                                    <td>{reservation.branch}</td>
                                    <td>{reservation.phone}</td>
                                    <td>{reservation.email}</td>
                                    <td>
                                        <button onClick={() => handleEditReservation(reservation)}>Edit</button>
                                        <button onClick={() => handleDeleteReservation(reservation.reservationId)}>Delete</button>
                                        {reservation.status !== 'Confirmed' && (
                                            <button onClick={() => handleConfirmReservation(reservation.reservationId)}>Confirm</button>
                                        )}
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="11">No reservations found.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default StaffReservations;

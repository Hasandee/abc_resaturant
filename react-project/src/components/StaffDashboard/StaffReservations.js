import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './StaffReservation.css';

const StaffReservations = () => {
    const [reservations, setReservations] = useState([]);
    const [newReservation, setNewReservation] = useState({
        reservationId: '',
        userId: '',
        reservationDate: '',
        reservationType: '',
        numberOfPeople: '',
        specialRequests: '',
        status: '',
        branch: '',
        phone: '', // New field
        email: ''  // New field
    });
    const [editReservation, setEditReservation] = useState(null);

    useEffect(() => {
        fetchReservations();
    }, []);

    const fetchReservations = () => {
        axios.get('/reservation')
            .then(response => {
                setReservations(response.data);
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
                    reservationId: '',
                    userId: '',
                    reservationDate: '',
                    reservationType: '',
                    numberOfPeople: '',
                    specialRequests: '',
                    status: '',
                    branch: '',
                    phone: '', // Reset phone field
                    email: ''  // Reset email field
                });
            })
            .catch(error => {
                console.error("There was an error adding the reservation!", error);
            });
    };

    const handleEditReservation = (reservation) => {
        setEditReservation({ ...reservation });
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

    return (
        <div className="admin-reservations">
            <h2>All Reservations</h2>

            {/* Add Reservation Form */}
            <div className="reservation-form">
                <h3>Add New Reservation</h3>
                <input
                    type="text"
                    name="reservationId"
                    placeholder="Reservation ID"
                    value={newReservation.reservationId}
                    onChange={handleInputChange}
                />
                <input
                    type="text"
                    name="userId"
                    placeholder="User ID"
                    value={newReservation.userId}
                    onChange={handleInputChange}
                />
                <input
                    type="datetime-local"
                    name="reservationDate"
                    placeholder="Date"
                    value={newReservation.reservationDate}
                    onChange={handleInputChange}
                />
                <input
                    type="text"
                    name="reservationType"
                    placeholder="Type"
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
                <input
                    type="text"
                    name="specialRequests"
                    placeholder="Special Requests"
                    value={newReservation.specialRequests}
                    onChange={handleInputChange}
                />
                <input
                    type="text"
                    name="status"
                    placeholder="Status"
                    value={newReservation.status}
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
                    type="tel"
                    name="phone"
                    placeholder="Phone Number"
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
                <button onClick={handleAddReservation}>Add Reservation</button>
            </div>

            {/* Edit Reservation Form */}
            {editReservation && (
                <div className="reservation-form">
                    <h3>Edit Reservation</h3>
                    <input
                        type="text"
                        name="reservationId"
                        value={editReservation.reservationId}
                        onChange={(e) => setEditReservation({ ...editReservation, reservationId: e.target.value })}
                        disabled
                    />
                    <input
                        type="text"
                        name="userId"
                        value={editReservation.userId}
                        onChange={(e) => setEditReservation({ ...editReservation, userId: e.target.value })}
                    />
                    <input
                        type="datetime-local"
                        name="reservationDate"
                        value={editReservation.reservationDate}
                        onChange={(e) => setEditReservation({ ...editReservation, reservationDate: e.target.value })}
                    />
                    <input
                        type="text"
                        name="reservationType"
                        value={editReservation.reservationType}
                        onChange={(e) => setEditReservation({ ...editReservation, reservationType: e.target.value })}
                    />
                    <input
                        type="number"
                        name="numberOfPeople"
                        value={editReservation.numberOfPeople}
                        onChange={(e) => setEditReservation({ ...editReservation, numberOfPeople: e.target.value })}
                    />
                    <input
                        type="text"
                        name="specialRequests"
                        value={editReservation.specialRequests}
                        onChange={(e) => setEditReservation({ ...editReservation, specialRequests: e.target.value })}
                    />
                    <input
                        type="text"
                        name="status"
                        value={editReservation.status}
                        onChange={(e) => setEditReservation({ ...editReservation, status: e.target.value })}
                    />
                    <input
                        type="text"
                        name="branch"
                        value={editReservation.branch}
                        onChange={(e) => setEditReservation({ ...editReservation, branch: e.target.value })}
                    />
                    <input
                        type="tel"
                        name="phone"
                        value={editReservation.phone}
                        onChange={(e) => setEditReservation({ ...editReservation, phone: e.target.value })}
                    />
                    <input
                        type="email"
                        name="email"
                        value={editReservation.email}
                        onChange={(e) => setEditReservation({ ...editReservation, email: e.target.value })}
                    />
                    <button onClick={handleUpdateReservation}>Update Reservation</button>
                </div>
            )}

            {/* Reservations List */}
            <div className="reservations-list">
                <h3>Reservations List</h3>
                <ul>
                    {reservations.map(reservation => (
                        <li key={reservation.reservationId}>
                            {reservation.reservationId} - {reservation.userId} - {reservation.reservationDate} - {reservation.numberOfPeople} - {reservation.branch} - {reservation.phone} - {reservation.email}
                            <button onClick={() => handleEditReservation(reservation)}>Edit</button>
                            <button onClick={() => handleDeleteReservation(reservation.reservationId)}>Delete</button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default StaffReservations;

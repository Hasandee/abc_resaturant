import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './StaffReservation.css';

const StaffReservation = () => {
    const [reservations, setReservations] = useState([]);
    const [editingReservation, setEditingReservation] = useState(null);
    const [showEditPopup, setShowEditPopup] = useState(false);
    const [showAddPopup, setShowAddPopup] = useState(false);
    const [newReservationData, setNewReservationData] = useState({
        userName: '',
        phone: '',
        email: '',
        reservationDate: '',
        reservationType: '',
        numberOfPeople: '',
        branch: '',
        tableNo: '',
        status: 'Pending',
        specialRequests: ''
    });
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        fetchReservations();
    }, []);

    const fetchReservations = () => {
        axios.get('/reservation')
            .then(response => {
                const sortedReservations = response.data.sort((a, b) => new Date(b.reservationDate) - new Date(a.reservationDate));
                setReservations(sortedReservations);
            })
            .catch(error => console.error('Error fetching reservations:', error));
    };

    const handleEdit = (reservation) => {
        setEditingReservation({ ...reservation });
        setShowEditPopup(true);
    };

    const handleUpdate = () => {
        axios.put(`/reservation/${editingReservation.reservationId}`, editingReservation)
            .then(() => {
                setReservations(prevReservations =>
                    prevReservations.map(reservation =>
                        reservation.reservationId === editingReservation.reservationId ? editingReservation : reservation
                    )
                );
                setEditingReservation(null);
                setShowEditPopup(false);
            })
            .catch(error => console.error('Error updating reservation:', error));
    };

    const handleDelete = (reservationId) => {
        const isConfirmed = window.confirm('Are you sure you want to delete this reservation?');
        if (isConfirmed) {
            axios.delete(`/reservation/${reservationId}`)
                .then(() => {
                    setReservations(prevReservations =>
                        prevReservations.filter(reservation => reservation.reservationId !== reservationId)
                    );
                })
                .catch(error => {
                    console.error('Error deleting reservation:', error.response ? error.response.data : error.message);
                });
        }
    };

    const handleAddNewReservation = () => {
        setShowAddPopup(true);
    };

    const handleCreateReservation = () => {
        axios.post('/reservation', newReservationData)
            .then(response => {
                setReservations([response.data, ...reservations]);
                setShowAddPopup(false);
                setNewReservationData({
                    userName: '',
                    phone: '',
                    email: '',
                    reservationDate: '',
                    reservationType: '',
                    numberOfPeople: '',
                    branch: '',
                    tableNo: '',
                    status: 'Pending',
                    specialRequests: ''
                });
            })
            .catch(error => console.error('Error creating new reservation:', error));
    };

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
        const date = new Date(dateString);
        return date.toLocaleDateString(undefined, options);
    };

    const formatTime = (dateString) => {
        const options = { hour: '2-digit', minute: '2-digit' };
        const date = new Date(dateString);
        return date.toLocaleTimeString(undefined, options);
    };

    const filteredReservations = reservations.filter(reservation =>
        reservation.userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        reservation.phone.toLowerCase().includes(searchQuery.toLowerCase()) ||
        reservation.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        reservation.reservationDate.toLowerCase().includes(searchQuery.toLowerCase()) ||
        reservation.status.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="staff-table-container">
            <h1>Manage Reservations</h1>
            <button className="add-reservation-button" onClick={handleAddNewReservation}>
                Add New Reservation
            </button>

            <input
                type="text"
                placeholder="Search by name, phone, email, date, or status"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-input"
            />

            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Phone</th>
                        <th>Email</th>
                        <th>Date</th>
                        <th>Time</th>
                        <th>Guests</th>
                        <th>Branch</th>
                        <th>Table No</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredReservations.map((reservation) => (
                        <tr key={reservation.reservationId}>
                            <td>{reservation.userName}</td>
                            <td>{reservation.phone}</td>
                            <td>{reservation.email}</td>
                            <td>{formatDate(reservation.reservationDate)}</td>
                            <td>{formatTime(reservation.reservationDate)}</td>
                            <td>{reservation.numberOfPeople}</td>
                            <td>{reservation.branch}</td>
                            <td>{reservation.tableNo}</td>
                            <td>{reservation.status}</td>
                            <td>
                                <button onClick={() => handleEdit(reservation)}>Edit</button>
                                <button onClick={() => handleDelete(reservation.reservationId)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {showEditPopup && (
                <div className="popup-overlay">
                    <div className="popup-container">
                        <h2>Edit Reservation</h2>
                        <input
                            type="text"
                            name="userName"
                            placeholder="Customer Name"
                            value={editingReservation.userName}
                            onChange={(e) => setEditingReservation({ ...editingReservation, userName: e.target.value })}
                        />
                        <input
                            type="text"
                            name="phone"
                            placeholder="Phone"
                            value={editingReservation.phone}
                            onChange={(e) => setEditingReservation({ ...editingReservation, phone: e.target.value })}
                        />
                        <input
                            type="text"
                            name="email"
                            placeholder="Email"
                            value={editingReservation.email}
                            onChange={(e) => setEditingReservation({ ...editingReservation, email: e.target.value })}
                        />
                        <input
                            type="date"
                            name="reservationDate"
                            value={editingReservation.reservationDate.split('T')[0]}
                            onChange={(e) => setEditingReservation({ ...editingReservation, reservationDate: e.target.value })}
                        />
                        <input
                            type="time"
                            name="reservationType"
                            value={editingReservation.reservationDate.split('T')[1].slice(0, 5)}
                            onChange={(e) => setEditingReservation({ ...editingReservation, reservationDate: `${editingReservation.reservationDate.split('T')[0]}T${e.target.value}:00` })}
                        />
                        <input
                            type="number"
                            name="numberOfPeople"
                            placeholder="Guests"
                            value={editingReservation.numberOfPeople}
                            onChange={(e) => setEditingReservation({ ...editingReservation, numberOfPeople: e.target.value })}
                        />
                        <input
                            type="text"
                            name="branch"
                            placeholder="Branch"
                            value={editingReservation.branch}
                            onChange={(e) => setEditingReservation({ ...editingReservation, branch: e.target.value })}
                        />
                        <input
                            type="number"
                            name="tableNo"
                            placeholder="Table No"
                            value={editingReservation.tableNo}
                            onChange={(e) => setEditingReservation({ ...editingReservation, tableNo: e.target.value })}
                        />
                        <select
                            name="status"
                            value={editingReservation.status}
                            onChange={(e) => setEditingReservation({ ...editingReservation, status: e.target.value })}
                        >
                            <option value="Pending">Pending</option>
                            <option value="Confirmed">Confirmed</option>
                            <option value="Rejected">Rejected</option>
                        </select>
                        <textarea
                            name="specialRequests"
                            placeholder="Special Requests"
                            value={editingReservation.specialRequests}
                            onChange={(e) => setEditingReservation({ ...editingReservation, specialRequests: e.target.value })}
                        />
                        <button onClick={handleUpdate}>Update Reservation</button>
                        <button onClick={() => setShowEditPopup(false)}>Cancel</button>
                    </div>
                </div>
            )}

            {showAddPopup && (
                <div className="popup-overlay">
                    <div className="popup-container">
                        <h2>Add New Reservation</h2>
                        <input
                            type="text"
                            name="userName"
                            placeholder="Customer Name"
                            value={newReservationData.userName}
                            onChange={(e) => setNewReservationData({ ...newReservationData, userName: e.target.value })}
                        />
                        <input
                            type="text"
                            name="phone"
                            placeholder="Phone"
                            value={newReservationData.phone}
                            onChange={(e) => setNewReservationData({ ...newReservationData, phone: e.target.value })}
                        />
                        <input
                            type="text"
                            name="email"
                            placeholder="Email"
                            value={newReservationData.email}
                            onChange={(e) => setNewReservationData({ ...newReservationData, email: e.target.value })}
                        />
                        <input
                            type="date"
                            name="reservationDate"
                            value={newReservationData.reservationDate}
                            onChange={(e) => setNewReservationData({ ...newReservationData, reservationDate: e.target.value })}
                        />
                        <input
                            type="number"
                            name="numberOfPeople"
                            placeholder="Guests"
                            value={newReservationData.numberOfPeople}
                            onChange={(e) => setNewReservationData({ ...newReservationData, numberOfPeople: e.target.value })}
                        />
                        <input
                            type="text"
                            name="branch"
                            placeholder="Branch"
                            value={newReservationData.branch}
                            onChange={(e) => setNewReservationData({ ...newReservationData, branch: e.target.value })}
                        />
                        <input
                            type="number"
                            name="tableNo"
                            placeholder="Table No"
                            value={newReservationData.tableNo}
                            onChange={(e) => setNewReservationData({ ...newReservationData, tableNo: e.target.value })}
                        />
                        <textarea
                            name="specialRequests"
                            placeholder="Special Requests"
                            value={newReservationData.specialRequests}
                            onChange={(e) => setNewReservationData({ ...newReservationData, specialRequests: e.target.value })}
                        />
                        <button onClick={handleCreateReservation}>Create Reservation</button>
                        <button onClick={() => setShowAddPopup(false)}>Cancel</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default StaffReservation;

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './AdminReservations.css';

const AdminReservations = () => {
    const [reservations, setReservations] = useState([]);
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
        <div className="admin-reservations-container">
            <h1>View Reservations</h1>
            <p>As an admin, you can view all reservations made by customers at ABC Restaurant. This interface provides an overview of reservation details to assist with management and operations.</p>

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
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AdminReservations;

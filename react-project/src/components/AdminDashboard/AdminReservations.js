// src/components/AdminReservations.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './AdminReservations.css';

const AdminReservations = () => {
    const [reservations, setReservations] = useState([]);

    useEffect(() => {
        // Fetch all reservations from the backend
        axios.get('/reservation')
            .then(response => {
                setReservations(response.data);
            })
            .catch(error => {
                console.error("There was an error fetching the reservations!", error);
            });
    }, []);

    return (
        <div className="admin-reservations">
            <h2>All Reservations</h2>
            <table>
                <thead>
                    <tr>
                        <th>Reservation ID</th>
                        <th>User ID</th>
                        <th>Date</th>
                        <th>Type</th>
                        <th>Number of People</th>
                        <th>Special Requests</th>
                        <th>Status</th>
                        <th>Branch</th>
                    </tr>
                </thead>
                <tbody>
                    {reservations.map((reservation) => (
                        <tr key={reservation.reservationId}>
                            <td>{reservation.reservationId}</td>
                            <td>{reservation.userId}</td>
                            <td>{reservation.reservationDate}</td>
                            <td>{reservation.reservationType}</td>
                            <td>{reservation.numberOfPeople}</td>
                            <td>{reservation.specialRequests}</td>
                            <td>{reservation.status}</td>
                            <td>{reservation.branch}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AdminReservations;

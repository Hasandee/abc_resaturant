import React, { useState, useEffect } from 'react';
import axios from 'axios';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const AdminReservations = () => {
    const [reservations, setReservations] = useState([]);

    useEffect(() => {
        fetchReservations();
    }, []);

    const fetchReservations = async () => {
        try {
            const response = await axios.get('http://localhost:8080/reservation');
            setReservations(response.data);
        } catch (error) {
            console.error('Failed to fetch reservations:', error);
        }
    };

    const generatePDF = () => {
        const doc = new jsPDF();
        doc.text('Reservations Report', 14, 22);
        doc.autoTable({
            startY: 30,
            head: [['Reservation ID', 'User ID', 'Date', 'Type', 'Number of People', 'Special Requests', 'Status', 'Branch']],
            body: reservations.map(reservation => [
                reservation.reservationId || '',
                reservation.userId || '',
                new Date(reservation.reservationDate).toLocaleString() || '',
                reservation.reservationType || '',
                reservation.numberOfPeople || '',
                reservation.specialRequests || '',
                reservation.status || '',
                reservation.branch || ''
            ]),
        });
        doc.save('reservations_report.pdf');
    };

    return (
        <div className="admin-reservations">
            <button onClick={generatePDF}>Generate PDF Report</button>
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
                            <td>{new Date(reservation.reservationDate).toLocaleString()}</td>
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

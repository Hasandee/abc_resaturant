import React, { useState, useEffect } from 'react';
import axios from 'axios';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import './AdminReservations.css';


const AdminReservations = () => {
    const [reservations, setReservations] = useState([]);

    useEffect(() => {
        fetchReservations();
    }, []);

    const fetchReservations = async () => {
        try {
            const response = await axios.get('http://localhost:8080/reservation');
            console.log(response.data);  // Check if all fields are being fetched correctly
            setReservations(response.data);
        } catch (error) {
            console.error('Failed to fetch reservations:', error);
        }
    };

    const handleExportPDF = () => {
        const doc = new jsPDF();
        autoTable(doc, { html: '#reservation-table' });
        doc.save('reservations.pdf');
    };

    return (
        <div>
          
            <h1>Admin Reservations</h1>
            <button onClick={handleExportPDF}>Generate PDF</button>
            <div className="table-container">
                <table id="reservation-table">
                    <thead>
                        <tr>
                            <th>Reservation ID</th>
                            <th>User Name</th>
                            <th>Reservation Type</th>
                            <th>Reservation Date</th>
                            <th>Branch</th>
                            <th>Number of People</th>
                            <th>Phone</th>
                            <th>Email</th>
                            <th>Special Requests</th>
                        </tr>
                    </thead>
                    <tbody>
                        {reservations.map((reservation) => (
                            <tr key={reservation.reservationId}>
                                <td>{reservation.reservationId}</td>
                                <td>{reservation.userName}</td>
                                <td>{reservation.reservationType}</td>
                                <td>{reservation.reservationDate}</td>
                                <td>{reservation.branch}</td>
                                <td>{reservation.numberOfPeople}</td>
                                <td>{reservation.phone}</td>
                                <td>{reservation.email}</td>
                                <td>{reservation.specialRequests}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
    
};

export default AdminReservations;

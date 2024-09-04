import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './AdminOrder.css';

const AdminOrder = () => {
  const { orderId } = useParams();

  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    axios.get('/order')
      .then(response => setOrders(response.data))
      .catch(error => console.error(error));
  }, []);

  useEffect(() => {
    if (orderId) {
      axios.get(`/order/${orderId}`)
        .then(response => {
          setSelectedOrder(response.data);
        })
        .catch(error => console.error(error));
    }
  }, [orderId]);

  return (
    <div className="order-management">
      <h1>Order Management</h1>

      {/* Order List Section */}
      <div className="order-management-section">
        <h2>Order List</h2>
        <table>
          <thead>
            <tr>
              <th>Order ID</th>
              <th>User ID</th>
              <th>Total Price</th>
              <th>Status</th>
              <th>Delivery Address</th>
              <th>Payment Method</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.orderId}>
                <td>{order.orderId}</td>
                <td>{order.userId}</td>
                <td>Rs.{order.totalPrice}</td>
                <td>{order.status}</td>
                <td>{order.deliveryAddress}</td>
                <td>{order.paymentMethod}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminOrder;

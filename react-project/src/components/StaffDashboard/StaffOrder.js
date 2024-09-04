import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import '../AdminDashboard/AdminOrder.css';

const StaffOrder = () => {
  const { orderId } = useParams();

  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showAddOrder, setShowAddOrder] = useState(false);
  const [newOrder, setNewOrder] = useState({
    userId: '',
    productIds: [],
    orderDate: '',
    totalPrice: '',
    status: '',
    deliveryAddress: '',
    paymentMethod: ''
  });

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
          setNewOrder(response.data);
        })
        .catch(error => console.error(error));
    }
  }, [orderId]);

  const handleOrderChange = (e) => {
    const { name, value } = e.target;
    setSelectedOrder(prevOrder => ({
      ...prevOrder,
      [name]: value
    }));
  };

  const handleNewOrderChange = (e) => {
    const { name, value } = e.target;
    setNewOrder(prevOrder => ({
      ...prevOrder,
      [name]: value
    }));
  };

  const handleAddOrder = (e) => {
    e.preventDefault();
    axios.post('/order', newOrder)
      .then(response => {
        alert('Order added successfully!');
        setShowAddOrder(false);
        setOrders([...orders, response.data]); // Update orders list
      })
      .catch(error => {
        console.error(error);
        alert('Failed to add the order.');
      });
  };

  const handleUpdateOrder = (e) => {
    e.preventDefault();
    axios.put(`/order/${selectedOrder.orderId}`, selectedOrder)  // Use selectedOrder.orderId here
      .then(response => {
        alert('Order updated successfully!');
        setOrders(orders.map(order => order.orderId === selectedOrder.orderId ? response.data : order)); // Update orders list
        setSelectedOrder(null); // Clear the selected order
      })
      .catch(error => {
        console.error(error);
        alert('Failed to update the order.');
      });
  };

  const handleDeleteOrder = (orderId) => {
    axios.delete(`/order/${orderId}`)
      .then(response => {
        alert('Order deleted successfully!');
        setOrders(orders.filter(order => order.orderId !== orderId)); // Update orders list
      })
      .catch(error => {
        console.error(error);
        alert('Failed to delete the order.');
      });
  };
  


  return (
    <div className="order-management">
      <h1>Order Management</h1>
      

      {/* Toggle Button to Show Add Order Form */}
      <div className="order-management-section">
        
        <button 
          className="small-button"
          onClick={() => setShowAddOrder(prev => !prev)}
        >
          {showAddOrder ? 'Cancel' : 'Add Order'}
        </button>

        {showAddOrder && (
          <form onSubmit={handleAddOrder}>
            <label>
              User ID:
              <input
                type="text"
                name="userId"
                value={newOrder.userId}
                onChange={handleNewOrderChange}
              />
            </label>
            <label>
              Product IDs (comma separated):
              <input
                type="text"
                name="productIds"
                value={newOrder.productIds.join(',')}
                onChange={(e) => setNewOrder({ ...newOrder, productIds: e.target.value.split(',') })}
              />
            </label>
            <label>
              Order Date:
              <input
                type="date"
                name="orderDate"
                value={newOrder.orderDate}
                onChange={handleNewOrderChange}
              />
            </label>
            <label>
              Total Price:
              <input
                type="number"
                name="totalPrice"
                value={newOrder.totalPrice}
                onChange={handleNewOrderChange}
              />
            </label>
            <label>
              Status:
              <input
                type="text"
                name="status"
                value={newOrder.status}
                onChange={handleNewOrderChange}
              />
            </label>
            <label>
              Delivery Address:
              <input
                type="text"
                name="deliveryAddress"
                value={newOrder.deliveryAddress}
                onChange={handleNewOrderChange}
              />
            </label>
            <label>
              Payment Method:
              <input
                type="text"
                name="paymentMethod"
                value={newOrder.paymentMethod}
                onChange={handleNewOrderChange}
              />
            </label>
            <button type="submit" className="small-button">Submit Order</button>
          </form>
        )}
      </div>

      {/* Order List Section */}
      <div className="order-management-section">
        <h2>Order List</h2>
        <table id="order-table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>User ID</th>
              <th>Total Price</th>
              <th>Status</th>
              <th>Delivery Address</th>
              <th>Payment Method</th>
              <th>Actions</th>
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
                <td>
                  <button 
                    onClick={() => setSelectedOrder(order)} 
                    className="small-button"
                  >
                    Edit
                  </button>
                  <button 
                    onClick={() => handleDeleteOrder(order.orderId)} 
                    className="small-button"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Edit Order Section */}
      {selectedOrder && (
        <div className="order-management-section">
          <h2>Edit Order</h2>
          <form onSubmit={handleUpdateOrder}>
            <label>
              Status:
              <input
                type="text"
                name="status"
                value={selectedOrder.status || ''}
                onChange={handleOrderChange}
              />
            </label>
            <label>
              Delivery Address:
              <input
                type="text"
                name="deliveryAddress"
                value={selectedOrder.deliveryAddress || ''}
                onChange={handleOrderChange}
              />
            </label>
            <label>
              Payment Method:
              <input
                type="text"
                name="paymentMethod"
                value={selectedOrder.paymentMethod || ''}
                onChange={handleOrderChange}
              />
            </label>
            <button type="submit" className="small-button">Update Order</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default StaffOrder;

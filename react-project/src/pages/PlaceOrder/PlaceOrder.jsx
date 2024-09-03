import React, { useContext, useState } from 'react';
import './PlaceOrder.css';
import { StoreContext } from '../../context/StoreContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const PlaceOrder = () => {
  const { getTotalCartAmount, cartItems } = useContext(StoreContext);
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    street: '',
    city: '',
    state: '',
    zipcode: '',
    country: '',
    phone: '',
  });
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      const orderDetails = {
        userId: 'your-user-id', // Replace with actual user ID
        productIds: Object.keys(cartItems),
        orderDate: new Date().toISOString(),
        totalPrice: getTotalCartAmount() + 2, // Total amount with delivery fee
        status: 'Pending',
        deliveryAddress: `${formData.street}, ${formData.city}, ${formData.state}, ${formData.zipcode}, ${formData.country}`,
        paymentMethod: 'Credit Card', // Or other payment methods
      };

      // Make API call to create the order
      await axios.post('/order', orderDetails);
      
      // Show success alert
      alert('Order successful');

      // Clear cart and navigate to another page if needed
      navigate('/');
    } catch (error) {
      console.error('Error placing order:', error);
      alert('Error placing order. Please try again.');
    }
  };

  return (
    <div className='place-order'>
      <div className='place-order-left'>
        <p className="title">Delivery Information</p>
        <div className="multi-fields">
          <input
            type='text'
            name='firstname'
            placeholder='Firstname'
            value={formData.firstname}
            onChange={handleInputChange}
          />
          <input
            type='text'
            name='lastname'
            placeholder='Lastname'
            value={formData.lastname}
            onChange={handleInputChange}
          />
        </div>
        <input
          type='email'
          name='email'
          placeholder='Email'
          value={formData.email}
          onChange={handleInputChange}
        />
        <input
          type='text'
          name='street'
          placeholder='Street'
          value={formData.street}
          onChange={handleInputChange}
        />
        <div className="multi-fields">
          <input
            type='text'
            name='city'
            placeholder='City'
            value={formData.city}
            onChange={handleInputChange}
          />
          <input
            type='text'
            name='state'
            placeholder='State'
            value={formData.state}
            onChange={handleInputChange}
          />
        </div>
        <div className="multi-fields">
          <input
            type='text'
            name='zipcode'
            placeholder='Zip code'
            value={formData.zipcode}
            onChange={handleInputChange}
          />
          <input
            type='text'
            name='country'
            placeholder='Country'
            value={formData.country}
            onChange={handleInputChange}
          />
        </div>
        <input
          type='text'
          name='phone'
          placeholder='Phone'
          value={formData.phone}
          onChange={handleInputChange}
        />
      </div>
      <div className="place-order-right">
        <div className="cart-total">
          <h2>Cart Total</h2>
          <div>
            <div className="cart-total-details">
              <p>SubTotal</p>
              <p>${getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>$2</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <b>Total</b>
              <b>${getTotalCartAmount() + 2}</b>
            </div>
          </div>
          <button onClick={handleSubmit}>Proceed to Payment</button>
        </div>
      </div>
    </div>
  );
};

export default PlaceOrder;

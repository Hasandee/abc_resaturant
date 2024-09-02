import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminOffers = () => {
    const [offers, setOffers] = useState([]);
    const [newOffer, setNewOffer] = useState({ offerTitle: '', offerCode: '', description: '', discountPercentage: '' });
    const [editOffer, setEditOffer] = useState(null);

    useEffect(() => {
        fetchOffers();
    }, []);

    const fetchOffers = () => {
        axios.get('/offer')
            .then(response => setOffers(response.data))
            .catch(error => console.error('Error fetching offers:', error));
    };

    const handleAddOffer = () => {
        axios.post('/offer', newOffer)
            .then(() => {
                setNewOffer({ offerTitle: '', offerCode: '', description: '', discountPercentage: '' });
                fetchOffers();
                alert('Offer added successfully.');
            })
            .catch(error => console.error('Error adding offer:', error));
    };

    const handleEditOffer = (offer) => {
        setEditOffer(offer);
    };

    const handleUpdateOffer = () => {
        axios.put(`/offer/${editOffer.offerId}`, editOffer)
            .then(() => {
                setEditOffer(null);
                fetchOffers();
                alert('Order updated successfully.');
            })
            .catch(error => console.error('Error updating offer:', error));
    };

    const handleDeleteOffer = (offerId) => {
        axios.delete(`/offer/${offerId}`)
            .then(() => {
                fetchOffers();
                alert('Order deleted successfully.');
            })
            .catch(error => console.error('Error deleting offer:', error));
    };

    return (
        <div>
            <h2>Manage Offers</h2>

            {/* Add New Offer */}
            <div>
                <h3>Add New Offer</h3>
                <input
                    type="text"
                    placeholder="Offer Title"
                    value={newOffer.offerTitle}
                    onChange={(e) => setNewOffer({ ...newOffer, offerTitle: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Offer Code"
                    value={newOffer.offerCode}
                    onChange={(e) => setNewOffer({ ...newOffer, offerCode: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Description"
                    value={newOffer.description}
                    onChange={(e) => setNewOffer({ ...newOffer, description: e.target.value })}
                />
                <input
                    type="number"
                    placeholder="Discount Percentage"
                    value={newOffer.discountPercentage}
                    onChange={(e) => setNewOffer({ ...newOffer, discountPercentage: e.target.value })}
                />
                <button onClick={handleAddOffer}>Add Offer</button>
            </div>

            {/* Edit Offer */}
            {editOffer && (
                <div>
                    <h3>Edit Offer</h3>
                    <input
                        type="text"
                        placeholder="Offer Title"
                        value={editOffer.offerTitle}
                        onChange={(e) => setEditOffer({ ...editOffer, offerTitle: e.target.value })}
                    />
                    <input
                        type="text"
                        placeholder="Offer Code"
                        value={editOffer.offerCode}
                        onChange={(e) => setEditOffer({ ...editOffer, offerCode: e.target.value })}
                    />
                    <input
                        type="text"
                        placeholder="Description"
                        value={editOffer.description}
                        onChange={(e) => setEditOffer({ ...editOffer, description: e.target.value })}
                    />
                    <input
                        type="number"
                        placeholder="Discount Percentage"
                        value={editOffer.discountPercentage}
                        onChange={(e) => setEditOffer({ ...editOffer, discountPercentage: e.target.value })}
                    />
                    <button onClick={handleUpdateOffer}>Update Offer</button>
                </div>
            )}

            {/* List of Offers */}
            <h3>Available Offers</h3>
            <ul>
                {offers.map(offer => (
                    <li key={offer.offerId}>
                        <h4>{offer.offerTitle}</h4>
                        <p>Code: {offer.offerCode}</p>
                        <p>{offer.description}</p>
                        <p>Discount: {offer.discountPercentage}%</p>
                        <button onClick={() => handleEditOffer(offer)}>Edit</button>
                        <button onClick={() => handleDeleteOffer(offer.offerId)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default AdminOffers;

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Offers.css'; // Make sure to import the CSS file
import OfferImage from '../utils/img/img15.jpg'; 


const Offers = () => {
    const [offers, setOffers] = useState([]);

    useEffect(() => {
        axios.get('/offer')
            .then(response => setOffers(response.data))
            .catch(error => console.error('Error fetching offers:', error));
    }, []);

    return (
        <div className="offers-container">
            
            <h2>AVAILABLE OFFERS</h2>
            <ul className="offers-list">
                {offers.map(offer => (
                    <li key={offer.offerId} className="offer-item">
                        <div className="offer-image">
                            <img src={OfferImage} alt="Offer" />
                        </div>
                        <div className="offer-details">
                            <p className="offer-code"> {offer.offerCode}</p>
                            <p className="offer-description">{offer.description}</p>
                            <p className="offer-discount">Discount: {offer.discountPercentage}%</p>
                            <p className="offer-terms">Terms & Conditions</p>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Offers;

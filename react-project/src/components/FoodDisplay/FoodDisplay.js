import React from 'react';
import './FoodDisplay.css';
import FoodItem from '../FoodItem/FoodItem';

const FoodDisplay = ({ category, foodItems }) => {
    return (
        <div className='food-display' id='food-display'>
            <h2>Top Dishes Near You</h2>
            <div className='food-display-list'>
                {foodItems
                    .filter(item => category === "All" || item.category === category)
                    .map((item, index) => (
                        <FoodItem
                            key={index}
                            id={item.productId}
                            name={item.name}
                            description={item.description}
                            price={item.price}
                            image={item.imageUrl}
                        />
                    ))}
            </div>
        </div>
    );
};

export default FoodDisplay;

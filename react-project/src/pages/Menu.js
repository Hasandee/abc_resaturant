import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Menu.css';
import FoodDisplay from '../components/FoodDisplay/FoodDisplay';
import Footer from '../components/Footer/Footer';
import CustomerNavbar from '../components/Navbar/CustomerNavbar';

const Menu = () => {
    const [category, setCategory] = useState("All");
    const [foodItems, setFoodItems] = useState([]);

    useEffect(() => {
        fetchFoodItems();
    }, []);

    const fetchFoodItems = async () => {
        try {
            const response = await axios.get('/product');  // Fetch food items from backend
            setFoodItems(response.data);
        } catch (error) {
            console.error("Error fetching food items:", error);
        }
    };

    return (
        <div className='explore-menu' id='explore-menu'>
            <CustomerNavbar />
            <h1>Menu</h1>
            <p className='explore-menu-text'>
                Discover our delicious offerings, carefully crafted to satisfy every palate. From savory appetizers to mouth-watering main courses, refreshing beverages, and delightful desserts, explore a variety of dishes that cater to every taste.
            </p>

            <div className="explore-menu-list">
                {foodItems.map((item, index) => (
                    <div onClick={() => setCategory(prev => prev === item.category ? "All" : item.category)} key={index} className='explore-menu-list-item'>
                        <img className={category === item.category ? "active" : ""} src={item.imageUrl} alt='' />
                        <p>{item.category}</p>
                    </div>
                ))}
            </div>
            <hr />
            <FoodDisplay category={category} foodItems={foodItems} />
            <Footer />
        </div>
    );
};

export default Menu;

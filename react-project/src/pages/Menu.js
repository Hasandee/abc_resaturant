import React, { useState } from 'react';
import './Menu.css';
import { menu_list } from '../assets/assets';
import FoodDisplay from '../components/FoodDisplay/FoodDisplay';



const Menu = () => {
    const [category, setCategory] = useState("All");

    return (
        <div className='explore-menu' id='explore-menu'>
            <h1>Menu</h1>
            <p className='explore-menu-text'>
            Discover our delicious offerings, carefully crafted to satisfy every palate. From savory appetizers to mouth-watering main courses, refreshing beverages, and delightful desserts, explore a variety of dishes that cater to every taste. </p>

            <div className="explore-menu-list">
                {menu_list.map((item, index) => (
                    <div   onClick={() => setCategory(prev => prev === item.menu_name ? "All" : item.menu_name)} key={index} className='explore-menu-list-item'>
                      <img className={category === item.menu_name ? "active" : ""} src={item.menu_image} alt='' />
                        <p>{item.menu_name}</p>
                    </div>
                ))}
            </div>
            <hr />
            <FoodDisplay category={category} />
           

        </div>
    );
};

export default Menu;

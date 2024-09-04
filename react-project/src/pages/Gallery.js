import React from "react";
import "./Gallery.css";

import img1 from "../utils/img/img18.jpg";
import img2 from "../utils/img/img19.jpg";
import img3 from "../utils/img/img20.jpg";
import img4 from "../utils/img/img21.jpg";
import img5 from "../utils/img/img22.jpg";
import img6 from "../utils/img/img23.jpg";
import img7 from "../utils/img/img24.jpg";
import img8 from "../utils/img/img25.jpg";

const Gallery = () => {
  const categories = [
    { name: "Parota", image: img1 },
    { name: "Dried Fish", image: img2 },
    { name: "French Fries", image: img3 },
    { name: "Sausage Pasta", image: img4 },
    { name: "Chicken Submarine", image: img5 },
    { name: "Beef Burger", image: img6 },
    { name: "WhiteRice with Chicken", image: img7 },
    { name: "Prawn Noodeles", image: img8 },
  ];

  return (
    <div className="gallery-container">
      <header className="gallery-header">
        <h1>Good food is the foundation of genuine happiness</h1>
        <div className="search-bar">
          <input type="text" placeholder="Search for food..." />
          <button type="submit" className="search-button">
            Search
          </button>
        </div>
      </header>
      <div className="categories">
        {categories.map((category, index) => (
          <div key={index} className="category-item">
            <img src={category.image} alt={category.name} />
            <h2>{category.name}</h2>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Gallery;

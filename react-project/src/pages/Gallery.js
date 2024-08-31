import React from "react";
import "./Gallery.css";

import img1 from "../utils/img/img1.jpg";
import img2 from "../utils/img/img2.jpg";
import img3 from "../utils/img/img3.jpg";
import img4 from "../utils/img/img4.jpg";
import img5 from "../utils/img/img5.jpg";
import img6 from "../utils/img/img6.jpg";
import img7 from "../utils/img/img7.jpg";
import img8 from "../utils/img/img8.jpg";

const Gallery = () => {
  const categories = [
    { name: "Picture 1", image: img1 },
    { name: "Picture 2", image: img2 },
    { name: "Picture 3", image: img3 },
    { name: "Picture 4", image: img4 },
    { name: "Picture 5", image: img5 },
    { name: "Picture 6", image: img6 },
    { name: "Picture 7", image: img7 },
    { name: "Picture 8", image: img8 },
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

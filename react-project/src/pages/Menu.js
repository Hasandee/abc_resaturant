import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Menu.css'; // Make sure you have a CSS file for styling

const Menu = () => {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');

    useEffect(() => {
        // Fetch products from the backend
        axios.get('/product')
            .then(response => {
                setProducts(response.data);

                // Extract unique categories from the products
                const uniqueCategories = [...new Set(response.data.map(product => product.category || "Uncategorized"))];
                setCategories(uniqueCategories);

                // Set filtered products initially to all products
                setFilteredProducts(response.data);
            })
            .catch(error => console.error('Error fetching products:', error));
    }, []);

    const filterByCategory = (category) => {
        setSelectedCategory(category);
        if (category === '') {
            setFilteredProducts(products);
        } else {
            setFilteredProducts(products.filter(product => product.category === category));
        }
    };

    const addToCart = (product) => {
        // Implement add to cart logic here
        console.log('Added to cart:', product);
    };

    return (
        <div className="menu-container">
            <h2>Our Menu</h2>

            {/* Categories Section */}
            <div className="categories">
                <button
                    key="all"
                    className={`category-button ${selectedCategory === '' ? 'active' : ''}`}
                    onClick={() => filterByCategory('')}
                >
                    All
                </button>
                {categories.map(category => (
                    <button
                        key={category}
                        className={`category-button ${selectedCategory === category ? 'active' : ''}`}
                        onClick={() => filterByCategory(category)}
                    >
                        {category}
                    </button>
                ))}
            </div>

            {/* Products Section */}
            <div className="products">
                {filteredProducts.map(product => (
                    <div key={product.id} className="product-card">
                        <img src={`./image/${product.imageUrl}`} alt={product.name} className="product-image" />
                        <h3>{product.name}</h3>
                        <p>{product.description}</p>
                        <p>${product.price.toFixed(2)}</p>
                        <button onClick={() => addToCart(product)} className="add-to-cart-button">
                            Add to Cart
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Menu;

import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminProducts = () => {
    const [products, setProducts] = useState([]);
    const [newProduct, setNewProduct] = useState({
        name: '',
        description: '',
        price: '',
        imageUrl: '',
        category: ''
    });

    useEffect(() => {
        axios.get('/product')
            .then(response => setProducts(response.data))
            .catch(error => console.error('Error fetching products:', error));
    }, []);

    const handleInputChange = (e) => {
        setNewProduct({
            ...newProduct,
            [e.target.name]: e.target.value
        });
    };

    const addProduct = () => {
        axios.post('/product', newProduct)
            .then(response => {
                setProducts([...products, response.data]);
                setNewProduct({
                    name: '',
                    description: '',
                    price: '',
                    imageUrl: '',
                    category: ''
                });
            })
            .catch(error => console.error('Error adding product:', error));
    };

    const deleteProduct = (id) => {
        axios.delete(`/product/${id}`)
            .then(() => {
                setProducts(products.filter(product => product.id !== id));
            })
            .catch(error => console.error('Error deleting product:', error));
    };

    return (
        <div>
            <h2>Manage Products</h2>
            <div>
                <input type="text" name="name" placeholder="Name" value={newProduct.name} onChange={handleInputChange} />
                <input type="text" name="description" placeholder="Description" value={newProduct.description} onChange={handleInputChange} />
                <input type="number" name="price" placeholder="Price" value={newProduct.price} onChange={handleInputChange} />
                <input type="text" name="imageUrl" placeholder="Image URL" value={newProduct.imageUrl} onChange={handleInputChange} />
                <input type="text" name="category" placeholder="Category" value={newProduct.category} onChange={handleInputChange} />
                <button onClick={addProduct}>Add Product</button>
            </div>
            <h3>Existing Products</h3>
            <ul>
                {products.map(product => (
                    <li key={product.id}>
                        {product.name} - {product.category} - ${product.price}
                        <button onClick={() => deleteProduct(product.id)}>Delete</button>
                        {/* Edit functionality can be added here */}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default AdminProducts;

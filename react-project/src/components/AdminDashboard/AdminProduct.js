import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AdminProduct.css';

const AdminProduct = () => {
    const [products, setProducts] = useState([]);
    const [product, setProduct] = useState({
        productId: '',
        name: '',
        description: '',
        price: '',
        imageUrl: '',
        categoryId: '',
        availability: true
    });
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await axios.get('/product');
            setProducts(response.data);
        } catch (error) {
            console.error("Error fetching products:", error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduct({ ...product, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (isEditing) {
            await axios.put(`/product/${product.productId}`, product);
        } else {
            await axios.post('/product', product);
        }
        setProduct({ productId: '', name: '', description: '', price: '', imageUrl: '', categoryId: '', availability: true });
        setIsEditing(false);
        fetchProducts();
    };

    const handleEdit = (product) => {
        setProduct(product);
        setIsEditing(true);
    };

    const handleDelete = async (productId) => {
        await axios.delete(`/product/${productId}`);
        fetchProducts();
    };

    return (
        <div className="admin-product">
            <h1>Admin Product Management</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="name"
                    placeholder="Product Name"
                    value={product.name}
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    name="description"
                    placeholder="Description"
                    value={product.description}
                    onChange={handleChange}
                    required
                />
                <input
                    type="number"
                    name="price"
                    placeholder="Price"
                    value={product.price}
                    onChange={handleChange}
                    required
                />
                <input
                    type="file"
                    name="imageUrl"
                    placeholder="Image URL"
                    value={product.imageUrl}
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    name="categoryId"
                    placeholder="Category ID"
                    value={product.categoryId}
                    onChange={handleChange}
                    required
                />
                <label>
                    Availability:
                    <input
                        type="checkbox"
                        name="availability"
                        checked={product.availability}
                        onChange={(e) => setProduct({ ...product, availability: e.target.checked })}
                    />
                </label>
                <button type="submit">{isEditing ? 'Update Product' : 'Add Product'}</button>
            </form>

            <div className="product-list">
                {products.map((prod) => (
                    <div key={prod.productId} className="product-item">
                        <h2>{prod.name}</h2>
                        <p>{prod.description}</p>
                        <p>${prod.price}</p>
                        <button onClick={() => handleEdit(prod)}>Edit</button>
                        <button onClick={() => handleDelete(prod.productId)}>Delete</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AdminProduct;

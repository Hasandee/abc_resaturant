import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminCategories = () => {
    const [categories, setCategories] = useState([]);
    const [newCategory, setNewCategory] = useState('');

    useEffect(() => {
        axios.get('/categories') // Make sure this endpoint exists on your backend
            .then(response => setCategories(response.data))
            .catch(error => console.error('Error fetching categories:', error));
    }, []);

    const addCategory = () => {
        axios.post('/categories', { name: newCategory })
            .then(response => {
                setCategories([...categories, response.data]);
                setNewCategory('');
            })
            .catch(error => console.error('Error adding category:', error));
    };

    const deleteCategory = (id) => {
        axios.delete(`/categories/${id}`)
            .then(() => {
                setCategories(categories.filter(category => category.id !== id));
            })
            .catch(error => console.error('Error deleting category:', error));
    };

    return (
        <div>
            <h2>Manage Categories</h2>
            <div>
                <input type="text" placeholder="New Category" value={newCategory} onChange={(e) => setNewCategory(e.target.value)} />
                <button onClick={addCategory}>Add Category</button>
            </div>
            <h3>Existing Categories</h3>
            <ul>
                {categories.map(category => (
                    <li key={category.id}>
                        {category.name}
                        <button onClick={() => deleteCategory(category.id)}>Delete</button>
                        {/* Edit functionality can be added here */}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default AdminCategories;

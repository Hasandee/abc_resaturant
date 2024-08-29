import React, { useState, useEffect } from 'react';

const Gallery = () => {
    const [galleryItems, setGalleryItems] = useState([]);
    const [editItemId, setEditItemId] = useState(null);
    const [newItemData, setNewItemData] = useState({ name: '', description: '', imageUrl: '' });
    const [showAddForm, setShowAddForm] = useState(false);

    useEffect(() => {
        fetchGalleryItems();
    }, []);

    const fetchGalleryItems = async () => {
        try {
            const response = await fetch('http://localhost:8080/gallery');
            const data = await response.json();
            setGalleryItems(data);
        } catch (error) {
            console.error('Error fetching gallery items:', error);
        }
    };

    const addGalleryItem = async () => {
        try {
            const response = await fetch('http://localhost:8080/gallery', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newItemData),
            });
            if (!response.ok) {
                throw new Error('Failed to add item');
            }
            const newItem = await response.json();
            setGalleryItems([...galleryItems, newItem]);
            setNewItemData({ name: '', description: '', imageUrl: '' });
            setShowAddForm(false);
        } catch (error) {
            console.error('Error adding gallery item:', error);
        }
    };

    const updateGalleryItem = async (id, updatedData) => {
        try {
            console.log('Updating item with ID:', id); // Debugging log
            console.log('Updated data:', updatedData); // Debugging log

            const response = await fetch(`http://localhost:8080/gallery/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedData),
            });
            if (!response.ok) {
                throw new Error('Failed to update');
            }
            const updatedItem = await response.json();
            console.log('Updated item response:', updatedItem); // Debugging log

            setGalleryItems((prevItems) =>
                prevItems.map((item) => (item.id === id ? updatedItem : item))
            );
            setEditItemId(null);
        } catch (error) {
            console.error('Error updating gallery item:', error);
        }
    };

    const deleteGalleryItem = async (id) => {
        try {
            const response = await fetch(`http://localhost:8080/gallery/${id}`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                throw new Error('Failed to delete');
            }
            setGalleryItems((prevItems) => prevItems.filter((item) => item.id !== id));
        } catch (error) {
            console.error('Error deleting gallery item:', error);
        }
    };

    const handleEdit = (item) => {
        setEditItemId(item.id);
        setNewItemData({ name: item.name, description: item.description, imageUrl: item.imageUrl });
        setShowAddForm(false);
    };

    const handleUpdate = () => {
        updateGalleryItem(editItemId, newItemData);
    };

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this item?')) {
            deleteGalleryItem(id);
        }
    };

    const handleAddNew = () => {
        setShowAddForm(true);
        setEditItemId(null);
        setNewItemData({ name: '', description: '', imageUrl: '' });
    };

    return (
        <div>
            <h1>Gallery</h1>
            <button onClick={handleAddNew}>Add New Item</button>
            {showAddForm && (
                <div>
                    <h2>Add New Item</h2>
                    <input
                        type="text"
                        value={newItemData.name}
                        onChange={(e) => setNewItemData({ ...newItemData, name: e.target.value })}
                        placeholder="Name"
                    />
                    <input
                        type="text"
                        value={newItemData.description}
                        onChange={(e) => setNewItemData({ ...newItemData, description: e.target.value })}
                        placeholder="Description"
                    />
                    <input
                        type="text"
                        value={newItemData.imageUrl}
                        onChange={(e) => setNewItemData({ ...newItemData, imageUrl: e.target.value })}
                        placeholder="Image URL"
                    />
                    <button onClick={addGalleryItem}>Add Item</button>
                </div>
            )}
            {editItemId && (
                <div>
                    <h2>Edit Item</h2>
                    <input
                        type="text"
                        value={newItemData.name}
                        onChange={(e) => setNewItemData({ ...newItemData, name: e.target.value })}
                        placeholder="Name"
                    />
                    <input
                        type="text"
                        value={newItemData.description}
                        onChange={(e) => setNewItemData({ ...newItemData, description: e.target.value })}
                        placeholder="Description"
                    />
                    <input
                        type="text"
                        value={newItemData.imageUrl}
                        onChange={(e) => setNewItemData({ ...newItemData, imageUrl: e.target.value })}
                        placeholder="Image URL"
                    />
                    <button onClick={handleUpdate}>Update</button>
                </div>
            )}
            <ul>
                {galleryItems.map((item) => (
                    <li key={item.id}>
                        <img src={item.imageUrl} alt={item.name} width="100" />
                        <p>{item.name}</p>
                        <p>{item.description}</p>
                        <button onClick={() => handleEdit(item)}>Edit</button>
                        <button onClick={() => handleDelete(item.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Gallery;

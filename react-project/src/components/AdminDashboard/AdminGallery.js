import React, { useEffect, useState } from 'react';

const AdminGallery = () => {
  const [galleries, setGalleries] = useState([]);
  const [gallery, setGallery] = useState({ title: '', description: '', imageUrl: '' });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchGalleries();
  }, []);

  const fetchGalleries = async () => {
    const response = await fetch('http://localhost:8080/gallery');
    const data = await response.json();
    setGalleries(data);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setGallery({ ...gallery, [name]: value });
  };

  const handleAddOrUpdate = async (e) => {
    e.preventDefault();
    if (editingId) {
      // Update gallery
      await fetch(`http://localhost:8080/gallery/${editingId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(gallery),
      });
    } else {
      // Add new gallery
      await fetch('http://localhost:8080/gallery', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(gallery),
      });
    }
    setGallery({ title: '', description: '', imageUrl: '' });
    setEditingId(null);
    fetchGalleries();
  };

  const handleEdit = (gallery) => {
    setGallery(gallery);
    setEditingId(gallery.id);
  };

  const handleDelete = async (id) => {
    await fetch(`http://localhost:8080/gallery/${id}`, {
      method: 'DELETE',
    });
    fetchGalleries();
  };

  return (
    <div>
      <h2>Gallery Management</h2>
      <form onSubmit={handleAddOrUpdate}>
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={gallery.title}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="description"
          placeholder="Description"
          value={gallery.description}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="imageUrl"
          placeholder="Image URL"
          value={gallery.imageUrl}
          onChange={handleChange}
          required
        />
        <button type="submit">{editingId ? 'Update Gallery' : 'Add Gallery'}</button>
      </form>

      <h3>Existing Galleries</h3>
      <ul>
        {galleries.map((g) => (
          <li key={g.id}>
            <strong>{g.title}</strong> - {g.description}
            <button onClick={() => handleEdit(g)}>Edit</button>
            <button onClick={() => handleDelete(g.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminGallery;

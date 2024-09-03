import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './AdminFacility.css';

const AdminFacility = () => {
  const [facilities, setFacilities] = useState([]);
  const [selectedFacility, setSelectedFacility] = useState(null);
  const [newFacility, setNewFacility] = useState({
    heading: '',
    description: '',
    image: null
  });
  const [editFacility, setEditFacility] = useState({
    id: '',
    heading: '',
    description: '',
    image: null
  });

  useEffect(() => {
    fetchFacilities();
  }, []);

  const fetchFacilities = async () => {
    try {
      const response = await axios.get('/facility');
      setFacilities(response.data);
    } catch (error) {
      console.error('Error fetching facilities:', error);
    }
  };

  const handleAddFacility = async () => {
    const formData = new FormData();
    formData.append('heading', newFacility.heading);
    formData.append('description', newFacility.description);
    if (newFacility.image) {
      formData.append('image', newFacility.image);
    }
  
    try {
      await axios.post('/facility', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      fetchFacilities(); // Refresh the list
      setNewFacility({ heading: '', description: '', image: null }); // Reset form
    } catch (error) {
      console.error('Error adding facility:', error);
    }
  };
  

  const handleUpdateFacility = async () => {
    const formData = new FormData();
    formData.append('heading', editFacility.heading);
    formData.append('description', editFacility.description);
    if (editFacility.image) {
      formData.append('image', editFacility.image);
    }

    try {
      await axios.put(`/facility/${editFacility.id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      fetchFacilities();
      setEditFacility({ id: '', heading: '', description: '', image: null });
    } catch (error) {
      console.error('Error updating facility:', error);
    }
  };

  const handleDeleteFacility = async (id) => {
    try {
      await axios.delete(`/facility/${id}`);
      fetchFacilities();
    } catch (error) {
      console.error('Error deleting facility:', error);
    }
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setNewFacility({ ...newFacility, image: file });
    }
  };

  const handleEditImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setEditFacility({ ...editFacility, image: file });
    }
  };

  return (
    <div className="admin-facility-management">
      <h1>Manage Facilities</h1>
      <div className="add-facility">
        <h2>Add Facility</h2>
        <input
          type="text"
          placeholder="Heading"
          value={newFacility.heading}
          onChange={(e) => setNewFacility({ ...newFacility, heading: e.target.value })}
        />
        <textarea
          placeholder="Description"
          value={newFacility.description}
          onChange={(e) => setNewFacility({ ...newFacility, description: e.target.value })}
        />
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
        />
        <button onClick={handleAddFacility}>Add Facility</button>
      </div>
      <div className="edit-facility">
        <h2>Edit Facility</h2>
        {selectedFacility && (
          <>
            <input
              type="text"
              placeholder="Heading"
              value={editFacility.heading}
              onChange={(e) => setEditFacility({ ...editFacility, heading: e.target.value })}
            />
            <textarea
              placeholder="Description"
              value={editFacility.description}
              onChange={(e) => setEditFacility({ ...editFacility, description: e.target.value })}
            />
            <input
              type="file"
              accept="image/*"
              onChange={handleEditImageChange}
            />
            <button onClick={handleUpdateFacility}>Update Facility</button>
          </>
        )}
      </div>
      <div className="facility-list">
        <h2>Facility List</h2>
        <ul>
          {facilities.map((facility) => (
            <li key={facility.id}>
              <h3>{facility.heading}</h3>
              <p>{facility.description}</p>
              <img src={`data:image/jpeg;base64,${facility.image}`} alt={facility.heading} />
              <button onClick={() => {
                setSelectedFacility(facility);
                setEditFacility({
                  id: facility.id,
                  heading: facility.heading,
                  description: facility.description,
                  image: null
                });
              }}>Edit</button>
              <button onClick={() => handleDeleteFacility(facility.id)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AdminFacility;

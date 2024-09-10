
import React, { useState, useEffect } from "react";
import axios from "axios";

const AdminCategory = () => {
  const [categories, setCategories] = useState([]);
  const [categoryName, setCategoryName] = useState("");

  useEffect(() => {
    axios.get("/category").then((response) => {
      setCategories(response.data);
    });
  }, []);

  const handleAddCategory = (e) => {
    e.preventDefault();
    axios.post("/category", { name: categoryName }).then(() => {
      setCategoryName("");
      axios.get("/category").then((response) => {
        setCategories(response.data);
      });
    });
  };

  const handleDeleteCategory = (id) => {
    axios.delete(`/category/${id}`).then(() => {
      setCategories(categories.filter((category) => category.id !== id));
    });
  };

  return (
    <div>
      <h1>Admin Category Management</h1>
      <form onSubmit={handleAddCategory}>
        <input
          type="text"
          value={categoryName}
          onChange={(e) => setCategoryName(e.target.value)}
          placeholder="Category Name"
          required
        />
        <button type="submit">Add Category</button>
      </form>

      <div className="category-list">
        {categories.map((category) => (
          <div key={category.id} className="category-item">
            <span>{category.name}</span>
            <button onClick={() => handleDeleteCategory(category.id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminCategory;

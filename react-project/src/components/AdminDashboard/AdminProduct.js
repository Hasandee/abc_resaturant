
import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminProduct = () => {
  const [products, setProducts] = useState([]);
  const [formState, setFormState] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    imageUrl: "",
  });

  useEffect(() => {
    axios.get("/product").then((response) => {
      setProducts(response.data);
    });
  }, []);

  const handleChange = (e) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("/product", formState).then(() => {
      
      axios.get("/product").then((response) => {
        setProducts(response.data);
      });
    });
  };

  const handleDelete = (id) => {
    axios.delete(`/product/${id}`).then(() => {
      setProducts(products.filter((product) => product.id !== id));
    });
  };

  return (
    <div>
      <h1>Admin Menu Management</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" value={formState.name} onChange={handleChange} placeholder="Name" required />
        <input type="text" name="description" value={formState.description} onChange={handleChange} placeholder="Description" required />
        <input type="number" name="price" value={formState.price} onChange={handleChange} placeholder="Price" required />
        <input type="text" name="category" value={formState.category} onChange={handleChange} placeholder="Category" required />
        <input type="text" name="imageUrl" value={formState.imageUrl} onChange={handleChange} placeholder="Image URL" required />
        <button type="submit">Add Product</button>
      </form>

      <div className="menu-list">
        {products.map((product) => (
          <div key={product.id} className="menu-item">
            <img src={product.imageUrl} alt={product.name} />
            <h2>{product.name}</h2>
            <p>{product.description}</p>
            <p>${product.price}</p>
            <button onClick={() => handleDelete(product.id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminProduct;

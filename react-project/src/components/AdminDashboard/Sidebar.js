import React, { useState } from 'react';
import './Sidebar.css';

const Sidebar = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className={`sidebar ${isDarkMode ? 'dark' : 'light'}`}>
      <div className="sidebar-header">
        
        <h2>Admin Dashboard</h2>
      </div>
      <div className="sidebar-user">
       
      </div>
      <ul className="sidebar-menu">
        <li>Dashboard</li>
        <li>Products</li>
        <li>Categories</li>
        <li>Orders</li>
        <li>Users</li>
        <li>Gallery</li>
        <li>Reservations</li>
        <li>Queries</li>
        <li>Logout</li>
      </ul>
     
    </div>
  );
};

export default Sidebar;

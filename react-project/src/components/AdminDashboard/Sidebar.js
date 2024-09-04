import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
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
      <div className="sidebar-user"></div>
      <ul className="sidebar-menu">
        <li>
          <NavLink to="/admindashboard" className="sidebar-link" activeClassName="active-link">
            Dashboard
          </NavLink>
        </li>
        <li>
          <NavLink to="/adminproducts" className="sidebar-link" activeClassName="active-link">
            Products
          </NavLink>
        </li>
        <li>
          <NavLink to="/admincategories" className="sidebar-link" activeClassName="active-link">
            Categories
          </NavLink>
        </li>
        <li>
          <NavLink to="/adminfeedback" className="sidebar-link" activeClassName="active-link">
            Feedback
          </NavLink>
        </li>
        <li>
          <NavLink to="/adminuser" className="sidebar-link" activeClassName="active-link">
            Users
          </NavLink>
        </li>
        <li>
          <NavLink to="/admingallery" className="sidebar-link" activeClassName="active-link">
            Gallery
          </NavLink>
        </li>
        <li>
          <NavLink to="/adminreservation" className="sidebar-link" activeClassName="active-link">
            Reservations
          </NavLink>
        </li>
        <li>
          <NavLink to="/adminorder" className="sidebar-link" activeClassName="active-link">
            Orders
          </NavLink>
          <li>
          <NavLink to="/adminfacility" className="sidebar-link" activeClassName="active-link">
            Facilities
          </NavLink>
        </li>
        </li>
        <li>
          <NavLink to="/adminquery" className="sidebar-link" activeClassName="active-link">
            Queries
          </NavLink>
        </li>
        <li>
          <NavLink to="/logout" className="sidebar-link" activeClassName="active-link">
            Logout
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;

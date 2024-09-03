import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import './StaffSidebar.css';

const Sidebar = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className={`sidebar ${isDarkMode ? 'dark' : 'light'}`}>
      <div className="sidebar-header">
        <h2>Staff Dashboard</h2>
      </div>
      <div className="sidebar-user"></div>
      <ul className="sidebar-menu">
        <li>
          <NavLink to="/staffdashboard" className="sidebar-link" activeClassName="active-link">
            Dashboard
          </NavLink>
        </li>
        <li>
          <NavLink to="/stafforder" className="sidebar-link" activeClassName="active-link">
            Orders
          </NavLink>
        </li>
        <li>
          <NavLink to="/staffreservation" className="sidebar-link" activeClassName="active-link">
            Reservations
          </NavLink>
        </li>
        <li>
          <NavLink to="/staffqueries" className="sidebar-link" activeClassName="active-link">
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

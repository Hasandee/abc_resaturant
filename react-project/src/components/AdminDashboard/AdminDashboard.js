import React from 'react';
import Sidebar from './Sidebar';
import { CContainer } from '@coreui/react';
import '@coreui/coreui/dist/css/coreui.min.css';
import Footer from '../Footer/Footer';
import './AdminDashboard.css';

const DashboardLayout = ({ children }) => {
  return (
    <div className="dashboard-layout">
      <Sidebar />
      <CContainer fluid className="main-content">
        {children}
      </CContainer>

    </div>
  );
};

export default DashboardLayout;

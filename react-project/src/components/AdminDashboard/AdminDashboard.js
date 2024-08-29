import React from 'react';
import Sidebar from './Sidebar';
import { CContainer } from '@coreui/react';
import '@coreui/coreui/dist/css/coreui.min.css';
import Footer from '../Footer/Footer';

const DashboardLayout = ({ children }) => {
  return (
    <div className="dashboard-layout">
      <Sidebar />
      <CContainer fluid className="main-content">
        {children}
      </CContainer>
<Footer />
    </div>
  );
};

export default DashboardLayout;

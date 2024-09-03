import React from 'react';
import StaffSidebar from './StaffSidebar';
import { CContainer } from '@coreui/react';
import '@coreui/coreui/dist/css/coreui.min.css';
import Footer from '../Footer/Footer';
import './StaffDashboard.css';

const DashboardLayout = ({ children }) => {
  return (
    <div className="staffdashboard-layout">
      <StaffSidebar />
      <CContainer fluid className="staffmain-content">
        {children}
      </CContainer>

    </div>
  );
};

export default DashboardLayout;

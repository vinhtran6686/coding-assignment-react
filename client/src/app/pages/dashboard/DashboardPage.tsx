import React from 'react';
import DashboardPage from '../../modules/dashboard/DashboardPage';

// Page component that acts as a bridge to the Dashboard module
// This follows the pattern of pages being bridges to modules
const DashboardPageBridge: React.FC = () => {
  return <DashboardPage />;
};

export default DashboardPageBridge; 
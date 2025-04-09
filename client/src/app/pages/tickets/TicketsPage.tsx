import React from 'react';
import TicketPage from '../../modules/ticket/TicketPage';

// Page component that acts as a bridge to the Ticket module
// This follows the pattern of pages being bridges to modules
const TicketsPage: React.FC = () => {
  return <TicketPage />;
};

export default TicketsPage; 
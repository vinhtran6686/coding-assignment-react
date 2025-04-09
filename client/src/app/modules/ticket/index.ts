// Export main components
export { default as TicketPage } from './TicketPage';

// Export screens
export { default as TicketListScreen } from './screens/TicketListScreen';
export { default as TicketDetailScreen } from './screens/TicketDetailScreen';

// Export hooks
export { useTickets } from './hooks/useTickets';
export { useTicket } from './hooks/useTicket';

// Export types
export type { Ticket } from './types';

// Re-export components
export { default as TicketList } from './components/TicketList';
export { default as TicketForm } from './components/TicketForm';
export { default as TicketCard } from './components/TicketCard';

// Services
export * from './services/ticketService'; 
import { TicketPriority, TicketStatus as TicketStatusType } from './types';

export const priorityColors: Record<TicketPriority, string> = {
  high: '#ce4a30', // Red
  medium: '#d98c5d', // Orange
  low: '#656567', // Green
};
export const priorityBgs: Record<TicketPriority, string> = {
  high: '#fff2f3', // Red
  medium: '#fff6db', // Orange
  low: '#f8fafb', // Green
};

export const statusColors: Record<TicketStatusType, string> = {
  open: '#2196f3', // Blue
  'in progress': '#ff9800', // Orange
  testing: '#9c27b0', // Purple
  completed: '#4caf50', // Green
  // backlog: '#757575', // Grey
};

export const COLUMN_WIDTH = 300;
export const COLUMN_PADDING = 2; // In theme spacing units 

// Add TicketStatus as values for backward compatibility with enum usage
export const TicketStatus = {
  OPEN: 'open' as TicketStatusType,
  IN_PROGRESS: 'in progress' as TicketStatusType,
  TESTING: 'testing' as TicketStatusType,
  COMPLETED: 'completed' as TicketStatusType,
  // BACKLOG: 'backlog' as TicketStatusType
}; 
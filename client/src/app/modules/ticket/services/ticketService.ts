import axios from 'axios';
import { 
  Ticket, 
  CreateTicketRequest, 
  UpdateTicketRequest, 
  TicketFilters,
  TicketStatus,
  TicketPriority,
  UpdateTicketStatusRequest
} from '../types';

// API URL configuration
const BASE_URL = 'http://localhost:4200/api';
const API_URL = {
  TICKETS: `${BASE_URL}/tickets`,
  TICKET_DETAIL: (id: string) => `${BASE_URL}/tickets/${id}`,
  TICKET_STATUS: (id: string) => `${BASE_URL}/tickets/${id}/status`,
  TICKET_ASSIGN: (id: string, userId: string) => `${BASE_URL}/tickets/${id}/assignee/${userId}`,
  TICKET_UNASSIGN: (id: string) => `${BASE_URL}/tickets/${id}/assignee`,
};

/**
 * Get all tickets with optional filtering
 */
export const getTickets = async (filters?: TicketFilters): Promise<Ticket[]> => {
  try {
    console.log('Fetching tickets with filters:', filters);
    
    // Build query parameters
    const params = new URLSearchParams();
    
    if (filters) {
      if (filters.status) params.append('status', filters.status);
      if (filters.searchQuery) params.append('search', filters.searchQuery);
    }
    
    const response = await axios.get(API_URL.TICKETS, { params });
    return response.data;
  } catch (error) {
    console.error('Error fetching tickets:', error);
    throw error;
  }
};

/**
 * Get a single ticket by ID
 */
export const getTicket = async (id: string): Promise<Ticket> => {
  try {
    console.log(`Fetching ticket with ID ${id}`);
    const response = await axios.get(API_URL.TICKET_DETAIL(id));
    return response.data;
  } catch (error) {
    console.error(`Error fetching ticket with ID ${id}:`, error);
    throw error;
  }
};

/**
 * Update the status of a ticket
 */
export const updateTicketStatus = async (id: string, status: TicketStatus): Promise<void> => {
  try {
    console.log(`Updating status of ticket ${id} to ${status}`);
    await axios.put(API_URL.TICKET_STATUS(id), { id, status });
  } catch (error) {
    console.error(`Error updating ticket status:`, error);
    throw error;
  }
};

/**
 * Assign a ticket to a user
 */
export const assignTicket = async (ticketId: string, userId: string): Promise<void> => {
  try {
    console.log(`Assigning ticket ${ticketId} to user ${userId}`);
    await axios.put(API_URL.TICKET_ASSIGN(ticketId, userId), {});
  } catch (error) {
    console.error('Error assigning ticket:', error);
    throw error;
  }
};

/**
 * Unassign a ticket from current assignee
 */
export const unassignTicket = async (ticketId: string): Promise<void> => {
  try {
    console.log(`Unassigning ticket ${ticketId}`);
    await axios.delete(API_URL.TICKET_UNASSIGN(ticketId));
  } catch (error) {
    console.error('Error unassigning ticket:', error);
    throw error;
  }
}; 
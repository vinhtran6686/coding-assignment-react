import axios from 'axios';
import { 
  Ticket, 
  CreateTicketRequest, 
  UpdateTicketRequest, 
  TicketFilters 
} from '../types';
import { API_URL } from '../../../constants';

/**
 * Get all tickets with optional filtering
 */
export const getTickets = async (filters?: TicketFilters): Promise<Ticket[]> => {
  try {
    const params = new URLSearchParams();
    
    if (filters) {
      if (filters.status) params.append('status', filters.status);
      if (filters.priority) params.append('priority', filters.priority);
      if (filters.searchQuery) params.append('q', filters.searchQuery);
      if (filters.assignedTo) params.append('assignedTo', filters.assignedTo.toString());
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
export const getTicket = async (id: number): Promise<Ticket> => {
  try {
    const response = await axios.get(API_URL.TICKET_DETAIL(id));
    return response.data;
  } catch (error) {
    console.error(`Error fetching ticket with ID ${id}:`, error);
    throw error;
  }
};

/**
 * Create a new ticket
 */
export const createTicket = async (ticket: CreateTicketRequest): Promise<Ticket> => {
  try {
    const response = await axios.post(API_URL.TICKET_CREATE, ticket);
    return response.data;
  } catch (error) {
    console.error('Error creating ticket:', error);
    throw error;
  }
};

/**
 * Update an existing ticket
 */
export const updateTicket = async (id: number, updateData: UpdateTicketRequest): Promise<Ticket> => {
  try {
    const response = await axios.put(API_URL.TICKET_UPDATE(id), updateData);
    return response.data;
  } catch (error) {
    console.error(`Error updating ticket with ID ${id}:`, error);
    throw error;
  }
};

/**
 * Delete a ticket
 */
export const deleteTicket = async (id: number): Promise<void> => {
  try {
    await axios.delete(API_URL.TICKET_DELETE(id));
  } catch (error) {
    console.error(`Error deleting ticket with ID ${id}:`, error);
    throw error;
  }
}; 
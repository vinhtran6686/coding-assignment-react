import axios from 'axios';
import { 
  Ticket, 
  CreateTicketRequest, 
  UpdateTicketRequest, 
  TicketFilters,
  TicketStatus,
  TicketPriority
} from '../types';

// Temporary mock API URL until we fix constants
const BASE_URL = 'http://localhost:4200/api';
const API_URL = {
  TICKETS: `${BASE_URL}/tickets`,
  TICKET_DETAIL: (id: number) => `${BASE_URL}/tickets/${id}`,
  TICKET_CREATE: `${BASE_URL}/tickets/create`,
  TICKET_UPDATE: (id: number) => `${BASE_URL}/tickets/${id}/update`,
  TICKET_DELETE: (id: number) => `${BASE_URL}/tickets/${id}/delete`,
};

// Mock data for development
const mockTickets: Ticket[] = [
  {
    id: 1,
    title: "Fix login button on mobile",
    description: "The login button doesn't work on mobile devices smaller than 320px width",
    status: TicketStatus.OPEN,
    priority: TicketPriority.HIGH,
    createdAt: "2023-05-10T09:00:00Z",
    updatedAt: "2023-05-10T09:00:00Z",
    createdBy: 1,
  },
  {
    id: 2,
    title: "Update dashboard charts",
    description: "The pie chart on the dashboard shows incorrect data when filtering by date",
    status: TicketStatus.IN_PROGRESS,
    priority: TicketPriority.MEDIUM,
    createdAt: "2023-05-09T14:30:00Z",
    updatedAt: "2023-05-11T10:15:00Z",
    assignedTo: 2,
    createdBy: 1,
  },
  {
    id: 3,
    title: "Add export to PDF feature",
    description: "Users need to be able to export their reports to PDF format",
    status: TicketStatus.OPEN,
    priority: TicketPriority.LOW,
    createdAt: "2023-05-08T11:45:00Z",
    updatedAt: "2023-05-08T11:45:00Z",
    createdBy: 3,
  }
];

/**
 * Get all tickets with optional filtering
 */
export const getTickets = async (filters?: TicketFilters): Promise<Ticket[]> => {
  // TEMP: Use mock data for development
  try {
    console.log('Fetching tickets with filters:', filters);
    
    // Simulate filtering
    let filteredTickets = [...mockTickets];
    
    if (filters) {
      if (filters.status) {
        filteredTickets = filteredTickets.filter(t => t.status === filters.status);
      }
      if (filters.priority) {
        filteredTickets = filteredTickets.filter(t => t.priority === filters.priority);
      }
      if (filters.searchQuery) {
        const query = filters.searchQuery.toLowerCase();
        filteredTickets = filteredTickets.filter(t => 
          t.title.toLowerCase().includes(query) || 
          t.description.toLowerCase().includes(query)
        );
      }
    }
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    return filteredTickets;
    
    // Real API call (commented out for now)
    /*
    const params = new URLSearchParams();
    
    if (filters) {
      if (filters.status) params.append('status', filters.status);
      if (filters.priority) params.append('priority', filters.priority);
      if (filters.searchQuery) params.append('q', filters.searchQuery);
      if (filters.assignedTo) params.append('assignedTo', filters.assignedTo.toString());
    }
    
    const response = await axios.get(API_URL.TICKETS, { params });
    return response.data;
    */
  } catch (error) {
    console.error('Error fetching tickets:', error);
    throw error;
  }
};

/**
 * Get a single ticket by ID
 */
export const getTicket = async (id: number): Promise<Ticket> => {
  // TEMP: Use mock data for development
  try {
    console.log(`Fetching ticket with ID ${id}`);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const ticket = mockTickets.find(t => t.id === id);
    if (!ticket) {
      throw new Error(`Ticket with ID ${id} not found`);
    }
    
    return ticket;
    
    // Real API call (commented out for now)
    /*
    const response = await axios.get(API_URL.TICKET_DETAIL(id));
    return response.data;
    */
  } catch (error) {
    console.error(`Error fetching ticket with ID ${id}:`, error);
    throw error;
  }
};

/**
 * Create a new ticket
 */
export const createTicket = async (ticket: CreateTicketRequest): Promise<Ticket> => {
  // TEMP: Use mock data for development
  try {
    console.log('Creating ticket:', ticket);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 700));
    
    const newTicket: Ticket = {
      id: mockTickets.length + 1,
      title: ticket.title,
      description: ticket.description,
      status: TicketStatus.OPEN,
      priority: ticket.priority,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      assignedTo: ticket.assignedTo,
      createdBy: 1, // Assume current user has ID 1
    };
    
    mockTickets.push(newTicket);
    
    return newTicket;
    
    // Real API call (commented out for now)
    /*
    const response = await axios.post(API_URL.TICKET_CREATE, ticket);
    return response.data;
    */
  } catch (error) {
    console.error('Error creating ticket:', error);
    throw error;
  }
};

/**
 * Update an existing ticket
 */
export const updateTicket = async (id: number, updateData: UpdateTicketRequest): Promise<Ticket> => {
  // TEMP: Use mock data for development
  try {
    console.log(`Updating ticket with ID ${id}:`, updateData);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const ticketIndex = mockTickets.findIndex(t => t.id === id);
    if (ticketIndex === -1) {
      throw new Error(`Ticket with ID ${id} not found`);
    }
    
    const updatedTicket: Ticket = {
      ...mockTickets[ticketIndex],
      ...updateData,
      updatedAt: new Date().toISOString(),
    };
    
    mockTickets[ticketIndex] = updatedTicket;
    
    return updatedTicket;
    
    // Real API call (commented out for now)
    /*
    const response = await axios.put(API_URL.TICKET_UPDATE(id), updateData);
    return response.data;
    */
  } catch (error) {
    console.error(`Error updating ticket with ID ${id}:`, error);
    throw error;
  }
};

/**
 * Delete a ticket
 */
export const deleteTicket = async (id: number): Promise<void> => {
  // TEMP: Use mock data for development
  try {
    console.log(`Deleting ticket with ID ${id}`);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 400));
    
    const ticketIndex = mockTickets.findIndex(t => t.id === id);
    if (ticketIndex === -1) {
      throw new Error(`Ticket with ID ${id} not found`);
    }
    
    mockTickets.splice(ticketIndex, 1);
    
    // Real API call (commented out for now)
    /*
    await axios.delete(API_URL.TICKET_DELETE(id));
    */
  } catch (error) {
    console.error(`Error deleting ticket with ID ${id}:`, error);
    throw error;
  }
}; 
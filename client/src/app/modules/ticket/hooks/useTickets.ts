import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { Ticket, TicketStatus, CreateTicketRequest } from '../types';
import { BASE_URL } from 'client/src/app/constants';

// Function to call the API
const api = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
});

export const useTickets = () => {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Function to map API response to our Ticket type
  const mapApiResponseToTicket = (apiTicket: any): Ticket => {
    return {
      id: apiTicket.id,
      key: apiTicket.key,
      title: apiTicket.title,
      description: apiTicket.description,
      // Map API status values to our lowercase status values
      status: apiTicket.status.toLowerCase() as TicketStatus,
      // Get priority from API or default to medium
      priority: apiTicket.priority || 'medium',
      assignee: apiTicket.assignee,
      assigneeId: apiTicket.assigneeId,
      assigneeAvatar: apiTicket.assigneeAvatar || 'https://placehold.co/150/4287f5/ffffff?text=JD',
      createdAt: apiTicket.createdAt,
      updatedAt: apiTicket.updatedAt,
    };
  };

  const fetchTickets = useCallback(async (status?: string, search?: string) => {
    setLoading(true);
    try {
      // Build query parameters
      const params: Record<string, string> = {};
      if (status) params['status'] = status;
      if (search) params['search'] = search;

      // Make API call
      const response = await api.get('/tickets', { params });
      
      // Map response to our ticket type
      const mappedTickets = response.data.map(mapApiResponseToTicket);
      setTickets(mappedTickets);
      setError(null);
    } catch (err) {
      console.error('Error fetching tickets:', err);
      setError('Failed to fetch tickets. Please try again later.');
    } finally {
      setLoading(false);
    }
  }, []);

  const updateTicket = useCallback(async (updatedTicket: Ticket) => {
    try {
      // Only update status currently, based on API docs
      await api.put(`/tickets/${updatedTicket.id}/status`, {
        id: updatedTicket.id,
        status: updatedTicket.status.charAt(0).toUpperCase() + updatedTicket.status.slice(1)
      });
      
      // Update local state
      setTickets(prevTickets => 
        prevTickets.map(ticket => 
          ticket.id === updatedTicket.id ? updatedTicket : ticket
        )
      );
      
      return true;
    } catch (err) {
      console.error('Error updating ticket:', err);
      setError('Failed to update ticket. Please try again later.');
      return false;
    }
  }, []);

  const addTicket = useCallback(async (newTicket: CreateTicketRequest) => {
    try {
      // Call API to create ticket
      const response = await api.post('/tickets', newTicket);
      
      // Map the response and add to state
      const createdTicket = mapApiResponseToTicket(response.data);
      setTickets(prevTickets => [...prevTickets, createdTicket]);
      
      return { success: true, data: createdTicket };
    } catch (err) {
      console.error('Error adding ticket:', err);
      setError('Failed to add ticket. Please try again later.');
      return { success: false, error: err };
    }
  }, []);

  useEffect(() => {
    fetchTickets();
  }, [fetchTickets]);

  return {
    tickets,
    loading,
    error,
    fetchTickets,
    updateTicket,
    addTicket
  };
};

export default useTickets; 
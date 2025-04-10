import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { Ticket, TicketStatus } from '../types';
import { BASE_URL } from 'client/src/app/constants';

// API client
const api = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
});

/**
 * Hook for fetching and managing a single ticket
 */
export const useTicket = (id: string) => {
  const [ticket, setTicket] = useState<Ticket | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  // Function to map API response to our Ticket type
  const mapApiResponseToTicket = (apiTicket: any): Ticket => {
    return {
      id: apiTicket.id,
      key: apiTicket.key,
      title: apiTicket.title,
      description: apiTicket.description,
      // Map API status values to our lowercase status values
      status: apiTicket.status.toLowerCase() as TicketStatus,
      // Assuming a default priority since the API doesn't seem to provide it
      priority: apiTicket.priority || 'medium',
      assignee: apiTicket.assigneeId,
      assigneeAvatar: apiTicket.assigneeAvatar || 'https://placehold.co/150/4287f5/ffffff?text=JD',
      createdAt: apiTicket.createdAt,
      updatedAt: apiTicket.updatedAt,
    };
  };

  const fetchTicket = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await api.get(`/tickets/${id}`);
      const mappedTicket = mapApiResponseToTicket(response.data);
      setTicket(mappedTicket);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to fetch ticket'));
      console.error('Error fetching ticket:', err);
    } finally {
      setIsLoading(false);
    }
  }, [id]);

  // Update ticket status handler
  const updateStatus = async (status: TicketStatus) => {
    try {
      // Convert status to match API expected format (first letter uppercase)
      const formattedStatus = status.charAt(0).toUpperCase() + status.slice(1);
      
      await api.put(`/tickets/${id}/status`, { id, status: formattedStatus });
      
      // Update local state
      if (ticket) {
        setTicket({
          ...ticket,
          status
        });
      }
      
      return true;
    } catch (err) {
      console.error('Failed to update ticket status:', err);
      return false;
    }
  };

  // Assign ticket handler
  const assignTicket = async (userId: string) => {
    try {
      await api.put(`/tickets/${id}/assignee/${userId}`);
      
      // Update local state
      if (ticket) {
        setTicket({
          ...ticket,
          assignee: userId
        });
      }
      
      return true;
    } catch (err) {
      console.error('Failed to assign ticket:', err);
      return false;
    }
  };

  // Unassign ticket handler
  const unassignTicket = async () => {
    try {
      await api.delete(`/tickets/${id}/assignee`);
      
      // Update local state
      if (ticket) {
        setTicket({
          ...ticket,
          assignee: undefined
        });
      }
      
      return true;
    } catch (err) {
      console.error('Failed to unassign ticket:', err);
      return false;
    }
  };

  useEffect(() => {
    fetchTicket();
  }, [fetchTicket]);

  return {
    ticket,
    isLoading,
    error,
    updateStatus,
    assignTicket,
    unassignTicket,
  };
};

export default useTicket; 
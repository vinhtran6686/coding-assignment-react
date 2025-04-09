import { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getTickets, getTicket, createTicket, updateTicket, deleteTicket } from '../services/ticketService';
import { Ticket, CreateTicketRequest, UpdateTicketRequest } from '../types';

export const useTickets = () => {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const queryClient = useQueryClient();

  const fetchTickets = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const fetchedTickets = await getTickets();
      setTickets(fetchedTickets);
    } catch (err) {
      setError('Failed to fetch tickets');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTickets();
  }, []);

  const fetchTicket = async (id: number) => {
    setLoading(true);
    setError(null);
    
    try {
      return await getTicket(id);
    } catch (err) {
      setError(`Failed to fetch ticket with ID ${id}`);
      console.error(err);
      return undefined;
    } finally {
      setLoading(false);
    }
  };

  const addTicket = async (ticketData: CreateTicketRequest) => {
    setLoading(true);
    setError(null);
    
    try {
      const newTicket = await createTicket(ticketData);
      setTickets([...tickets, newTicket]);
      return newTicket;
    } catch (err) {
      setError('Failed to create ticket');
      console.error(err);
      return undefined;
    } finally {
      setLoading(false);
    }
  };

  const editTicket = async (id: number, ticketData: UpdateTicketRequest) => {
    setLoading(true);
    setError(null);
    
    try {
      const updatedTicket = await updateTicket(id, ticketData);
      
      setTickets(tickets.map(ticket => 
        ticket.id === id ? updatedTicket : ticket
      ));
      
      return updatedTicket;
    } catch (err) {
      setError(`Failed to update ticket with ID ${id}`);
      console.error(err);
      return undefined;
    } finally {
      setLoading(false);
    }
  };
  
  const removeTicket = async (id: number) => {
    setLoading(true);
    setError(null);
    
    try {
      await deleteTicket(id);
      setTickets(tickets.filter(ticket => ticket.id !== id));
      return true;
    } catch (err) {
      setError(`Failed to delete ticket with ID ${id}`);
      console.error(err);
      return false;
    } finally {
      setLoading(false);
    }
  };

  return {
    tickets,
    loading,
    error,
    fetchTickets,
    fetchTicket,
    addTicket,
    editTicket,
    removeTicket
  };
}; 
import { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getTicket, updateTicket, deleteTicket } from '../services/ticketService';
import { Ticket, UpdateTicketRequest } from '../types';

/**
 * Hook for fetching and managing a single ticket
 */
export const useTicket = (ticketId: number) => {
  const queryClient = useQueryClient();

  // Fetch ticket data
  const { 
    data: ticket, 
    isLoading, 
    error,
    refetch 
  } = useQuery<Ticket, Error>(
    ['ticket', ticketId],
    () => getTicket(ticketId),
    {
      enabled: !!ticketId,
      staleTime: 1000 * 60 * 5, // 5 minutes
    }
  );

  // Update ticket mutation
  const updateMutation = useMutation(
    (updateData: UpdateTicketRequest) => updateTicket(ticketId, updateData),
    {
      onSuccess: () => {
        // Invalidate and refetch
        queryClient.invalidateQueries(['ticket', ticketId]);
        queryClient.invalidateQueries(['tickets']);
      },
    }
  );

  // Delete ticket mutation
  const deleteMutation = useMutation(
    () => deleteTicket(ticketId),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['tickets']);
      },
    }
  );

  // Update ticket handler
  const updateTicketHandler = async (updateData: UpdateTicketRequest) => {
    try {
      await updateMutation.mutateAsync(updateData);
      return true;
    } catch (error) {
      console.error('Failed to update ticket:', error);
      return false;
    }
  };

  // Delete ticket handler
  const deleteTicketHandler = async () => {
    try {
      await deleteMutation.mutateAsync();
      return true;
    } catch (error) {
      console.error('Failed to delete ticket:', error);
      return false;
    }
  };

  return {
    ticket,
    isLoading,
    error,
    refetch,
    updateTicket: updateTicketHandler,
    deleteTicket: deleteTicketHandler,
    isUpdating: updateMutation.isLoading,
    isDeleting: deleteMutation.isLoading,
  };
}; 
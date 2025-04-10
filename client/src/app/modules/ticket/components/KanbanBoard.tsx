import React, { useState, useRef, useMemo } from 'react';
import {
  Box,
  Typography,
  Paper,
  Divider,
  Skeleton,
  Stack
} from '@mui/material';
import {
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragStartEvent,
  useSensor,
  useSensors,
  PointerSensor,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  DragOverlay,
  defaultDropAnimationSideEffects,
  MeasuringStrategy
} from '@dnd-kit/core';
import { arrayMove } from '@dnd-kit/sortable';

import { Ticket, TicketStatus } from '../types';
import { COLUMN_WIDTH, COLUMN_PADDING } from '../constants';
import KanbanColumn from './KanbanColumn';
import TicketCard from './TicketCard';

interface KanbanBoardProps {
  tickets: Ticket[];
  isLoading: boolean;
  onTicketClick: (ticketId: string) => void;
  onTicketEdit?: (ticketId: string) => void;
  onTicketDrop: (ticketId: string, newStatus: TicketStatus) => void;
  onAddNewTicket: () => void;
}

const MEASURING_CONFIG = {
  droppable: {
    strategy: MeasuringStrategy.Always,
  },
};

const KanbanBoard: React.FC<KanbanBoardProps> = ({
  tickets,
  isLoading,
  onTicketClick,
  onTicketEdit,
  onTicketDrop,
  onAddNewTicket
}) => {
  const [activeTicket, setActiveTicket] = useState<Ticket | null>(null);
  const [pendingTicketUpdate, setPendingTicketUpdate] = useState<{ ticketId: string, newStatus: TicketStatus } | null>(null);
  
  // Use a ref to store tickets to prevent expensive calculations on each drag event
  const ticketsRef = useRef(tickets);
  ticketsRef.current = tickets;

  // Setup sensors for drag interaction with better configurations
  const sensors = useSensors(
    useSensor(MouseSensor, {
      // Increasing activation delay to better distinguish between click and drag
      activationConstraint: {
        delay: 150, // Increase delay to make drag less accidental
        tolerance: 8, // Require more movement before considering it a drag
      },
    }),
    useSensor(TouchSensor, {
      // Better touch support with delay
      activationConstraint: {
        delay: 200, // Longer delay for touch to avoid accidental drags
        tolerance: 12, // Higher tolerance for touch devices
      },
    }),
    useSensor(KeyboardSensor)
  );

  // Group tickets by status - memoize this operation for performance
  const ticketsByStatus = useMemo(() => {
    const result: Record<TicketStatus, Ticket[]> = {
      'open': [],
      'in progress': [],
      'testing': [],
      'completed': []
    };
    
    tickets.forEach(ticket => {
      if (result[ticket.status]) {
        result[ticket.status].push(ticket);
      }
    });
    
    return result;
  }, [tickets]);

  // Define board columns - static so we memoize it
  const columns = useMemo(() => [
    { status: 'open' as TicketStatus, title: 'Open' },
    { status: 'in progress' as TicketStatus, title: 'In Progress' },
    { status: 'testing' as TicketStatus, title: 'Testing' },
    { status: 'completed' as TicketStatus, title: 'Completed' },
  ], []);

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    const draggedTicket = ticketsRef.current.find(t => t.id === active.id);
    if (draggedTicket) {
      setActiveTicket(draggedTicket);
    }
  };

  const handleDragOver = (event: DragOverEvent) => {
    // Enhanced visual feedback could be added here if needed
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    // Reset active ticket
    setActiveTicket(null);

    // Return if not dropping onto a valid target
    if (!over) return;

    const ticketId = active.id as string;
    const newStatus = over.id as TicketStatus;

    const ticket = ticketsRef.current.find(t => t.id === ticketId);

    // Only update if status actually changed
    if (ticket && ticket.status !== newStatus) {
      // Schedule the update with a small delay to allow animation to complete
      setPendingTicketUpdate({ ticketId, newStatus });
      
      // Perform the actual API call after a small delay
      setTimeout(() => {
        onTicketDrop(ticketId, newStatus);
        setPendingTicketUpdate(null);
      }, 200);
    }
  };

  const dropAnimation = {
    sideEffects: defaultDropAnimationSideEffects({
      styles: {
        active: {
          opacity: '0.5',
        },
      },
    }),
  };

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', gap: 2, overflowX: 'auto', pb: 2, px: 2, height: '100%' }}>
        {columns.map((column) => (
          <Paper
            key={column.status}
            sx={{
              width: COLUMN_WIDTH,
              minWidth: COLUMN_WIDTH,
              height: 'calc(100vh - 250px)',
              display: 'flex',
              flexDirection: 'column',
              py: 2,
              px: 1.25,
              borderRadius: 2,
              backgroundColor: '#f6f8fa',
            }}
          >
            <Box sx={{ mb: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Box sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1
              }}>
                <Typography variant="body1" fontWeight={600} lineHeight={1.2}>
                  {column.title}
                </Typography>
                <Skeleton variant="circular" width={20} height={20} />
              </Box>
            </Box>
            <Divider sx={{ mb: 2 }} />

            <Box sx={{ flexGrow: 1, overflowY: 'auto', overflowX: 'hidden' }}>
              <Stack spacing={2}>
                {[1, 2, 3].map((i) => (
                  <Box key={i}>
                    <Paper sx={{ 
                      p: '12px', 
                      borderRadius: '8px', 
                      border: '1px solid #e2e6ed',
                      mb: 1
                    }}>
                      {/* Priority chip */}
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                        <Skeleton variant="rectangular" width={60} height={20} sx={{ borderRadius: '16px' }} />
                      </Box>
                      
                      {/* Title */}
                      <Skeleton variant="text" sx={{ mb: 1.25, fontSize: '16px', width: '90%' }} />
                      <Skeleton variant="text" sx={{ mb: 1.25, fontSize: '16px', width: '70%' }} />
                      
                      {/* Description */}
                      <Skeleton variant="text" sx={{ mb: 1, fontSize: '14px', width: '100%' }} />
                      <Skeleton variant="text" sx={{ mb: 1, fontSize: '14px', width: '90%' }} />
                      
                      <Divider sx={{ my: 1.5 }} />
                      
                      {/* Footer */}
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 1 }}>
                        <Skeleton variant="text" width={80} height={20} />
                        <Skeleton variant="circular" width={24} height={24} />
                      </Box>
                    </Paper>
                  </Box>
                ))}
              </Stack>
            </Box>
          </Paper>
        ))}
      </Box>
    );
  }

  return (
    <DndContext
      sensors={sensors}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
      measuring={MEASURING_CONFIG}
    >
      <Box
        sx={{
          display: 'flex',
          gap: '12px',
          overflowX: 'auto',
          overflowY: 'hidden',
          pb: 2,
          px: 2,
          height: '100%',
          '&::-webkit-scrollbar': {
            height: '10px',
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: 'rgba(0, 0, 0, 0.2)',
            borderRadius: '4px',
          },
          '&::-webkit-scrollbar-track': {
            backgroundColor: 'rgba(0, 0, 0, 0.05)',
          }
        }}
      >
        {columns.map((column) => (
          <KanbanColumn
            key={column.status}
            status={column.status}
            title={column.title}
            tickets={ticketsByStatus[column.status]}
            onTicketClick={onTicketClick}
            onTicketEdit={onTicketEdit}
            activeTicket={activeTicket}
            pendingUpdate={pendingTicketUpdate}
          />
        ))}
      </Box>
      <DragOverlay dropAnimation={dropAnimation}>
        {activeTicket ? (
          <Box
            sx={{
              opacity: 0.8,
              boxShadow: '0 5px 15px rgba(0,0,0,0.15)',
              backgroundColor: 'white',
              cursor: 'grabbing',
              width: COLUMN_WIDTH - (COLUMN_PADDING * 2) - 10,
            }}
          >
            <TicketCard ticket={activeTicket} onClick={() => {}} />
          </Box>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
};

export default KanbanBoard; 
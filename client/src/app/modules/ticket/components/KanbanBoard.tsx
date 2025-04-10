import React, { useState } from 'react';
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
  KeyboardSensor
} from '@dnd-kit/core';

import { Ticket, TicketStatus } from '../types';
import { COLUMN_WIDTH, COLUMN_PADDING } from '../constants';
import KanbanColumn from './KanbanColumn';

interface KanbanBoardProps {
  tickets: Ticket[];
  isLoading: boolean;
  onTicketClick: (ticketId: string) => void;
  onTicketDrop: (ticketId: string, newStatus: TicketStatus) => void;
  onAddNewTicket: () => void;
}

const KanbanBoard: React.FC<KanbanBoardProps> = ({
  tickets,
  isLoading,
  onTicketClick,
  onTicketDrop,
  onAddNewTicket
}) => {
  const [activeTicket, setActiveTicket] = useState<Ticket | null>(null);

  // Setup sensors for drag interaction
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor)
  );

  // Group tickets by status
  const ticketsByStatus: Record<TicketStatus, Ticket[]> = {
    'open': [],
    'in progress': [],
    'testing': [],
    'completed': []
  };

  tickets.forEach(ticket => {
    if (ticketsByStatus[ticket.status]) {
      ticketsByStatus[ticket.status].push(ticket);
    }
  });

  // Define board columns
  const columns: Array<{ status: TicketStatus, title: string }> = [
    { status: 'open', title: 'Open' },
    { status: 'in progress', title: 'In Progress' },
    { status: 'testing', title: 'Testing' },
    { status: 'completed', title: 'Completed' },
  ];

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    const draggedTicket = tickets.find(t => t.id === active.id);
    if (draggedTicket) {
      setActiveTicket(draggedTicket);
    }
  };

  const handleDragOver = (event: DragOverEvent) => {
    // Optional: Add visual feedback during drag
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    
    // Reset active ticket
    setActiveTicket(null);
    
    if (!over) return;
    
    const ticketId = active.id as string;
    const newStatus = over.id as TicketStatus;
    
    const ticket = tickets.find(t => t.id === ticketId);
    
    if (ticket && ticket.status !== newStatus) {
      onTicketDrop(ticketId, newStatus);
    }
  };

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', gap: 2, overflowX: 'auto', pb: 2 }}>
        {columns.map((column) => (
          <Paper 
            key={column.status}
            sx={{ 
              width: COLUMN_WIDTH, 
              minWidth: COLUMN_WIDTH, 
              p: COLUMN_PADDING, 
              borderRadius: 1,
              height: 'calc(100vh - 250px)'
            }}
          >
            <Typography variant="h6" fontWeight={600} mb={2}>
              {column.title}
            </Typography>
            <Divider sx={{ mb: 2 }} />
            
            <Stack spacing={2}>
              {[1, 2, 3].map((i) => (
                <Skeleton 
                  key={i} 
                  variant="rectangular" 
                  height={120} 
                  sx={{ borderRadius: 1 }} 
                />
              ))}
            </Stack>
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
    >
      <Box 
        sx={{ 
          display: 'flex', 
          gap: 2, 
          overflowX: 'auto', 
          overflowY: 'hidden',
          pb: 2,
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
            activeTicket={activeTicket}
          />
        ))}
      </Box>
    </DndContext>
  );
};

export default KanbanBoard; 
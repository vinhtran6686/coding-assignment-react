import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Box } from '@mui/material';
import TicketCard from './TicketCard';
import { Ticket } from '../types';

interface SortableTicketItemProps {
  id: string;
  ticket: Ticket;
  onClick: (ticketId: string) => void;
}

const SortableTicketItem: React.FC<SortableTicketItemProps> = ({ 
  id, 
  ticket, 
  onClick 
}) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    position: 'relative' as const,
    zIndex: isDragging ? 1 : 0,
  };

  return (
    <Box
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      sx={{
        cursor: 'grab',
        '&:active': {
          cursor: 'grabbing',
        },
      }}
    >
      <TicketCard 
        ticket={ticket} 
        onClick={onClick} 
      />
    </Box>
  );
};

export default SortableTicketItem; 
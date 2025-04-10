import React, { useState, useEffect } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Box, CircularProgress } from '@mui/material';
import TicketCard from './TicketCard';
import { Ticket } from '../types';

interface SortableTicketItemProps {
  id: string;
  ticket: Ticket;
  onClick: (ticketId: string) => void;
  onEdit?: (ticketId: string) => void;
  isPending?: boolean;
}

const SortableTicketItem: React.FC<SortableTicketItemProps> = ({
  id,
  ticket,
  onClick,
  onEdit,
  isPending = false
}) => {
  const [isDragActive, setIsDragActive] = useState(false);

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id,
    // Add a delay to minimize accidental drags when trying to click
    transition: {
      duration: 150,
      easing: 'cubic-bezier(0.25, 1, 0.5, 1)',
    }
  });

  // Set document cursor during dragging for better UX
  useEffect(() => {
    if (isDragging) {
      document.body.style.cursor = 'grabbing';
      setIsDragActive(true);
    } else {
      // Small delay before resetting to avoid flicker
      const timer = setTimeout(() => {
        document.body.style.cursor = '';
        setIsDragActive(false);
      }, 50);
      return () => clearTimeout(timer);
    }
    return () => { };
  }, [isDragging]);

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
        position: 'relative',
        cursor: isDragActive ? 'grabbing' : 'grab',
        '&:hover': {
          boxShadow: isDragActive ? 'none' : '0 4px 8px rgba(0,0,0,0.1)',
          transform: isDragActive ? 'none' : 'translateY(-2px)',
        },
        '&:active': {
          cursor: 'grabbing',
        },
        filter: isPending ? 'grayscale(30%)' : 'none',
        transition: 'all 0.2s ease',
        // Add some margin to prevent tickets from sticking together
        mb: 1.5,
        borderRadius: '8px',
        // Add scale effect to the dragged item
        transform: isDragActive ? 'scale(1.03)' : 'none',
      }}
    >
      {isPending && (
        <Box
          sx={{
            position: 'absolute',
            top: 10,
            right: 10,
            zIndex: 2
          }}
        >
          <CircularProgress size={16} thickness={5} />
        </Box>
      )}
      <TicketCard
        ticket={ticket}
        onClick={onClick}
        onEdit={onEdit}
      />
    </Box>
  );
};

export default SortableTicketItem; 
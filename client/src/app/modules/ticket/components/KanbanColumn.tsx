import React from 'react';
import {
  Box,
  Typography,
  Paper,
  Divider,
  Badge,
  Button,
  alpha
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useDroppable } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';

import { Ticket, TicketStatus } from '../types';
import { statusColors, COLUMN_WIDTH, COLUMN_PADDING } from '../constants';
import TicketCard from './TicketCard';
import SortableTicketItem from './SortableTicketItem';

interface KanbanColumnProps {
  status: TicketStatus;
  title: string;
  tickets: Ticket[];
  onTicketClick: (ticketId: string) => void;
  activeTicket: Ticket | null;
}

const KanbanColumn: React.FC<KanbanColumnProps> = ({
  status,
  title,
  tickets,
  onTicketClick,
  activeTicket
}) => {
  const { setNodeRef, isOver } = useDroppable({
    id: status,
  });

  // Determine if we should highlight this column
  const highlightColumn = isOver ||
    (activeTicket !== null && activeTicket.status === status);


  // Derive styles based on status and drag state
  const columnColor = statusColors[status];
  const borderColor = isOver
    ? columnColor
    : 'divider';

  return (
    <Paper
      elevation={1}
      sx={{
        width: COLUMN_WIDTH,
        minWidth: COLUMN_WIDTH,
        height: 'calc(100vh - 250px)',
        display: 'flex',
        flexDirection: 'column',
        p: COLUMN_PADDING,
        border: '1px solid',
        borderColor: borderColor,
        borderRadius: 1,
        backgroundColor: 'white',
        transition: 'all 0.2s ease',
        borderLeft: `4px solid ${columnColor}`,
        ...(isOver && {
          boxShadow: `0 0 0 1px ${columnColor}`,
          borderStyle: 'dashed',
        }),
      }}
    >
      {/* Column Header */}
      <Box sx={{ mb: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography
            variant="h6"
            fontWeight={600}
            color={isOver ? columnColor : 'text.primary'}
          >
            {title}
          </Typography>
          <Badge
            badgeContent={tickets.length}
            color="primary"
            sx={{ ml: 1 }}
          />
        </Box>
      </Box>

      <Divider sx={{ mb: 2 }} />

      {/* Tickets Container */}
      <Box
        ref={setNodeRef}
        sx={{
          flexGrow: 1,
          overflowY: 'auto',
          overflowX: 'hidden',
          transition: 'background-color 0.2s',
          backgroundColor: isOver ? alpha(columnColor, 0.08) : 'transparent',
          borderRadius: 1,
          p: 1,
          '&::-webkit-scrollbar': {
            width: '6px',
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: 'rgba(0, 0, 0, 0.2)',
            borderRadius: '4px',
          },
          '&::-webkit-scrollbar-track': {
            backgroundColor: 'rgba(0, 0, 0, 0.05)',
          },
          // Add momentum scrolling on touch devices
          WebkitOverflowScrolling: 'touch'
        }}
      >
        <SortableContext
          items={tickets.map(t => t.id)}
          strategy={verticalListSortingStrategy}
        >
          {tickets.length > 0 ? (
            tickets.map((ticket) => (
              <SortableTicketItem
                key={ticket.id}
                id={ticket.id}
                ticket={ticket}
                onClick={onTicketClick}
              />
            ))
          ) : (
            <Box
              sx={{
                height: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                p: 2,
                color: 'text.secondary',
                borderRadius: 1,
                border: '1px dashed',
                borderColor: 'divider',
                fontSize: '0.875rem',
              }}
            >
              <Typography variant="body2">No tickets</Typography>
            </Box>
          )}
        </SortableContext>
      </Box>
    </Paper>
  );
};

export default KanbanColumn; 
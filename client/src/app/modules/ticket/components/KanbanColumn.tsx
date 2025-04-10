import React, { useMemo } from 'react';
import {
  Box,
  Typography,
  Paper,
  Divider,
  Badge,
  Button,
  alpha,
  Skeleton,
  CircularProgress
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
  onTicketEdit?: (ticketId: string) => void;
  activeTicket: Ticket | null;
  pendingUpdate?: { ticketId: string, newStatus: TicketStatus } | null;
}

const KanbanColumn: React.FC<KanbanColumnProps> = ({
  status,
  title,
  tickets,
  onTicketClick,
  onTicketEdit,
  activeTicket,
  pendingUpdate = null
}) => {
  const { setNodeRef, isOver } = useDroppable({
    id: status,
  });

  // Determine if this column is receiving a new ticket
  const isReceivingTicket = pendingUpdate && pendingUpdate.newStatus === status;
  const isLosingTicket = pendingUpdate &&
    tickets.some(t => t.id === pendingUpdate.ticketId) &&
    pendingUpdate.newStatus !== status;

  // Determine if we should highlight this column
  const highlightColumn = isOver ||
    (activeTicket !== null && activeTicket.status === status);

  // Derive styles based on status and drag state
  const columnColor = statusColors[status];
  const borderColor = isOver
    ? columnColor
    : 'divider';

  // Memoize ticket IDs to prevent unnecessary re-renders
  const ticketIds = useMemo(() => tickets.map(t => t.id), [tickets]);

  return (
    <Paper
      elevation={1}
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
        transition: 'all 0.2s ease',
        ...(isOver && {
          boxShadow: `0 0 0 2px ${columnColor}`,
          borderStyle: 'dashed',
        }),
        ...(isReceivingTicket && {
          boxShadow: `0 0 0 1px ${columnColor}`,
          backgroundColor: alpha(columnColor, 0.04),
        }),
      }}
    >
      {/* Column Header */}
      <Box sx={{ mb: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 1
        }}>
          <Typography
            variant="body1"
            fontWeight={600}
            lineHeight={1.2}
            color={isOver ? columnColor : 'text.primary'}
          >
            {title}
          </Typography>
          <Badge
            badgeContent={tickets.length}
            color="info"
            sx={{
              ml: 1,
            }}
          />
          {isReceivingTicket && (
            <CircularProgress size={16} thickness={6} sx={{ ml: 1, color: columnColor }} />
          )}
        </Box>
      </Box>

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
          WebkitOverflowScrolling: 'touch',
          // Min height to prevent layout jumping when empty
          minHeight: 100
        }}
      >
        <SortableContext
          items={ticketIds}
          strategy={verticalListSortingStrategy}
        >
          {tickets.length > 0 ? (
            tickets.map((ticket) => (
              <SortableTicketItem
                key={ticket.id}
                id={ticket.id}
                ticket={ticket}
                onClick={() => onTicketClick(ticket.id)}
                onEdit={onTicketEdit ? (id) => onTicketEdit(id) : undefined}
                isPending={pendingUpdate?.ticketId === ticket.id}
              />
            ))
          ) : (
            <Box
              sx={{
                height: '100%',
                minHeight: 120,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                p: 2,
                color: 'text.secondary',
                borderRadius: 1,
                border: '1px dashed',
                borderColor: 'divider',
                fontSize: '0.875rem',
                transition: 'all 0.2s ease',
                ...(isOver && {
                  borderColor: columnColor,
                  backgroundColor: alpha(columnColor, 0.04),
                }),
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
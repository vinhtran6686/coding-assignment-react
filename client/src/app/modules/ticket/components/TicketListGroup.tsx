import React from 'react';
import { 
  Paper, 
  Typography, 
  Box, 
  Badge,
  Divider,
  List,
  Avatar,
  alpha
} from '@mui/material';
import { useDroppable } from '@dnd-kit/core';
import { Ticket, TicketStatus } from '../types';
import { statusColors } from '../constants'; 
import TicketListItem from './TicketListItem';

interface TicketListGroupProps {
  title: string;
  status: TicketStatus;
  tickets: Ticket[];
  onTicketClick: (ticketId: string) => void;
  isBacklog?: boolean;
}

const TicketListGroup: React.FC<TicketListGroupProps> = ({
  title,
  status,
  tickets,
  onTicketClick,
  isBacklog = false
}) => {
  console.log(tickets);
  const { setNodeRef, isOver } = useDroppable({
    id: status,
  });

  // Format colors based on theme
  const bgColor = isBacklog 
    ? alpha(statusColors[status], 0.08)
    : 'background.paper';
  
  const titleColor = statusColors[status];

  return (
    <Paper
      elevation={1}
      sx={{
        p: 2,
        backgroundColor: bgColor,
        border: isOver 
          ? `2px dashed ${statusColors[status]}` 
          : isBacklog 
            ? `1px solid ${statusColors[status]}` 
            : '1px solid',
        borderColor: isOver ? 'transparent' : 'divider',
        borderRadius: 1,
        transition: 'all 0.2s',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          mb: 2,
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography
            variant="h6"
            sx={{ 
              fontWeight: 600,
              color: titleColor,
              display: 'flex',
              alignItems: 'center',
            }}
          >
            {title}
            <Badge
              badgeContent={tickets.length}
              color="primary"
              sx={{
                '& .MuiBadge-badge': {
                  right: -20,
                  top: 3,
                },
              }}
            />
          </Typography>
        </Box>
      </Box>

      <Divider sx={{ mb: 2 }} />

      <Box ref={setNodeRef} sx={{ minHeight: 100 }}>
        {tickets.length > 0 ? (
          <List disablePadding>
            {tickets.map((ticket) => (
              <TicketListItem
                key={ticket.id}
                ticket={ticket}
                onClick={() => onTicketClick(ticket.id)}
              />
            ))}
          </List>
        ) : (
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              p: 3,
              color: 'text.secondary',
              border: '1px dashed',
              borderColor: 'divider',
              borderRadius: 1,
            }}
          >
            <Typography variant="body2">No tickets available</Typography>
          </Box>
        )}
      </Box>
    </Paper>
  );
};

export default TicketListGroup; 
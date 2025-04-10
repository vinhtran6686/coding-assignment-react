import React, { useState } from 'react';
import { Paper, Box, Typography, Avatar, Chip, IconButton, Menu, MenuItem } from '@mui/material';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import VisibilityIcon from '@mui/icons-material/Visibility';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Ticket } from '../types';
import { priorityColors, statusColors } from '../constants';
import { formatDate } from '../../../utils/dateUtils';

interface TicketListItemProps {
  ticket: Ticket;
  onClick: (ticketId: string) => void;
}

const TicketListItem: React.FC<TicketListItemProps> = ({ ticket, onClick }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({
    id: ticket.id,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    setAnchorEl(null);
  };

  const handleViewDetails = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    onClick(ticket.id);
    setAnchorEl(null);
  };

  return (
    <Paper
      ref={setNodeRef}
      style={style}
      sx={{
        p: 2,
        mb: 1,
        borderRadius: '8px',
        bgcolor: 'background.paper',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        position: 'relative',
        '&:hover': {
          boxShadow: '0 4px 8px rgba(0,0,0,0.15)',
        },
      }}
      onClick={() => onClick(ticket.id)}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1, mr: 1 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
            <Typography 
              variant="body2" 
              color="text.secondary" 
              sx={{ 
                fontSize: '0.75rem', 
                mr: 1, 
                fontWeight: 500, 
                letterSpacing: '0.5px'
              }}
            >
              {ticket.id}
            </Typography>
            <Chip
              label={ticket.priority}
              size="small"
              sx={{
                bgcolor: priorityColors[ticket.priority],
                color: 'white',
                fontSize: '0.675rem',
                height: '20px',
                mr: 1
              }}
            />
          </Box>
          <Typography 
            variant="subtitle1" 
            sx={{ 
              fontWeight: 500, 
              mb: 1,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
            }}
          >
            {ticket.title}
          </Typography>
        </Box>
        
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Avatar 
            src={ticket.assigneeAvatar} 
            alt={ticket.assignee} 
            sx={{ width: 32, height: 32 }}
          />
          <IconButton 
            size="small" 
            sx={{ ml: 1 }} 
            onClick={handleMenuClick}
          >
            <MoreVertIcon fontSize="small" />
          </IconButton>
        </Box>
      </Box>

      <Box 
        sx={{ 
          position: 'absolute', 
          top: '50%', 
          left: -8, 
          transform: 'translateY(-50%)',
          opacity: 0.4,
          '&:hover': { opacity: 1 }
        }}
        {...attributes}
        {...listeners}
      >
        <DragIndicatorIcon fontSize="small" />
      </Box>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleMenuClose}
        onClick={(e) => e.stopPropagation()}
      >
        <MenuItem onClick={handleViewDetails}>View Details</MenuItem>
      </Menu>
    </Paper>
  );
};

export default TicketListItem; 
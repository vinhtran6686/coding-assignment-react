import React, { useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  Chip,
  Avatar,
  IconButton,
  CardActionArea,
  Tooltip,
  Divider,
  Menu,
  MenuItem
} from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import EditIcon from '@mui/icons-material/Edit';
import { Ticket } from '../types';
import { priorityBgs, priorityColors, statusColors } from '../constants';
import { formatDate } from '../../../utils/dateUtils';

interface TicketCardProps {
  ticket: Ticket;
  onClick: (ticketId: string) => void;
  onEdit?: (ticketId: string) => void;
}

const TicketCard: React.FC<TicketCardProps> = ({ ticket, onClick, onEdit }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const isMenuOpen = Boolean(anchorEl);

  // Format date to show only the date portion in a readable format 
  const formattedDate = ticket.updatedAt
    ? formatDate(ticket.updatedAt)
    : null;

  // Handle card click - opens the drawer
  const handleCardClick = () => {
    if (!isMenuOpen) { // Don't trigger card click if menu is open
      onClick(ticket.id);
    }
  };

  // Handle menu button click with proper propagation stop
  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    event.preventDefault();
    setAnchorEl(event.currentTarget);
  };

  // Handle menu close with proper propagation stop
  const handleMenuClose = (event?: React.MouseEvent<HTMLElement> | {}, reason?: string) => {
    if (event && 'stopPropagation' in event) {
      event.stopPropagation();
    }
    setAnchorEl(null);
  };

  // Handle edit menu item click with proper propagation stop
  const handleEdit = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    event.preventDefault();
    handleMenuClose();
    if (onEdit) {
      onEdit(ticket.id);
    }
  };

  return (
    <Card
      sx={{
        mb: 1,
        transition: 'transform 0.2s, box-shadow 0.2s',
        boxShadow: "none",
        '&:hover': {
          background: "white",
        },
      }}
    >
      <Box sx={{ position: 'relative' }}>
        {/* Menu Button - positioned absolutely to avoid drag conflicts */}
        <Box sx={{ 
          position: 'absolute', 
          top: '8px', 
          right: '8px', 
          zIndex: 10 // Higher z-index to ensure it's clickable
        }}>
          <IconButton 
            size="small" 
            onClick={handleMenuOpen}
            onMouseDown={(e) => e.stopPropagation()} // Prevent drag from starting
            sx={{ 
              backgroundColor: 'rgba(255,255,255,0.7)', // Semi-transparent background
              '&:hover': { 
                backgroundColor: 'rgba(255,255,255,0.9)'
              }
            }}
          >
            <MoreVertIcon fontSize="small" />
          </IconButton>
        </Box>

        <Menu
          id={`ticket-menu-${ticket.id}`}
          anchorEl={anchorEl}
          open={isMenuOpen}
          onClose={handleMenuClose}
          onClick={(e) => e.stopPropagation()}
          transformOrigin={{ horizontal: 'right', vertical: 'top' }}
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
          slotProps={{
            root: {
              onClick: (e) => e.stopPropagation() // Stop clicks inside menu from propagating
            }
          }}
        >
          <MenuItem onClick={handleEdit}>
            <EditIcon fontSize="small" sx={{ mr: 1 }} />
            Edit
          </MenuItem>
        </Menu>
 
        <Box 
          onClick={handleCardClick}
          sx={{ 
            cursor: 'pointer',
            '&:active': {
              cursor: isMenuOpen ? 'default' : 'pointer' // Change cursor based on menu state
            }
          }}
        >
          <CardContent sx={{ p: '12px', borderRadius: '8px', border: '1px solid #e2e6ed', pr: '36px' /* Space for the menu button */ }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <Tooltip title={`Priority: ${ticket.priority}`}>
                <Chip
                  label={ticket.priority}
                  size="small"
                  sx={{
                    bgcolor: priorityBgs[ticket.priority],
                    color: priorityColors[ticket.priority],
                    fontSize: '0.625rem',
                    fontWeight: 600,
                    height: '20px',
                    textTransform: 'capitalize',
                    mr: 1
                  }}
                />
              </Tooltip>
              {/* Spacer for layout */}
              <Box sx={{ flexGrow: 1 }} />
            </Box>
            
            {/* Ticket Title */}
            <Typography
              variant="subtitle2"
              component="h3"
              sx={{
                mb: 1.25,
                lineHeight: 1.4,
                fontWeight: 600,
                fontSize: '16px',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
              }}
            >
              {ticket.title}
            </Typography>
            <Typography
              variant="body2"
              component="div"
              sx={{
                mb: 1,
                lineHeight: 1.4,
                fontWeight: 400,
                color: 'text.secondary',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
              }}
            >
              {ticket.description}
            </Typography>

            <Divider sx={{ my: 1.5 }} />

            {/* Footer with Priority, Due Date, and Assignee */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 1 }}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                {formattedDate && (
                  <Tooltip title={`Due: ${formattedDate}`}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <AccessTimeIcon fontSize="small" sx={{ fontSize: 14, mr: 0.5, color: 'text.secondary' }} />
                      <Typography variant="caption" color="text.secondary">
                        {formattedDate}
                      </Typography>
                    </Box>
                  </Tooltip>
                )}
              </Box>
              {ticket.assignee && (
                <Tooltip title={`Assigned to: ${ticket.assignee}`}>
                  <Avatar
                    src={ticket.assigneeAvatar}
                    alt={ticket.assignee}
                    sx={{ width: 24, height: 24 }}
                  />
                </Tooltip>
              )}
            </Box>
          </CardContent>
        </Box>
      </Box>
    </Card>
  );
};

export default TicketCard; 
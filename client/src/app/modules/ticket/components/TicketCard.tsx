import React from 'react';
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
  Divider
} from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { Ticket } from '../types';
import { priorityColors, statusColors } from '../constants';
import { formatDate } from '../../../utils/dateUtils';

interface TicketCardProps {
  ticket: Ticket;
  onClick: (ticketId: string) => void;
}

const TicketCard: React.FC<TicketCardProps> = ({ ticket, onClick }) => {
  // Format date to show only the date portion in a readable format
  const formattedDate = ticket.dueDate
    ? formatDate(ticket.dueDate)
    : null;

  return (
    <Card
      sx={{
        mb: 2,
        borderLeft: `4px solid ${priorityColors[ticket.priority]}`,
        transition: 'transform 0.2s, box-shadow 0.2s',
        '&:hover': {
          transform: 'translateY(-2px)',
          boxShadow: '0 4px 10px rgba(0,0,0,0.15)',
        },
      }}
    >
      <CardActionArea onClick={() => onClick(ticket.id)}>
        <CardContent sx={{ p: 2 }}>
          {/* Ticket ID and Status */}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
            <Typography
              variant="caption"
              color="text.secondary"
              fontWeight="medium"
            >
              {ticket.id}
            </Typography>
            <Chip
              label={ticket.status}
              size="small"
              sx={{
                bgcolor: statusColors[ticket.status],
                color: 'white',
                fontSize: '0.625rem',
                height: '20px'
              }}
            />
          </Box>

          {/* Ticket Title */}
          <Typography
            variant="subtitle2"
            component="h3"
            sx={{
              mb: 1.5,
              lineHeight: 1.4,
              fontWeight: 600,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
            }}
          >
            {ticket.title}
          </Typography>

          <Divider sx={{ my: 1 }} />

          {/* Footer with Priority, Due Date, and Assignee */}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 1 }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Tooltip title={`Priority: ${ticket.priority}`}>
                <Chip
                  label={ticket.priority}
                  size="small"
                  sx={{
                    bgcolor: priorityColors[ticket.priority],
                    color: 'white',
                    fontSize: '0.625rem',
                    height: '20px',
                    mr: 1
                  }}
                />
              </Tooltip>

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
            <Typography variant="caption" color="text.secondary">{ticket.assignee}</Typography>
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
      </CardActionArea>
    </Card>
  );
};

export default TicketCard; 
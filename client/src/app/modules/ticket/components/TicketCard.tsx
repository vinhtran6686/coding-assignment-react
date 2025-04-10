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
import { priorityBgs, priorityColors, statusColors } from '../constants';
import { formatDate } from '../../../utils/dateUtils';

interface TicketCardProps {
  ticket: Ticket;
  onClick: (ticketId: string) => void;
}

const TicketCard: React.FC<TicketCardProps> = ({ ticket, onClick }) => {
  // Format date to show only the date portion in a readable format 
  const formattedDate = ticket.updatedAt
    ? formatDate(ticket.updatedAt)
    : null;

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
      <CardActionArea onClick={() => onClick(ticket.id)}>
        <CardContent sx={{ p: '12px', borderRadius: '8px', border: '1px solid #e2e6ed' }}>
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
      </CardActionArea>
    </Card>
  );
};

export default TicketCard; 
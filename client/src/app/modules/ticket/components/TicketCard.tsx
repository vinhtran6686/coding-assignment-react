import React from 'react';
import { 
  Card, 
  CardContent, 
  Typography, 
  Box, 
  Chip, 
  Grid,
  IconButton
} from '@mui/material';
import { 
  PriorityHigh as HighIcon, 
  ErrorOutline as CriticalIcon,
  ArrowDownward as LowIcon,
  Remove as MediumIcon,
  Schedule as ClockIcon
} from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { Ticket, TicketPriority, TicketStatus } from '../types';
import { styled } from '@mui/material/styles';

interface TicketCardProps {
  ticket: Ticket;
}

const StyledCard = styled(Card)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  transition: 'transform 0.2s, box-shadow 0.2s',
  '&:hover': {
    transform: 'translateY(-3px)',
    boxShadow: theme.shadows[6],
  },
  cursor: 'pointer',
  boxShadow: theme.shadows[2],
}));

const StyledLink = styled(Link)({
  textDecoration: 'none',
  color: 'inherit',
  width: '100%',
  display: 'block',
});

const TicketCard: React.FC<TicketCardProps> = ({ ticket }) => {
  // Function to get status color
  const getStatusColor = (status: TicketStatus) => {
    switch (status) {
      case TicketStatus.OPEN:
        return 'primary';
      case TicketStatus.IN_PROGRESS:
        return 'warning';
      case TicketStatus.RESOLVED:
        return 'success';
      case TicketStatus.CLOSED:
        return 'default';
      default:
        return 'default';
    }
  };

  // Function to get priority icon
  const getPriorityIcon = (priority: TicketPriority) => {
    switch (priority) {
      case TicketPriority.LOW:
        return <LowIcon fontSize="small" />;
      case TicketPriority.MEDIUM:
        return <MediumIcon fontSize="small" />;
      case TicketPriority.HIGH:
        return <HighIcon fontSize="small" color="warning" />;
      case TicketPriority.CRITICAL:
        return <CriticalIcon fontSize="small" color="error" />;
      default:
        return null;
    }
  };

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    }).format(date);
  };

  return (
    <StyledLink to={`/ticket/${ticket.id}`}>
      <StyledCard>
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={9}>
              <Typography variant="h6" gutterBottom>
                {ticket.title}
              </Typography>
              
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                {ticket.description.length > 120 
                  ? `${ticket.description.substring(0, 120)}...` 
                  : ticket.description}
              </Typography>
              
              <Box sx={{ display: 'flex', alignItems: 'center', mt: 2, color: 'text.secondary' }}>
                <ClockIcon fontSize="small" sx={{ mr: 0.5 }} />
                <Typography variant="caption">
                  Created: {formatDate(ticket.createdAt)}
                </Typography>
              </Box>
            </Grid>
            
            <Grid item xs={12} sm={3}>
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 1 }}>
                <Chip 
                  label={ticket.status} 
                  color={getStatusColor(ticket.status)} 
                  size="small" 
                  sx={{ textTransform: 'capitalize' }}
                />
                
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  {getPriorityIcon(ticket.priority)}
                  <Typography 
                    variant="caption" 
                    color="text.secondary" 
                    sx={{ ml: 0.5, textTransform: 'capitalize' }}
                  >
                    {ticket.priority}
                  </Typography>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </StyledCard>
    </StyledLink>
  );
};

export default TicketCard; 
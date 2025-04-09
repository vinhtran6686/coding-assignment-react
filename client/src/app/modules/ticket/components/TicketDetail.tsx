import React from 'react';
import { 
  Box, 
  Typography, 
  Chip, 
  Grid, 
  Button, 
  Divider,
  Card,
  CardContent,
  Stack
} from '@mui/material';
import { Link } from 'react-router-dom';
import { 
  Edit as EditIcon, 
  Delete as DeleteIcon,
  PriorityHigh as HighIcon,
  ErrorOutline as CriticalIcon,
  ArrowDownward as LowIcon,
  Remove as MediumIcon
} from '@mui/icons-material';
import { Ticket, TicketPriority, TicketStatus } from '../types';

interface TicketDetailProps {
  ticket: Ticket;
  onDelete: () => void;
}

const TicketDetail: React.FC<TicketDetailProps> = ({ ticket, onDelete }) => {
  // Format dates
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Get status color
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

  // Get priority icon
  const getPriorityIcon = (priority: TicketPriority) => {
    switch (priority) {
      case TicketPriority.LOW:
        return <LowIcon />;
      case TicketPriority.MEDIUM:
        return <MediumIcon />;
      case TicketPriority.HIGH:
        return <HighIcon color="warning" />;
      case TicketPriority.CRITICAL:
        return <CriticalIcon color="error" />;
      default:
        return null;
    }
  };

  // Get priority color
  const getPriorityColor = (priority: TicketPriority) => {
    switch (priority) {
      case TicketPriority.LOW:
        return 'info';
      case TicketPriority.MEDIUM:
        return 'success';
      case TicketPriority.HIGH:
        return 'warning';
      case TicketPriority.CRITICAL:
        return 'error';
      default:
        return 'default';
    }
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 3 }}>
        <Typography variant="h5" component="h2" gutterBottom>
          {ticket.title}
        </Typography>
        <Stack direction="row" spacing={1}>
          <Button
            variant="outlined"
            startIcon={<EditIcon />}
            component={Link}
            to={`/ticket/${ticket.id}/edit`}
          >
            Edit
          </Button>
          <Button
            variant="outlined"
            color="error"
            startIcon={<DeleteIcon />}
            onClick={onDelete}
          >
            Delete
          </Button>
        </Stack>
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Description
              </Typography>
              <Typography variant="body1" sx={{ whiteSpace: 'pre-line' }}>
                {ticket.description}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Details
              </Typography>
              
              <Stack spacing={2}>
                <Box>
                  <Typography variant="subtitle2" color="text.secondary">
                    Status
                  </Typography>
                  <Chip 
                    label={ticket.status}
                    color={getStatusColor(ticket.status)}
                    sx={{ mt: 0.5, textTransform: 'capitalize' }}
                  />
                </Box>

                <Box>
                  <Typography variant="subtitle2" color="text.secondary">
                    Priority
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', mt: 0.5 }}>
                    {getPriorityIcon(ticket.priority)}
                    <Chip 
                      label={ticket.priority}
                      color={getPriorityColor(ticket.priority)}
                      sx={{ ml: 1, textTransform: 'capitalize' }}
                    />
                  </Box>
                </Box>
                
                <Divider />
                
                <Box>
                  <Typography variant="subtitle2" color="text.secondary">
                    Created by
                  </Typography>
                  <Typography variant="body2">
                    User ID: {ticket.createdBy}
                  </Typography>
                </Box>
                
                {ticket.assignedTo && (
                  <Box>
                    <Typography variant="subtitle2" color="text.secondary">
                      Assigned to
                    </Typography>
                    <Typography variant="body2">
                      User ID: {ticket.assignedTo}
                    </Typography>
                  </Box>
                )}
                
                <Divider />
                
                <Box>
                  <Typography variant="subtitle2" color="text.secondary">
                    Created at
                  </Typography>
                  <Typography variant="body2">
                    {formatDate(ticket.createdAt)}
                  </Typography>
                </Box>
                
                <Box>
                  <Typography variant="subtitle2" color="text.secondary">
                    Updated at
                  </Typography>
                  <Typography variant="body2">
                    {formatDate(ticket.updatedAt)}
                  </Typography>
                </Box>
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default TicketDetail; 
import React from 'react';
import { 
  Card, 
  CardContent, 
  Typography, 
  Grid,
  Chip,
  Divider,
  Box,
  Avatar,
  Button,
  Stack,
  CircularProgress,
  Alert
} from '@mui/material';
import { Link } from 'react-router-dom';
import { Ticket } from '../services/ticketService';

interface TicketDetailProps {
  ticket: Ticket | undefined;
  loading: boolean;
  error: string | null;
}

const getStatusColor = (status: string) => {
  switch (status) {
    case 'open':
      return 'info';
    case 'in_progress':
      return 'warning';
    case 'resolved':
      return 'success';
    case 'closed':
      return 'default';
    default:
      return 'default';
  }
};

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case 'urgent':
      return 'error';
    case 'high':
      return 'warning';
    case 'medium':
      return 'info';
    case 'low':
      return 'success';
    default:
      return 'default';
  }
};

const TicketDetail: React.FC<TicketDetailProps> = ({ ticket, loading, error }) => {
  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return <Alert severity="error">{error}</Alert>;
  }

  if (!ticket) {
    return (
      <Alert severity="warning">
        Ticket not found
      </Alert>
    );
  }

  return (
    <Card>
      <CardContent>
        <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
          <Typography variant="h5" component="h2">
            Ticket #{ticket.id}
          </Typography>
          <Button
            variant="outlined"
            component={Link}
            to={`/crafted/pages/ticket/${ticket.id}/edit`}
          >
            Edit Ticket
          </Button>
        </Stack>
        
        <Typography variant="h6" gutterBottom>
          {ticket.title}
        </Typography>
        
        <Grid container spacing={2} sx={{ mb: 3 }}>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="body2" color="text.secondary">
              Status
            </Typography>
            <Chip 
              label={ticket.status.replace('_', ' ')} 
              color={getStatusColor(ticket.status) as any}
              size="small" 
              sx={{ mt: 0.5 }}
            />
          </Grid>
          
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="body2" color="text.secondary">
              Priority
            </Typography>
            <Chip 
              label={ticket.priority} 
              color={getPriorityColor(ticket.priority) as any}
              size="small" 
              sx={{ mt: 0.5 }}
            />
          </Grid>
          
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="body2" color="text.secondary">
              Created At
            </Typography>
            <Typography variant="body1">
              {new Date(ticket.created_at).toLocaleString()}
            </Typography>
          </Grid>
          
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="body2" color="text.secondary">
              Updated At
            </Typography>
            <Typography variant="body1">
              {new Date(ticket.updated_at).toLocaleString()}
            </Typography>
          </Grid>
        </Grid>
        
        <Divider sx={{ my: 3 }} />
        
        <Typography variant="h6" gutterBottom>
          Description
        </Typography>
        <Typography variant="body1" paragraph>
          {ticket.description}
        </Typography>
        
        <Divider sx={{ my: 3 }} />
        
        <Grid container spacing={4}>
          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle2" gutterBottom>
              Created By
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Avatar sx={{ width: 32, height: 32, mr: 1 }}>
                {ticket.created_by.charAt(0).toUpperCase()}
              </Avatar>
              <Typography>{ticket.created_by}</Typography>
            </Box>
          </Grid>
          
          {ticket.assigned_to && (
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle2" gutterBottom>
                Assigned To
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Avatar sx={{ width: 32, height: 32, mr: 1 }}>
                  {ticket.assigned_to.charAt(0).toUpperCase()}
                </Avatar>
                <Typography>{ticket.assigned_to}</Typography>
              </Box>
            </Grid>
          )}
        </Grid>
      </CardContent>
    </Card>
  );
};

export default TicketDetail; 
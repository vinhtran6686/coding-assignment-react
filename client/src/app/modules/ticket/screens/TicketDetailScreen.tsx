import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Container,
  Paper,
  Button,
  Breadcrumbs,
  Link as MuiLink,
  CircularProgress,
  Alert
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Link } from 'react-router-dom';
import TicketDetail from '../components/TicketDetail';
import { useTicket } from '../hooks/useTicket';

const TicketDetailScreen: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const ticketId = id || '';
  
  const { 
    ticket, 
    isLoading, 
    error,
    updateStatus
  } = useTicket(ticketId);
  
  const handleStatusChange = async (newStatus: string) => {
    if (ticket) {
      await updateStatus(newStatus as any);
    }
  };

  const handleBackToTickets = () => {
    navigate('/ticket');
  };

  if (isLoading) {
    return (
      <Container maxWidth="lg">
        <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
          <CircularProgress />
        </Box>
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="lg">
        <Alert severity="error" sx={{ my: 2 }}>
          {error instanceof Error ? error.message : 'Failed to load ticket'}
        </Alert>
        <Button
          onClick={handleBackToTickets}
          startIcon={<ArrowBackIcon />}
          sx={{ mt: 2 }}
        >
          Back to Tickets
        </Button>
      </Container>
    );
  }

  if (!ticket) {
    return (
      <Container maxWidth="lg">
        <Alert severity="warning" sx={{ my: 2 }}>
          Ticket not found
        </Alert>
        <Button
          onClick={handleBackToTickets}
          startIcon={<ArrowBackIcon />}
          sx={{ mt: 2 }}
        >
          Back to Tickets
        </Button>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg">
      {/* Title Section */}
      <Box sx={{ mb: 3, mt: 3 }}>
        <Button
          onClick={handleBackToTickets}
          startIcon={<ArrowBackIcon />}
          sx={{ mb: 2 }}
        >
          Back to Tickets
        </Button>
        
        <Typography variant="h4" component="h1" gutterBottom>
          Ticket Details
        </Typography>
        <Breadcrumbs aria-label="breadcrumb">
          <MuiLink component={Link} to="/dashboard" underline="hover" color="inherit">
            Dashboard
          </MuiLink>
          <MuiLink component={Link} to="/ticket" color="inherit">
            Tickets
          </MuiLink>
          <Typography color="text.primary">Ticket #{ticket.id.substring(0, 8)}</Typography>
        </Breadcrumbs>
      </Box>
      
      {/* Content Section */}
      <Paper sx={{ p: 3, mb: 4, borderRadius: 2, boxShadow: (theme) => theme.shadows[2] }}>
        <TicketDetail 
          ticket={ticket} 
          onStatusChange={handleStatusChange}
        />
      </Paper>
    </Container>
  );
};

export default TicketDetailScreen; 
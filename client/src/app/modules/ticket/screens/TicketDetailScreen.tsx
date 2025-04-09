import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Container,
  Paper,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
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
  const ticketId = parseInt(id || '0', 10);
  
  const { 
    ticket, 
    isLoading, 
    error, 
    deleteTicket, 
    isDeleting 
  } = useTicket(ticketId);
  
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const handleDeleteClick = () => {
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    const success = await deleteTicket();
    if (success) {
      setDeleteDialogOpen(false);
      navigate('/ticket');
    }
  };

  const handleDeleteCancel = () => {
    setDeleteDialogOpen(false);
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
          component={Link}
          to="/ticket"
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
          component={Link}
          to="/ticket"
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
      <Box sx={{ mb: 3 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Ticket Details
        </Typography>
        <Breadcrumbs aria-label="breadcrumb">
          <MuiLink component={Link} to="/dashboard" underline="hover" color="inherit">
            Dashboard
          </MuiLink>
          <MuiLink component={Link} to="/ticket" underline="hover" color="inherit">
            Tickets
          </MuiLink>
          <Typography color="text.primary">Ticket #{ticket.id}</Typography>
        </Breadcrumbs>
      </Box>
      
      {/* Content Section */}
      <Paper sx={{ p: 3, mb: 4, borderRadius: 2, boxShadow: (theme) => theme.shadows[2] }}>
        <TicketDetail 
          ticket={ticket} 
          onDelete={handleDeleteClick}
        />
      </Paper>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteDialogOpen}
        onClose={handleDeleteCancel}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Confirm Delete
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this ticket? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteCancel}>Cancel</Button>
          <Button 
            onClick={handleDeleteConfirm} 
            color="error" 
            autoFocus
            disabled={isDeleting}
          >
            {isDeleting ? 'Deleting...' : 'Delete'}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default TicketDetailScreen; 
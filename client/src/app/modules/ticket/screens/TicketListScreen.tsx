import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  Button, 
  Dialog, 
  DialogActions, 
  DialogContent, 
  DialogContentText, 
  DialogTitle,
  Paper,
  Container,
  Breadcrumbs,
  Link as MuiLink
} from '@mui/material';
import { Link } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import TicketList from '../components/TicketList';
import { useTickets } from '../hooks/useTickets';

const TicketListScreen: React.FC = () => {
  const { tickets, loading, error, removeTicket } = useTickets();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [ticketToDelete, setTicketToDelete] = useState<number | null>(null);

  const handleDeleteClick = (id: number) => {
    setTicketToDelete(id);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (ticketToDelete !== null) {
      await removeTicket(ticketToDelete);
      setDeleteDialogOpen(false);
      setTicketToDelete(null);
    }
  };

  const handleDeleteCancel = () => {
    setDeleteDialogOpen(false);
    setTicketToDelete(null);
  };

  return (
    <Container maxWidth="lg">
      {/* Title Section */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Tickets
        </Typography>
        <Breadcrumbs aria-label="breadcrumb">
          <MuiLink component={Link} to="/dashboard" underline="hover" color="inherit">
            Dashboard
          </MuiLink>
          <Typography color="text.primary">Tickets</Typography>
        </Breadcrumbs>
      </Box>
      
      {/* Content Section */}
      <Paper sx={{ p: 3, mb: 4, borderRadius: 2, boxShadow: (theme) => theme.shadows[2] }}>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 3 }}>
          <Button
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
            component={Link}
            to="/crafted/pages/ticket/new"
          >
            New Ticket
          </Button>
        </Box>

        <TicketList 
          tickets={tickets} 
          loading={loading} 
          error={error} 
          onDeleteTicket={handleDeleteClick} 
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
          <Button onClick={handleDeleteConfirm} color="error" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default TicketListScreen; 
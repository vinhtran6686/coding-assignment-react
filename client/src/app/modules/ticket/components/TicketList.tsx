import React from 'react';
import { 
  Box, 
  Typography, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Paper, 
  IconButton,
  Chip,
  CircularProgress,
  Alert
} from '@mui/material';
import { Delete as DeleteIcon, Edit as EditIcon } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { Ticket } from '../types';

interface TicketListProps {
  tickets: Ticket[];
  loading: boolean;
  error: string | null;
  onDeleteTicket: (id: number) => void;
}

const TicketList: React.FC<TicketListProps> = ({ tickets, loading, error, onDeleteTicket }) => {
  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Alert severity="error" sx={{ my: 2 }}>
        {error}
      </Alert>
    );
  }

  if (tickets.length === 0) {
    return (
      <Alert severity="info" sx={{ my: 2 }}>
        No tickets found. Create a new ticket to get started.
      </Alert>
    );
  }

  // Get status color 
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open':
        return 'primary';
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

  // Get priority color
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'low':
        return 'info';
      case 'medium':
        return 'success';
      case 'high':
        return 'warning';
      case 'critical':
        return 'error';
      default:
        return 'default';
    }
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="tickets table">
        <TableHead>
          <TableRow>
            <TableCell>Title</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Priority</TableCell>
            <TableCell>Created</TableCell>
            <TableCell align="right">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tickets.map((ticket) => (
            <TableRow
              key={ticket.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                <Link to={`/ticket/${ticket.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                  <Typography variant="body1" fontWeight="medium">
                    {ticket.title}
                  </Typography>
                </Link>
              </TableCell>
              <TableCell>
                <Chip 
                  label={ticket.status} 
                  color={getStatusColor(ticket.status)} 
                  size="small" 
                  sx={{ textTransform: 'capitalize' }}
                />
              </TableCell>
              <TableCell>
                <Chip 
                  label={ticket.priority} 
                  color={getPriorityColor(ticket.priority)} 
                  size="small" 
                  sx={{ textTransform: 'capitalize' }}
                />
              </TableCell>
              <TableCell>
                {new Date(ticket.createdAt).toLocaleDateString()}
              </TableCell>
              <TableCell align="right">
                <IconButton
                  component={Link}
                  to={`/ticket/${ticket.id}`}
                  size="small"
                  aria-label="edit"
                >
                  <EditIcon fontSize="small" />
                </IconButton>
                <IconButton
                  size="small"
                  aria-label="delete"
                  onClick={() => onDeleteTicket(ticket.id)}
                >
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TicketList; 
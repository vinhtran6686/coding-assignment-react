import React from 'react';
import { Link } from 'react-router-dom';
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
  Chip,
  Button,
  IconButton,
  CircularProgress,
  Alert
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { Ticket, TicketStatus } from '../types';
import { statusColors, priorityColors } from '../constants';

interface TicketListProps {
  tickets: Ticket[];
  loading: boolean;
  error: string | null;
  onDeleteTicket: (id: string) => void;
}

const TicketList: React.FC<TicketListProps> = ({ tickets, loading, error, onDeleteTicket }) => {
  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    }).format(date);
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return <Alert severity="error">{error}</Alert>;
  }

  if (tickets.length === 0) {
    return (
      <Box textAlign="center" py={4}>
        <Typography variant="h6" color="text.secondary" gutterBottom>
          No tickets found
        </Typography>
        <Typography variant="body2" color="text.secondary" paragraph>
          There are no tickets to display. Create a new ticket to get started.
        </Typography>
      </Box>
    );
  }

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="ticket table">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Title</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Priority</TableCell>
            <TableCell>Created</TableCell>
            <TableCell>Assignee</TableCell>
            <TableCell align="right">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tickets.map((ticket) => (
            <TableRow key={ticket.id} hover>
              <TableCell>{ticket.id.substring(0, 8)}</TableCell>
              <TableCell>{ticket.title}</TableCell>
              <TableCell>
                <Chip
                  label={ticket.status}
                  size="small"
                  sx={{ 
                    textTransform: 'capitalize',
                    bgcolor: statusColors[ticket.status],
                    color: 'white'
                  }}
                />
              </TableCell>
              <TableCell>
                <Chip
                  label={ticket.priority}
                  size="small"
                  sx={{ 
                    textTransform: 'capitalize',
                    bgcolor: priorityColors[ticket.priority],
                    color: 'white'
                  }}
                />
              </TableCell>
              <TableCell>{formatDate(ticket.createdAt)}</TableCell>
              <TableCell>
                {ticket.assignee ? ticket.assignee : 'Unassigned'}
              </TableCell>
              <TableCell align="right">
                <IconButton
                  component={Link}
                  to={`/ticket/${ticket.id}`}
                  size="small"
                  aria-label="view"
                >
                  <VisibilityIcon fontSize="small" />
                </IconButton>
                <IconButton
                  color="error"
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
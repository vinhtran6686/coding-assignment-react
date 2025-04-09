import React from 'react';
import { 
  Paper, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow,
  Typography,
  Chip,
  IconButton,
  Box,
  LinearProgress,
  Alert
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DeleteIcon from '@mui/icons-material/Delete';
import { Link } from 'react-router-dom';
import { Ticket } from '../services/ticketService';

interface TicketListProps {
  tickets: Ticket[];
  loading: boolean;
  error: string | null;
  onDeleteTicket: (id: number) => void;
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

const TicketList: React.FC<TicketListProps> = ({ tickets, loading, error, onDeleteTicket }) => {
  if (error) {
    return <Alert severity="error">{error}</Alert>;
  }

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      {loading && <LinearProgress />}
      
      <TableContainer sx={{ maxHeight: 600 }}>
        <Table stickyHeader aria-label="ticket list">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Priority</TableCell>
              <TableCell>Created</TableCell>
              <TableCell>Assigned To</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tickets.length === 0 && !loading ? (
              <TableRow>
                <TableCell colSpan={7} align="center">
                  <Typography variant="body1" sx={{ py: 2 }}>
                    No tickets found
                  </Typography>
                </TableCell>
              </TableRow>
            ) : (
              tickets.map((ticket) => (
                <TableRow key={ticket.id} hover>
                  <TableCell>{ticket.id}</TableCell>
                  <TableCell>
                    <Typography variant="body2" sx={{ fontWeight: 'medium' }}>
                      {ticket.title}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Chip 
                      label={ticket.status.replace('_', ' ')} 
                      color={getStatusColor(ticket.status) as any} 
                      size="small" 
                    />
                  </TableCell>
                  <TableCell>
                    <Chip 
                      label={ticket.priority} 
                      color={getPriorityColor(ticket.priority) as any}
                      size="small" 
                    />
                  </TableCell>
                  <TableCell>
                    {new Date(ticket.created_at).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    {ticket.assigned_to || '-'}
                  </TableCell>
                  <TableCell align="right">
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                      <IconButton 
                        component={Link} 
                        to={`/crafted/pages/ticket/${ticket.id}`}
                        size="small" 
                        color="primary"
                      >
                        <VisibilityIcon fontSize="small" />
                      </IconButton>
                      <IconButton 
                        component={Link} 
                        to={`/crafted/pages/ticket/${ticket.id}/edit`} 
                        size="small" 
                        color="secondary"
                      >
                        <EditIcon fontSize="small" />
                      </IconButton>
                      <IconButton 
                        onClick={() => onDeleteTicket(ticket.id)} 
                        size="small" 
                        color="error"
                      >
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </Box>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default TicketList; 
import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Paper,
  TextField,
  InputAdornment,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Chip,
  Alert,
  SelectChangeEvent
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import PersonIcon from '@mui/icons-material/Person';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';

import { useTickets } from '../hooks/useTickets';
import { Ticket, TicketStatus, TicketPriority, CreateTicketRequest } from '../types';
import { statusColors, priorityColors } from '../constants';
import { useAuth } from '../../auth/core/Auth';
import KanbanBoard from '../components/KanbanBoard';
import AddTicketForm from '../components/AddTicketForm';
import TicketDetailDrawer from '../components/TicketDetailDrawer';

const KanbanTicketBoardScreen: React.FC = () => {
  const { currentUser } = useAuth();
  console.log('currentUser', currentUser);
  const { tickets, loading, error, updateTicket, addTicket } = useTickets();

  // UI State
  const [isAddTicketModalOpen, setIsAddTicketModalOpen] = useState(false);
  const [isAddingTicket, setIsAddingTicket] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
  const [isDetailDrawerOpen, setIsDetailDrawerOpen] = useState(false); 

  // Filter State
  const [searchQuery, setSearchQuery] = useState('');
  const [showOnlyMyTickets, setShowOnlyMyTickets] = useState(false);
  const [statusFilter, setStatusFilter] = useState<string>('');
  const [priorityFilter, setPriorityFilter] = useState<string>('');

  // Error handling
  const [operationError, setOperationError] = useState<string | null>(null);

  // Filter tickets based on all criteria
  const filteredTickets = tickets.filter(ticket => {
    const matchesSearch = !searchQuery ||
      ticket.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ticket.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (ticket.description && ticket.description.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesStatus = !statusFilter || ticket.status === statusFilter;
    const matchesPriority = !priorityFilter || ticket.priority === priorityFilter;
    const matchesAssignee = !showOnlyMyTickets || ticket.assigneeId === currentUser?.id;

    return matchesSearch && matchesStatus && matchesPriority && matchesAssignee;
  });

  // Clear error after 5 seconds
  useEffect(() => {
    let timer: NodeJS.Timeout | undefined;
    if (operationError) {
      timer = setTimeout(() => {
        setOperationError(null);
      }, 5000);
    }
    // Return cleanup function
    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [operationError]);

  const handleTicketClick = (ticketId: string) => {
    const ticket = tickets.find(t => t.id === ticketId);
    if (ticket) {
      setSelectedTicket(ticket);
      setIsDetailDrawerOpen(true);
    }
  };

  const handleTicketDrop = (ticketId: string, newStatus: TicketStatus) => {
    const ticket = tickets.find(t => t.id === ticketId);
    if (ticket && ticket.status !== newStatus) {
      try {
        const updatedTicket = {
          ...ticket,
          status: newStatus
        };
        updateTicket(updatedTicket);
      } catch (error) {
        setOperationError('Failed to update ticket status. Please try again.');
        console.error('Error updating ticket status:', error);
      }
    }
  };

  const handleAddTicket = async (ticketData: CreateTicketRequest) => {
    setIsAddingTicket(true);
    try {
      const result = await addTicket(ticketData);
      if (result.success) {
        setIsAddTicketModalOpen(false);
        return true;
      }
      setOperationError('Failed to add ticket. Please try again.');
      return false;
    } catch (error) {
      setOperationError('Failed to add ticket. Please try again.');
      console.error('Error adding ticket:', error);
      return false;
    } finally {
      setIsAddingTicket(false);
    }
  };

  const handleToggleMyTickets = () => {
    setShowOnlyMyTickets(prev => !prev);
  };

  const handleStatusFilterChange = (event: SelectChangeEvent<string>) => {
    setStatusFilter(event.target.value);
  };

  const handlePriorityFilterChange = (event: SelectChangeEvent<string>) => {
    setPriorityFilter(event.target.value);
  };

  const clearFilters = () => {
    setSearchQuery('');
    setStatusFilter('');
    setPriorityFilter('');
    setShowOnlyMyTickets(false);
  };

  const hasActiveFilters = !!searchQuery || !!statusFilter || !!priorityFilter || showOnlyMyTickets;

  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" fontWeight={600}>Ticket Board</Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={() => setIsAddTicketModalOpen(true)}
        >
          New Ticket
        </Button>
      </Box>

      {/* Error Alert */}
      {operationError && (
        <Alert
          severity="error"
          sx={{ mb: 2 }}
          onClose={() => setOperationError(null)}
        >
          {operationError}
        </Alert>
      )}

      {/* Toolbar */}
      <Paper
        elevation={1}
        sx={{
          p: 2,
          mb: 3,
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          alignItems: { xs: 'stretch', sm: 'center' },
          gap: 2
        }}
      >
        <TextField
          placeholder="Search tickets..."
          size="small"
          fullWidth
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon fontSize="small" />
              </InputAdornment>
            ),
            ...(searchQuery ? {
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    size="small"
                    onClick={() => setSearchQuery('')}
                  >
                    <CloseIcon fontSize="small" />
                  </IconButton>
                </InputAdornment>
              )
            } : {})
          }}
          sx={{ maxWidth: { sm: 300 } }}
        />

        <Box sx={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 1,
          justifyContent: 'flex-end',
          flexGrow: 1
        }}>
          <Button
            variant={showOnlyMyTickets ? "contained" : "outlined"}
            size="small"
            startIcon={<PersonIcon />}
            onClick={handleToggleMyTickets}
          >
            My Tasks
          </Button>

          <FormControl size="small" sx={{ minWidth: 120 }}>
            <InputLabel id="status-filter-label">Status</InputLabel>
            <Select
              labelId="status-filter-label"
              id="status-filter"
              value={statusFilter}
              label="Status"
              onChange={handleStatusFilterChange}
              size="small"
            >
              <MenuItem value="">All</MenuItem>
              <MenuItem value="open">Open</MenuItem>
              <MenuItem value="in progress">In Progress</MenuItem>
              <MenuItem value="testing">Testing</MenuItem>
              <MenuItem value="completed">Completed</MenuItem>
              <MenuItem value="backlog">Backlog</MenuItem>
            </Select>
          </FormControl>

          <FormControl size="small" sx={{ minWidth: 120 }}>
            <InputLabel id="priority-filter-label">Priority</InputLabel>
            <Select
              labelId="priority-filter-label"
              id="priority-filter"
              value={priorityFilter}
              label="Priority"
              onChange={handlePriorityFilterChange}
              size="small"
            >
              <MenuItem value="">All</MenuItem>
              <MenuItem value="high">High</MenuItem>
              <MenuItem value="medium">Medium</MenuItem>
              <MenuItem value="low">Low</MenuItem>
            </Select>
          </FormControl>

          {hasActiveFilters && (
            <Button
              variant="outlined"
              size="small"
              color="secondary"
              onClick={clearFilters}
            >
              Clear All
            </Button>
          )}
        </Box>
      </Paper>

      {/* Active Filters Display */}
      {hasActiveFilters && (
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
          {searchQuery && (
            <Chip
              label={`Search: ${searchQuery}`}
              size="small"
              onDelete={() => setSearchQuery('')}
            />
          )}
          {statusFilter && (
            <Chip
              label={`Status: ${statusFilter}`}
              size="small"
              sx={{ bgcolor: `${statusColors[statusFilter as TicketStatus]}20`, color: statusColors[statusFilter as TicketStatus] }}
              onDelete={() => setStatusFilter('')}
            />
          )}
          {priorityFilter && (
            <Chip
              label={`Priority: ${priorityFilter}`}
              size="small"
              sx={{ bgcolor: `${priorityColors[priorityFilter as TicketPriority]}20`, color: priorityColors[priorityFilter as TicketPriority] }}
              onDelete={() => setPriorityFilter('')}
            />
          )}
          {showOnlyMyTickets && (
            <Chip
              label="My Tasks Only"
              size="small"
              onDelete={handleToggleMyTickets}
            />
          )}
        </Box>
      )}

      {/* Board Content */}
      <Box sx={{ flexGrow: 1, overflow: 'hidden' }}>
        <KanbanBoard
          tickets={filteredTickets}
          isLoading={loading}
          onTicketClick={handleTicketClick}
          onTicketDrop={handleTicketDrop}
          onAddNewTicket={() => setIsAddTicketModalOpen(true)}
        />
      </Box>

      {/* Add Ticket Modal */}
      <Dialog
        open={isAddTicketModalOpen}
        onClose={() => !isAddingTicket && setIsAddTicketModalOpen(false)}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="h6">Add New Ticket</Typography>
            <IconButton
              edge="end"
              onClick={() => !isAddingTicket && setIsAddTicketModalOpen(false)}
              disabled={isAddingTicket}
            >
              <CloseIcon />
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent>
          <AddTicketForm
            onSubmit={handleAddTicket}
            isSubmitting={isAddingTicket}
            onCancel={() => setIsAddTicketModalOpen(false)}
          />
        </DialogContent>
      </Dialog>

      {/* Ticket Detail Drawer */}
      <TicketDetailDrawer
        open={isDetailDrawerOpen}
        ticket={selectedTicket}
        onClose={() => setIsDetailDrawerOpen(false)}
      />
    </Box>
  );
};

export default KanbanTicketBoardScreen; 
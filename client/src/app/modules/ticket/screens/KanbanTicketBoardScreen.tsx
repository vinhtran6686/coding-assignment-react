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
        <Typography variant="h6" fontWeight={600}>Ticket Board</Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={() => setIsAddTicketModalOpen(true)}
        >
          Add New Ticket
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

      {/* Content */}
      <Paper
        elevation={1}
        sx={{
          mb: 3,
          display: 'flex',
          borderRadius: 4,
          flexDirection: 'column',
          alignItems: 'stretch',
          gap: 2
        }}
      >
        {/* Toolbar */}
        <Box
          sx={{
            px: 2,
            py: '20px',
            borderBottom: '1px solid #e0e0e0',
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            alignItems: { xs: 'stretch', sm: 'center' },
            gap: 2
          }}
        >
          <TextField
            placeholder="Search tickets..."
            size="small"
            sx={{
              width: { sm: 240 },
              flexGrow: 1,
              '& .MuiOutlinedInput-root': {
                borderRadius: '8px',
                fontSize: '14px'
              }
            }}
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
          />

          <Box sx={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 1,
            justifyContent: 'flex-end',
            flexGrow: 1
          }}>
            <Button
              variant={showOnlyMyTickets ? "outlined" : "text"}
              size="small"
              sx={{
                borderRadius: '8px',
                fontSize: '14px',
                fontWeight: showOnlyMyTickets ? 600 : 400
              }}
              onClick={handleToggleMyTickets}
            >
              My Tasks
            </Button>

            <FormControl size="small" sx={{ minWidth: 120 }}>
              <InputLabel id="status-filter-label" sx={{ fontSize: '14px' }}>Status</InputLabel>
              <Select
                labelId="status-filter-label"
                id="status-filter"
                value={statusFilter}
                label="Status"
                onChange={handleStatusFilterChange}
                size="small"
                sx={{
                  borderRadius: '8px',
                  fontSize: '14px',
                  '.MuiOutlinedInput-notchedOutline': {
                    borderRadius: '8px'
                  }
                }}
              >
                <MenuItem value="" sx={{ fontSize: '14px' }}>All</MenuItem>
                <MenuItem value="open" sx={{ fontSize: '14px' }}>Open</MenuItem>
                <MenuItem value="in progress" sx={{ fontSize: '14px' }}>In Progress</MenuItem>
                <MenuItem value="testing" sx={{ fontSize: '14px' }}>Testing</MenuItem>
                <MenuItem value="completed" sx={{ fontSize: '14px' }}>Completed</MenuItem>
              </Select>
            </FormControl>

            <FormControl size="small" sx={{ minWidth: 120 }}>
              <InputLabel id="priority-filter-label" sx={{ fontSize: '14px' }}>Priority</InputLabel>
              <Select
                labelId="priority-filter-label"
                id="priority-filter"
                value={priorityFilter}
                label="Priority"
                onChange={handlePriorityFilterChange}
                size="small"
                sx={{
                  borderRadius: '8px',
                  fontSize: '14px',
                  '.MuiOutlinedInput-notchedOutline': {
                    borderRadius: '8px'
                  }
                }}
              >
                <MenuItem value="" sx={{ fontSize: '14px' }}>All</MenuItem>
                <MenuItem value="high" sx={{ fontSize: '14px' }}>High</MenuItem>
                <MenuItem value="medium" sx={{ fontSize: '14px' }}>Medium</MenuItem>
                <MenuItem value="low" sx={{ fontSize: '14px' }}>Low</MenuItem>
              </Select>
            </FormControl>

            {hasActiveFilters && (
              <Button
                variant="outlined"
                size="small"
                color="secondary"
                onClick={clearFilters}
                sx={{
                  borderRadius: '8px',
                  fontSize: '14px'
                }}
              >
                Clear All
              </Button>
            )}
          </Box>
        </Box>

        {/* Active Filters Display */}
        {hasActiveFilters && (
          <Box sx={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 1,
            px: 2,
            borderBottom: '1px solid #e0e0e0'
          }}>
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
      </Paper>
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
import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Divider,
  Chip,
  Stack,
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Button,
  FormControl,
  InputLabel,
  Select,
  FormHelperText,
  SelectChangeEvent,
} from '@mui/material';
import {
  MoreVert as MoreIcon,
  AccessTime as ClockIcon,
  Person as PersonIcon,
  Flag as FlagIcon,
} from '@mui/icons-material';
import { Ticket, TicketStatus } from '../types';
import { TicketStatus as TicketStatusConstant } from '../constants';
import { statusColors, priorityColors } from '../constants';

interface TicketDetailProps {
  ticket: Ticket;
  onStatusChange?: (newStatus: string) => Promise<void>;
}

const TicketDetail: React.FC<TicketDetailProps> = ({ 
  ticket, 
  onStatusChange 
}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [changing, setChanging] = useState(false);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };

  const handleStatusChange = async (event: SelectChangeEvent<string>) => {
    if (onStatusChange) {
      setChanging(true);
      try {
        await onStatusChange(event.target.value);
      } finally {
        setChanging(false);
      }
    }
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 3 }}>
        <Typography variant="h4" component="h1">
          {ticket.id.substring(0, 8)}: {ticket.title}
        </Typography>
      </Box>
      
      <Paper sx={{ p: 3, mb: 4 }}>
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, justifyContent: 'space-between', mb: 2, gap: 2 }}>
          <Box>
            <Typography variant="subtitle2" color="text.secondary" gutterBottom>
              Status
            </Typography>
            
            {onStatusChange ? (
              <FormControl variant="outlined" size="small" sx={{ minWidth: 200 }}>
                <Select
                  value={ticket.status}
                  onChange={handleStatusChange}
                  disabled={changing}
                  sx={{
                    '& .MuiSelect-select': {
                      color: '#fff',
                      backgroundColor: statusColors[ticket.status],
                      '&:hover': {
                        backgroundColor: statusColors[ticket.status],
                      },
                    }
                  }}
                >
                  <MenuItem value="open">Open</MenuItem>
                  <MenuItem value="in progress">In Progress</MenuItem>
                  <MenuItem value="testing">Testing</MenuItem>
                  <MenuItem value="completed">Completed</MenuItem>
                  <MenuItem value="backlog">Backlog</MenuItem>
                </Select>
              </FormControl>
            ) : (
              <Chip 
                label={ticket.status} 
                sx={{ 
                  mt: 0.5, 
                  textTransform: 'capitalize',
                  backgroundColor: statusColors[ticket.status],
                  color: 'white',
                }}
              />
            )}
          </Box>
          
          <Box>
            <Typography variant="subtitle2" color="text.secondary" gutterBottom>
              Priority
            </Typography>
            <Chip 
              label={ticket.priority} 
              icon={<FlagIcon fontSize="small" />}
              sx={{ 
                mt: 0.5, 
                textTransform: 'capitalize',
                backgroundColor: priorityColors[ticket.priority as keyof typeof priorityColors],
                color: 'white',
              }}
            />
          </Box>
          
          <Box sx={{ textAlign: 'right' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', mb: 1 }}>
              <ClockIcon fontSize="small" sx={{ mr: 1, color: 'text.secondary' }} />
              <Typography variant="body2">
                Created: {formatDate(ticket.createdAt)}
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
              <ClockIcon fontSize="small" sx={{ mr: 1, color: 'text.secondary' }} />
              <Typography variant="body2">
                Updated: {formatDate(ticket.updatedAt)}
              </Typography>
            </Box>
          </Box>
        </Box>
        
        <Divider sx={{ my: 2 }} />
        
        <Typography variant="h6" gutterBottom>
          Description
        </Typography>
        <Typography variant="body1" paragraph>
          {ticket.description}
        </Typography>
        
        <Divider sx={{ my: 2 }} />
        
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Box>
            <Typography variant="subtitle2" color="text.secondary">
              Ticket ID
            </Typography>
            <Typography variant="body2" sx={{ mt: 1 }}>
              ID: {ticket.id}
            </Typography>
          </Box>
          
          <Box>
            {ticket.assignee ? (
              <Box>
                <Typography variant="subtitle2" color="text.secondary">
                  Assigned to
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <PersonIcon fontSize="small" sx={{ mr: 1 }} />
                  <Typography variant="body2">
                    {ticket.assignee}
                  </Typography>
                </Box>
              </Box>
            ) : (
              <Box>
                <Typography variant="subtitle2" color="text.secondary">
                  Unassigned
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  This ticket is not assigned to anyone
                </Typography>
              </Box>
            )}
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};

export default TicketDetail; 
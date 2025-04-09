import React, { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import {
  Box,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Typography,
  Paper,
  FormHelperText,
  Grid,
} from '@mui/material';
import { Ticket, TicketPriority, TicketStatus, CreateTicketRequest, UpdateTicketRequest } from '../types';

interface TicketFormProps {
  ticket?: Ticket;
  onSubmit: (data: CreateTicketRequest | UpdateTicketRequest) => Promise<boolean>;
  isSubmitting?: boolean;
  isEdit?: boolean;
}

const TicketForm: React.FC<TicketFormProps> = ({
  ticket,
  onSubmit,
  isSubmitting = false,
  isEdit = false,
}) => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateTicketRequest | UpdateTicketRequest>({
    defaultValues: {
      title: ticket?.title || '',
      description: ticket?.description || '',
      priority: ticket?.priority || TicketPriority.MEDIUM,
      ...(isEdit && { status: ticket?.status || TicketStatus.OPEN }),
    },
  });

  // Reset form when ticket changes
  useEffect(() => {
    if (ticket) {
      reset({
        title: ticket.title,
        description: ticket.description,
        priority: ticket.priority,
        ...(isEdit && { status: ticket.status }),
      });
    }
  }, [ticket, reset, isEdit]);

  const handleFormSubmit = async (data: CreateTicketRequest | UpdateTicketRequest) => {
    await onSubmit(data);
  };

  return (
    <Paper sx={{ p: 3 }}>
      <Box component="form" onSubmit={handleSubmit(handleFormSubmit)}>
        <Typography variant="h6" sx={{ mb: 3 }}>
          {isEdit ? 'Edit Ticket' : 'Create New Ticket'}
        </Typography>
        
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Controller
              name="title"
              control={control}
              rules={{ required: 'Title is required' }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Title"
                  fullWidth
                  error={!!errors.title}
                  helperText={errors.title?.message}
                  disabled={isSubmitting}
                />
              )}
            />
          </Grid>
          
          <Grid item xs={12}>
            <Controller
              name="description"
              control={control}
              rules={{ required: 'Description is required' }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Description"
                  fullWidth
                  multiline
                  rows={4}
                  error={!!errors.description}
                  helperText={errors.description?.message}
                  disabled={isSubmitting}
                />
              )}
            />
          </Grid>
          
          <Grid item xs={12} md={6}>
            <Controller
              name="priority"
              control={control}
              rules={{ required: 'Priority is required' }}
              render={({ field }) => (
                <FormControl fullWidth error={!!errors.priority}>
                  <InputLabel>Priority</InputLabel>
                  <Select
                    {...field}
                    label="Priority"
                    disabled={isSubmitting}
                  >
                    <MenuItem value={TicketPriority.LOW}>Low</MenuItem>
                    <MenuItem value={TicketPriority.MEDIUM}>Medium</MenuItem>
                    <MenuItem value={TicketPriority.HIGH}>High</MenuItem>
                    <MenuItem value={TicketPriority.CRITICAL}>Critical</MenuItem>
                  </Select>
                  {errors.priority && (
                    <FormHelperText>{errors.priority.message}</FormHelperText>
                  )}
                </FormControl>
              )}
            />
          </Grid>
          
          {isEdit && (
            <Grid item xs={12} md={6}>
              <Controller
                name="status"
                control={control}
                rules={{ required: 'Status is required' }}
                render={({ field }) => (
                  <FormControl fullWidth error={!!errors.status}>
                    <InputLabel>Status</InputLabel>
                    <Select
                      {...field}
                      label="Status"
                      disabled={isSubmitting}
                    >
                      <MenuItem value={TicketStatus.OPEN}>Open</MenuItem>
                      <MenuItem value={TicketStatus.IN_PROGRESS}>In Progress</MenuItem>
                      <MenuItem value={TicketStatus.RESOLVED}>Resolved</MenuItem>
                      <MenuItem value={TicketStatus.CLOSED}>Closed</MenuItem>
                    </Select>
                    {errors.status && (
                      <FormHelperText>{errors.status.message}</FormHelperText>
                    )}
                  </FormControl>
                )}
              />
            </Grid>
          )}
          
          <Grid item xs={12}>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
              <Button 
                type="submit" 
                variant="contained" 
                color="primary"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Saving...' : isEdit ? 'Update Ticket' : 'Create Ticket'}
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Paper>
  );
};

export default TicketForm; 
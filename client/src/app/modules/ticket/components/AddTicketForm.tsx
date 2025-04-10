import React, { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Stack,
  CircularProgress,
  SelectChangeEvent,
  Avatar,
  Typography
} from '@mui/material';

interface CreateTicketRequest {
  title: string;
  description: string;
  assigneeId: string;
}

interface AddTicketFormProps {
  onSubmit: (data: CreateTicketRequest) => Promise<boolean>;
  onCancel: () => void;
  isSubmitting: boolean;
}

const AddTicketForm: React.FC<AddTicketFormProps> = ({
  onSubmit,
  onCancel,
  isSubmitting
}) => {
  const users = [
    {
      id: 'usr-001-abc',
      name: 'John Developer',
      avatar: 'https://placehold.co/150/4287f5/ffffff?text=JD',
    },
    {
      id: 'usr-002-xyz',
      name: 'Sarah Manager',
      avatar: 'https://placehold.co/150/f542a7/ffffff?text=SM',
    }
  ];

  const [formData, setFormData] = useState<CreateTicketRequest>({
    title: '',
    description: '',
    assigneeId: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleTextChange = (
    e: React.ChangeEvent<HTMLInputElement | { name?: string; value: unknown }>
  ) => {
    const { name, value } = e.target;
    if (name) {
      setFormData(prev => ({ ...prev, [name]: value }));
       
      if (errors[name]) {
        setErrors(prev => {
          const updated = { ...prev };
          delete updated[name];
          return updated;
        });
      }
    }
  };

  const handleSelectChange = (
    e: SelectChangeEvent<string>
  ) => {
    const { name, value } = e.target;
    if (name) {
      setFormData(prev => ({ ...prev, [name]: value }));
       
      if (errors[name]) {
        setErrors(prev => {
          const updated = { ...prev };
          delete updated[name];
          return updated;
        });
      }
    }
  };

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.title.trim()) {
      newErrors['title'] = 'Title is required';
    }
    
    if (!formData.description.trim()) {
      newErrors['description'] = 'Description is required';
    }

    if (!formData.assigneeId) {
      newErrors['assigneeId'] = 'Assignee is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validate()) {
      return;
    }

    const result = await onSubmit(formData);
    if (result) { 
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
      <Stack spacing={3}>
        <TextField
          label="Title"
          name="title"
          value={formData.title}
          onChange={handleTextChange}
          fullWidth
          required
          error={!!errors['title']}
          helperText={errors['title']}
          placeholder="Enter ticket title"
          disabled={isSubmitting}
        />
        
        <TextField
          label="Description"
          name="description"
          value={formData.description}
          onChange={handleTextChange}
          fullWidth
          required
          multiline
          rows={4}
          error={!!errors['description']}
          helperText={errors['description']}
          placeholder="Enter detailed description"
          disabled={isSubmitting}
        />
        
        <FormControl fullWidth error={!!errors['assigneeId']}>
          <InputLabel id="assignee-label">Assignee</InputLabel>
          <Select
            labelId="assignee-label"
            name="assigneeId"
            value={formData.assigneeId}
            onChange={handleSelectChange}
            label="Assignee"
            disabled={isSubmitting}
            renderValue={(selected) => {
              const selectedUser = users.find(user => user.id === selected);
              if (!selectedUser) return "Select assignee";
              
              return (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Avatar src={selectedUser.avatar} alt={selectedUser.name} sx={{ width: 24, height: 24 }} />
                  <Typography>{selectedUser.name}</Typography>
                </Box>
              );
            }}
          >
            {users.map(user => (
              <MenuItem key={user.id} value={user.id}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Avatar src={user.avatar} alt={user.name} />
                  <Typography>{user.name}</Typography>
                </Box>
              </MenuItem>
            ))}
          </Select>
          {errors['assigneeId'] && <Typography color="error" variant="caption">{errors['assigneeId']}</Typography>}
        </FormControl>
        
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mt: 2 }}>
          <Button 
            onClick={onCancel} 
            variant="outlined" 
            disabled={isSubmitting}
          >
            Cancel
          </Button>
          <Button 
            type="submit" 
            variant="contained" 
            disabled={isSubmitting}
            startIcon={isSubmitting ? <CircularProgress size={20} /> : null}
          >
            {isSubmitting ? 'Creating...' : 'Create Ticket'}
          </Button>
        </Box>
      </Stack>
    </Box>
  );
};

export default AddTicketForm; 
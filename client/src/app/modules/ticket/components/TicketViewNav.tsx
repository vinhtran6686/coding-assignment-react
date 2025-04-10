import React from 'react';
import { Box, Tabs, Tab, Paper } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import ViewKanbanIcon from '@mui/icons-material/ViewKanban';
import ViewColumnIcon from '@mui/icons-material/ViewColumn';

const TicketViewNav: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Determine which tab is active based on the URL
  const isKanbanView = location.pathname.includes('/ticket/kanban');
  const activeTab = isKanbanView ? 1 : 0;

  const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
    if (newValue === 1) {
      navigate('/ticket/kanban');
    } else {
      navigate('/ticket');
    }
  };

  return (
    <Paper sx={{ mb: 3 }}>
      <Tabs 
        value={activeTab} 
        onChange={handleTabChange}
        variant="fullWidth"
        indicatorColor="primary"
        textColor="primary"
      >
        <Tab 
          icon={<ViewColumnIcon />} 
          label="Standard View" 
          iconPosition="start"
          sx={{ 
            minHeight: 56,
            textTransform: 'none',
            fontWeight: 500
          }}
        />
        <Tab 
          icon={<ViewKanbanIcon />} 
          label="Kanban Board" 
          iconPosition="start"
          sx={{ 
            minHeight: 56,
            textTransform: 'none',
            fontWeight: 500
          }}
        />
      </Tabs>
    </Paper>
  );
};

export default TicketViewNav; 
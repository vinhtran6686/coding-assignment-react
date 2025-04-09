import React from 'react';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  height: '100%',
}));

const RecentActivity: React.FC = () => {
  return (
    <StyledPaper>
      <Typography variant="h6" gutterBottom>
        Recent Activity
      </Typography>
      <Typography variant="body1">
        This is the dashboard main content. It would typically contain charts, tables, and other visualizations.
      </Typography>
    </StyledPaper>
  );
};

export default RecentActivity; 
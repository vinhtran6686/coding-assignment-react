import React, { useState, useEffect } from 'react';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import DashboardSummary from '../components/DashboardSummary';
import RecentActivity from '../components/RecentActivity';

// Mock data - would be replaced with actual API calls
const mockDashboardData = {
  users: 1234,
  revenue: 12345,
  orders: 567
};

const DashboardScreen: React.FC = () => {
  const [summaryData, setSummaryData] = useState(mockDashboardData);
  const [loading, setLoading] = useState(false);

  // Simulating data fetching
  useEffect(() => {
    // In a real application, we would fetch data from an API here
    setLoading(true);
    
    // Simulating API call with timeout
    const timer = setTimeout(() => {
      setSummaryData(mockDashboardData);
      setLoading(false);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <Container maxWidth="lg">
      <Box sx={{ py: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Dashboard
        </Typography>
        
        {/* Summary Cards */}
        <Box sx={{ mt: 3, mb: 4 }}>
          <DashboardSummary summaryData={summaryData} />
        </Box>
        
        {/* Main Content */}
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <RecentActivity />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default DashboardScreen; 
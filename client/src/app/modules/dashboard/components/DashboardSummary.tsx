import React from 'react';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';

interface SummaryCardProps {
  title: string;
  value: string | number;
  subtitle: string;
}

const DashboardCard = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
}));

const SummaryCard: React.FC<SummaryCardProps> = ({ title, value, subtitle }) => (
  <DashboardCard>
    <CardHeader title={title} />
    <CardContent>
      <Typography variant="h3" component="div">
        {value}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        {subtitle}
      </Typography>
    </CardContent>
  </DashboardCard>
);

interface DashboardSummaryProps {
  summaryData: {
    users: number;
    revenue: number;
    orders: number;
  };
}

const DashboardSummary: React.FC<DashboardSummaryProps> = ({ summaryData }) => {
  const { users, revenue, orders } = summaryData;
  
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={4}>
        <SummaryCard 
          title="Users" 
          value={users.toLocaleString()} 
          subtitle="Total users" 
        />
      </Grid>
      
      <Grid item xs={12} md={4}>
        <SummaryCard 
          title="Revenue" 
          value={`$${revenue.toLocaleString()}`} 
          subtitle="Total revenue" 
        />
      </Grid>
      
      <Grid item xs={12} md={4}>
        <SummaryCard 
          title="Orders" 
          value={orders.toLocaleString()} 
          subtitle="Total orders" 
        />
      </Grid>
    </Grid>
  );
};

export default DashboardSummary; 
import { FC } from 'react';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import { styled } from '@mui/material/styles';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  height: '100%',
}));

const DashboardCard = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
}));

const DashboardPage: FC = () => {
  return (
    <Container maxWidth="lg">
      <Box sx={{ py: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Dashboard
        </Typography>
        
        <Grid container spacing={3} sx={{ mt: 1 }}>
          {/* Summary Cards */}
          <Grid item xs={12} md={4}>
            <DashboardCard>
              <CardHeader title="Users" />
              <CardContent>
                <Typography variant="h3" component="div">
                  1,234
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Total users
                </Typography>
              </CardContent>
            </DashboardCard>
          </Grid>
          
          <Grid item xs={12} md={4}>
            <DashboardCard>
              <CardHeader title="Revenue" />
              <CardContent>
                <Typography variant="h3" component="div">
                  $12,345
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Total revenue
                </Typography>
              </CardContent>
            </DashboardCard>
          </Grid>
          
          <Grid item xs={12} md={4}>
            <DashboardCard>
              <CardHeader title="Orders" />
              <CardContent>
                <Typography variant="h3" component="div">
                  567
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Total orders
                </Typography>
              </CardContent>
            </DashboardCard>
          </Grid>
          
          {/* Main Content */}
          <Grid item xs={12}>
            <StyledPaper>
              <Typography variant="h6" gutterBottom>
                Recent Activity
              </Typography>
              <Typography variant="body1">
                This is the dashboard main content. It would typically contain charts, tables, and other visualizations.
              </Typography>
            </StyledPaper>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default DashboardPage; 
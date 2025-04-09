import React, { useEffect, useState } from 'react';
import { 
  Container, 
  Box, 
  Button, 
  Typography, 
  Breadcrumbs, 
  Paper,
  Link as MuiLink
} from '@mui/material';
import { Link, useParams, useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import TicketDetail from '../components/TicketDetail';
import { useTickets } from '../hooks/useTickets';
import { Ticket } from '../services/ticketService';

const TicketDetailScreen: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { fetchTicket } = useTickets();
  const [ticket, setTicket] = useState<Ticket | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadTicket = async () => {
      if (!id) {
        setError('Ticket ID is missing');
        setLoading(false);
        return;
      }

      try {
        const ticketId = parseInt(id, 10);
        if (isNaN(ticketId)) {
          setError('Invalid Ticket ID');
          setLoading(false);
          return;
        }

        const fetchedTicket = await fetchTicket(ticketId);
        setTicket(fetchedTicket);
      } catch (err) {
        setError('Failed to load ticket details');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadTicket();
  }, [id, fetchTicket]);

  return (
    <Container maxWidth="lg">
      <Paper sx={{ p: 3, mb: 4 }}>
        <Box sx={{ mb: 3 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Box>
              <Typography variant="h4" component="h1" gutterBottom>
                Ticket Details
              </Typography>
              <Breadcrumbs aria-label="breadcrumb">
                <MuiLink component={Link} to="/dashboard" underline="hover" color="inherit">
                  Dashboard
                </MuiLink>
                <MuiLink component={Link} to="/crafted/pages/ticket" underline="hover" color="inherit">
                  Tickets
                </MuiLink>
                <Typography color="text.primary">Details</Typography>
              </Breadcrumbs>
            </Box>
            <Button
              variant="outlined"
              startIcon={<ArrowBackIcon />}
              component={Link}
              to="/crafted/pages/ticket"
            >
              Back to List
            </Button>
          </Box>
        </Box>
        
        <TicketDetail ticket={ticket} loading={loading} error={error} />
      </Paper>
    </Container>
  );
};

export default TicketDetailScreen; 
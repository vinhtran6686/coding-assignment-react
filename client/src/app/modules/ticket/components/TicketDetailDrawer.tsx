import React from 'react';
import {
    Drawer,
    Box,
    Typography,
    IconButton,
    Divider,
    Chip,
    styled,
    Paper,
    Avatar
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { Ticket } from '../types';
import { statusColors, priorityColors } from '../constants';

const DrawerHeader = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: theme.spacing(2),
    paddingRight: theme.spacing(1),
}));

const DrawerContent = styled(Box)(({ theme }) => ({
    padding: theme.spacing(2),
}));

const Section = styled(Box)(({ theme }) => ({
    marginBottom: theme.spacing(3),
}));

const SectionTitle = styled(Typography)(({ theme }) => ({
    fontSize: '0.875rem',
    fontWeight: 600,
    color: theme.palette.text.secondary,
    marginBottom: theme.spacing(1),
}));

const InfoItem = styled(Box)(({ theme }) => ({
    display: 'flex',
    marginBottom: theme.spacing(2),
    "&:last-child": {
        marginBottom: 0
    }
}));

const InfoLabel = styled(Typography)(({ theme }) => ({
    width: '120px',
    fontSize: '0.875rem',
    color: theme.palette.text.secondary,
    flexShrink: 0,
}));

const InfoValue = styled(Typography)(({ theme }) => ({
    fontSize: '0.875rem',
    color: theme.palette.text.primary,
    flexGrow: 1,
}));

const DescriptionPaper = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(2),
    backgroundColor: theme.palette.background.default,
    borderRadius: theme.shape.borderRadius,
}));

const AssigneeItem = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(1),
    marginTop: theme.spacing(1),
}));

interface TicketDetailDrawerProps {
    open: boolean;
    ticket: Ticket | null;
    onClose: () => void;
}

const TicketDetailDrawer: React.FC<TicketDetailDrawerProps> = ({ open, ticket, onClose }) => {
    if (!ticket) return null;

    return (
        <Drawer
            anchor="right"
            open={open}
            onClose={onClose}
            PaperProps={{
                sx: { width: { xs: '100%', sm: '450px' } }
            }}
        >
            <DrawerHeader>
                <Typography variant="h6" noWrap>
                    Ticket Details
                </Typography>
                <IconButton onClick={onClose} size="small">
                    <CloseIcon />
                </IconButton>
            </DrawerHeader>

            <Divider />

            <DrawerContent>
                <Section>
                    <Typography variant="h5" gutterBottom>
                        {ticket.title}
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 1, mt: 1 }}>
                        <Chip
                            size="small"
                            label={ticket.status}
                            sx={{
                                backgroundColor: statusColors[ticket.status],
                                color: 'white',
                            }}
                        />
                        <Chip
                            size="small"
                            label={ticket.priority}
                            sx={{
                                backgroundColor: priorityColors[ticket.priority],
                                color: 'white',
                            }}
                        />
                    </Box>
                </Section>

                <Section>
                    <SectionTitle>Details</SectionTitle>
                    <InfoItem>
                        <InfoLabel>ID:</InfoLabel>
                        <InfoValue>{ticket.id}</InfoValue>
                    </InfoItem>
                    <InfoItem>
                        <InfoLabel>Created:</InfoLabel>
                        <InfoValue>{new Date(ticket.createdAt).toLocaleString()}</InfoValue>
                    </InfoItem>
                    {ticket.dueDate && (
                        <InfoItem>
                            <InfoLabel>Due Date:</InfoLabel>
                            <InfoValue>{new Date(ticket.dueDate).toLocaleDateString()}</InfoValue>
                        </InfoItem>
                    )}
                </Section>

                <Section>
                    <SectionTitle>Description</SectionTitle>
                    <DescriptionPaper elevation={0}>
                        <Typography variant="body2">
                            {ticket.description || 'No description provided.'}
                        </Typography>
                    </DescriptionPaper>
                </Section>

                <Section>
                    <SectionTitle>People</SectionTitle>
                    <InfoItem>
                        <InfoLabel>Assignee:</InfoLabel>
                        {ticket.assignee ? (
                            <AssigneeItem>
                                <Avatar
                                    src={ticket.assignee}
                                    alt={ticket.assignee}
                                    sx={{ width: 24, height: 24 }}
                                />
                                <InfoValue>{ticket.assignee}</InfoValue>
                            </AssigneeItem>
                        ) : (
                            <InfoValue>Unassigned</InfoValue>
                        )}
                    </InfoItem>
                </Section>
            </DrawerContent>
        </Drawer>
    );
};

export default TicketDetailDrawer; 
import React, { useState, useEffect } from 'react';
import {
    Drawer,
    Box,
    Typography,
    IconButton,
    Divider,
    Chip,
    styled,
    Paper,
    Avatar,
    TextField,
    MenuItem,
    Select,
    FormControl,
    InputLabel,
    Button,
    CircularProgress,
    FormHelperText,
    Stack
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import SaveIcon from '@mui/icons-material/Save';
import EditIcon from '@mui/icons-material/Edit';
import { Ticket, TicketStatus as TicketStatusType, TicketPriority as TicketPriorityType } from '../types';
import { statusColors, priorityColors, TicketStatus, TicketPriority } from '../constants';

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

const FormField = styled(Box)(({ theme }) => ({
    marginBottom: theme.spacing(2),
}));

interface UpdateTicketData {
    title: string;
    description: string;
    status: TicketStatusType;
    priority: TicketPriorityType;
}

interface TicketDetailDrawerProps {
    open: boolean;
    ticket: Ticket | null;
    onClose: () => void;
    isEditMode?: boolean;
    onSave?: (ticketId: string, data: UpdateTicketData) => Promise<boolean>;
}

const TicketDetailDrawer: React.FC<TicketDetailDrawerProps> = ({
    open,
    ticket,
    onClose,
    isEditMode = false,
    onSave
}) => {
    const [editMode, setEditMode] = useState(isEditMode);
    const [isSaving, setIsSaving] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Form state
    const [formData, setFormData] = useState<UpdateTicketData>({
        title: '',
        description: '',
        status: TicketStatus.OPEN,
        priority: TicketPriority.MEDIUM
    });

    // Reset form data when ticket changes
    useEffect(() => {
        if (ticket) {
            setFormData({
                title: ticket.title,
                description: ticket.description || '',
                status: ticket.status,
                priority: ticket.priority
            });
        }
    }, [ticket]);

    // Reset edit mode when drawer opens/closes
    useEffect(() => {
        setEditMode(isEditMode);
    }, [isEditMode, open]);

    if (!ticket) return null;

    const handleToggleEditMode = () => {
        setEditMode(prev => !prev);
        // Reset form data when entering edit mode
        if (!editMode) {
            setFormData({
                title: ticket.title,
                description: ticket.description || '',
                status: ticket.status,
                priority: ticket.priority
            });
            setError(null);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | { name?: string; value: unknown }>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name as string]: value
        }));
    };

    const handleSave = async () => {
        if (!onSave || !ticket) return;
        
        // Validate form
        if (!formData.title.trim()) {
            setError('Title is required');
            return;
        }
        
        setIsSaving(true);
        setError(null);
        
        try {
            const success = await onSave(ticket.id, formData);
            if (success) {
                // Show success message
                setError(null);
                // Show success indicator but don't close drawer immediately
                // Let the parent component handle drawer closing after a delay
            } else {
                setError('Failed to update ticket');
            }
        } catch (err) {
            setError('An error occurred while saving the ticket');
            console.error(err);
        } finally {
            setIsSaving(false);
        }
    };

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
                    {editMode ? 'Edit Ticket' : 'Ticket Details'}
                </Typography>
                <Box sx={{ display: 'flex', gap: 1 }}>
                    {!editMode && onSave && (
                        <IconButton onClick={handleToggleEditMode} size="small" color="primary">
                            <EditIcon />
                        </IconButton>
                    )}
                    {editMode && (
                        <Button
                            variant="contained"
                            size="small"
                            startIcon={isSaving ? <CircularProgress size={16} /> : <SaveIcon />}
                            onClick={handleSave}
                            disabled={isSaving}
                        >
                            Save
                        </Button>
                    )}
                    <IconButton onClick={onClose} size="small">
                        <CloseIcon />
                    </IconButton>
                </Box>
            </DrawerHeader>

            <Divider />

            <DrawerContent>
                {error && (
                    <Box sx={{ mb: 2 }}>
                        <FormHelperText error>{error}</FormHelperText>
                    </Box>
                )}

                {editMode ? (
                    // Edit Mode Content
                    <>
                        <Section>
                            <FormField>
                                <TextField
                                    name="title"
                                    label="Title"
                                    fullWidth
                                    value={formData.title}
                                    onChange={handleInputChange}
                                    required
                                    error={!formData.title.trim()}
                                    helperText={!formData.title.trim() ? 'Title is required' : ''}
                                />
                            </FormField>

                            <Stack direction="row" spacing={2} sx={{ mb: 2 }}>
                                <FormControl fullWidth size="small">
                                    <InputLabel id="status-label">Status</InputLabel>
                                    <Select
                                        labelId="status-label"
                                        name="status"
                                        value={formData.status}
                                        onChange={(e) => handleInputChange(e as React.ChangeEvent<HTMLInputElement | { name?: string; value: unknown }>)}
                                        label="Status"
                                    >
                                        <MenuItem value={TicketStatus.OPEN}>Open</MenuItem>
                                        <MenuItem value={TicketStatus.IN_PROGRESS}>In Progress</MenuItem>
                                        <MenuItem value={TicketStatus.TESTING}>Testing</MenuItem>
                                        <MenuItem value={TicketStatus.COMPLETED}>Completed</MenuItem>
                                    </Select>
                                </FormControl>

                                <FormControl fullWidth size="small">
                                    <InputLabel id="priority-label">Priority</InputLabel>
                                    <Select
                                        labelId="priority-label"
                                        name="priority"
                                        value={formData.priority}
                                        onChange={(e) => handleInputChange(e as React.ChangeEvent<HTMLInputElement | { name?: string; value: unknown }>)}
                                        label="Priority"
                                    >
                                        <MenuItem value={TicketPriority.HIGH}>High</MenuItem>
                                        <MenuItem value={TicketPriority.MEDIUM}>Medium</MenuItem>
                                        <MenuItem value={TicketPriority.LOW}>Low</MenuItem>
                                    </Select>
                                </FormControl>
                            </Stack>
                        </Section>

                        <Section>
                            <SectionTitle>Description</SectionTitle>
                            <TextField
                                name="description"
                                multiline
                                rows={4}
                                fullWidth
                                placeholder="Enter ticket description"
                                value={formData.description}
                                onChange={handleInputChange}
                            />
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
                            <InfoItem>
                                <InfoLabel>Assignee:</InfoLabel>
                                {ticket.assignee ? (
                                    <AssigneeItem>
                                        <Avatar
                                            src={ticket.assigneeAvatar}
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
                    </>
                ) : (
                    // View Mode Content
                    <>
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
                            <SectionTitle>Assignee:</SectionTitle>
                            <InfoItem>
                                {ticket.assignee ? (
                                    <AssigneeItem>
                                        <Avatar
                                            src={ticket.assigneeAvatar}
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
                    </>
                )}
            </DrawerContent>
        </Drawer>
    );
};

export default TicketDetailDrawer; 
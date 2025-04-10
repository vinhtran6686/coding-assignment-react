import React from 'react';
import { Box, Typography, Paper, styled, Chip, IconButton, Tooltip } from '@mui/material';
import { useDraggable } from '@dnd-kit/core';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import { Ticket } from '../types';
import { priorityColors, statusColors } from '../constants';
import { formatDate } from '../../../utils/dateUtils';

const TicketContainer = styled(Paper)(({ theme }) => ({
  width: '100%',
  padding: theme.spacing(1.5),
  borderRadius: theme.shape.borderRadius,
  backgroundColor: theme.palette.background.paper,
  boxShadow: `0px 1px 3px 0px rgba(0,0,0,0.08)`,
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(1),
  cursor: 'pointer',
  transition: theme.transitions.create(['box-shadow', 'transform'], {
    duration: theme.transitions.duration.shortest,
  }),
  '&:hover': {
    boxShadow: theme.shadows[2],
    transform: 'translateY(-2px)',
  },
}));

const TicketHeader = styled(Box)({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'flex-start',
  width: '100%',
});

const TicketTitle = styled(Typography)({
  fontWeight: 600,
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  display: '-webkit-box',
  WebkitLineClamp: 2,
  WebkitBoxOrient: 'vertical',
});

const TicketMeta = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  width: '100%',
  marginTop: theme.spacing(0.5),
}));

const TicketInfo = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing(1),
  alignItems: 'center',
  color: theme.palette.text.secondary,
  fontSize: '0.75rem',
}));

const DragHandle = styled(IconButton)(({ theme }) => ({
  padding: theme.spacing(0.5),
  marginLeft: theme.spacing(-0.5),
  marginTop: theme.spacing(-0.5),
  color: theme.palette.text.disabled,
  cursor: 'grab',
  '&:active': {
    cursor: 'grabbing',
  },
}));

interface TicketItemProps {
  ticket: Ticket;
  onClick: () => void;
}

const TicketItem: React.FC<TicketItemProps> = ({ ticket, onClick }) => {
  const { id, title, priority, status, dueDate } = ticket;

  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: id,
    data: {
      ticket,
    },
  });

  const style = transform ? {
    transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
    zIndex: isDragging ? 1 : undefined,
    opacity: isDragging ? 0.5 : undefined,
    position: isDragging ? 'relative' : undefined,
  } as React.CSSProperties : undefined;

  return (
    <TicketContainer 
      ref={setNodeRef} 
      style={style} 
      elevation={0}
      onClick={(e) => {
        if (e.target !== e.currentTarget) return;
        onClick();
      }}
    >
      <TicketHeader>
        <Box sx={{ display: 'flex', alignItems: 'flex-start', flex: 1 }}>
          <DragHandle {...listeners} {...attributes} size="small">
            <DragIndicatorIcon fontSize="small" />
          </DragHandle>
          <TicketTitle variant="body2">
            {title}
          </TicketTitle>
        </Box>
        <Tooltip title={`Priority: ${priority}`}>
          <PriorityHighIcon 
            fontSize="small" 
            sx={{ 
              color: priorityColors[priority] || 'text.disabled',
              ml: 1,
              flexShrink: 0,
            }} 
          />
        </Tooltip>
      </TicketHeader>
      
      <TicketMeta>
        <TicketInfo>
          <Chip
            label={status}
            size="small"
            variant="outlined"
            icon={<FiberManualRecordIcon fontSize="small" />}
            sx={{
              height: 20,
              '& .MuiChip-label': { 
                px: 1,
                fontSize: '0.625rem',
              },
              '& .MuiChip-icon': {
                ml: 0.5,
                mr: -0.5,
                fontSize: '0.75rem',
                color: statusColors[status] || 'default',
              },
              borderColor: statusColors[status] || 'divider',
            }}
          />
        </TicketInfo>
        
        {dueDate && (
          <Typography variant="caption" color="text.secondary">
            Due: {formatDate(dueDate)}
          </Typography>
        )}
      </TicketMeta>
    </TicketContainer>
  );
};

export default TicketItem; 
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import TicketDetailScreen from './screens/TicketDetailScreen';
import KanbanTicketBoardScreen from './screens/KanbanTicketBoardScreen';

const TicketPage: React.FC = () => {
    return (
        <Routes>
            <Route path="/" element={<KanbanTicketBoardScreen />} />
            <Route path=":id" element={<TicketDetailScreen />} />
            {/* Redirect old kanban route to main route for backward compatibility */}
            <Route path="kanban" element={<Navigate to="/ticket" replace />} />
        </Routes>
    );
};

export default TicketPage;

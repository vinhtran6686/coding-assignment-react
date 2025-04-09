import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import TicketListScreen from './screens/TicketListScreen';
import TicketDetailScreen from './screens/TicketDetailScreen';

const TicketPage: React.FC = () => {
    return (
        <Routes>
            <Route path="/" element={<Navigate to="list" replace />} />
            <Route path="list" element={<TicketListScreen />} />
            <Route path=":id" element={<TicketDetailScreen />} />
        </Routes>
    );
};

export default TicketPage;

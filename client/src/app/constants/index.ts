// API URL configuration
export const BASE_URL = 'http://localhost:4200/api';

export const API_URL = {
    // Auth endpoints
    LOGIN: `${BASE_URL}/login`,
    REGISTER: `${BASE_URL}/register`,
    FORGOT_PASSWORD: `${BASE_URL}/forgot-password`,
    
    // User endpoints
    GET_USER: `${BASE_URL}/user`,
    UPDATE_USER: `${BASE_URL}/user/update`,
    
    // Ticket endpoints
    TICKETS: `${BASE_URL}/tickets`,
    TICKET_DETAIL: (id: number) => `${BASE_URL}/tickets/${id}`,
    TICKET_CREATE: `${BASE_URL}/tickets/create`,
    TICKET_UPDATE: (id: number) => `${BASE_URL}/tickets/${id}/update`,
    TICKET_DELETE: (id: number) => `${BASE_URL}/tickets/${id}/delete`,
}; 
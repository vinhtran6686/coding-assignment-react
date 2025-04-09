import axios from 'axios';

export interface Ticket {
  id: number;
  title: string;
  description: string;
  status: 'open' | 'in_progress' | 'resolved' | 'closed';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  created_at: string;
  updated_at: string;
  assigned_to?: string;
  created_by: string;
}

const API_URL = 'api/tickets';

// Mock data - sẽ được thay thế bằng API calls khi có backend
const mockTickets: Ticket[] = [
  {
    id: 1,
    title: 'Error when uploading files',
    description: 'Users cannot upload files larger than 2MB',
    status: 'open',
    priority: 'high',
    created_at: '2023-04-01T10:30:00',
    updated_at: '2023-04-01T10:30:00',
    created_by: 'john.doe@example.com',
    assigned_to: 'support@example.com'
  },
  {
    id: 2,
    title: 'Login issue on mobile devices',
    description: 'Users on Android devices cannot login to the application',
    status: 'in_progress',
    priority: 'urgent',
    created_at: '2023-04-02T14:20:00',
    updated_at: '2023-04-03T09:15:00',
    created_by: 'jane.smith@example.com',
    assigned_to: 'tech@example.com'
  },
  {
    id: 3,
    title: 'Dashboard displays incorrect data',
    description: 'Sales metrics on the dashboard do not match the reports',
    status: 'open',
    priority: 'medium',
    created_at: '2023-04-03T16:45:00',
    updated_at: '2023-04-03T16:45:00',
    created_by: 'manager@example.com'
  }
];

// Giả lập API calls với dữ liệu mock
export const getTickets = async (): Promise<Ticket[]> => {
  // Giả lập API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockTickets);
    }, 500);
  });
};

export const getTicketById = async (id: number): Promise<Ticket | undefined> => {
  // Giả lập API call
  return new Promise((resolve) => {
    setTimeout(() => {
      const ticket = mockTickets.find(t => t.id === id);
      resolve(ticket);
    }, 300);
  });
};

export const createTicket = async (ticketData: Omit<Ticket, 'id' | 'created_at' | 'updated_at'>): Promise<Ticket> => {
  // Giả lập API call
  return new Promise((resolve) => {
    setTimeout(() => {
      const newTicket: Ticket = {
        ...ticketData,
        id: mockTickets.length + 1,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };
      resolve(newTicket);
    }, 700);
  });
};

export const updateTicket = async (id: number, ticketData: Partial<Ticket>): Promise<Ticket | undefined> => {
  // Giả lập API call
  return new Promise((resolve) => {
    setTimeout(() => {
      const ticketIndex = mockTickets.findIndex(t => t.id === id);
      if (ticketIndex !== -1) {
        const updatedTicket: Ticket = {
          ...mockTickets[ticketIndex],
          ...ticketData,
          updated_at: new Date().toISOString()
        };
        resolve(updatedTicket);
      } else {
        resolve(undefined);
      }
    }, 500);
  });
};

export const deleteTicket = async (id: number): Promise<boolean> => {
  // Giả lập API call
  return new Promise((resolve) => {
    setTimeout(() => {
      const ticketIndex = mockTickets.findIndex(t => t.id === id);
      if (ticketIndex !== -1) {
        resolve(true);
      } else {
        resolve(false);
      }
    }, 400);
  });
}; 
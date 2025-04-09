import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';

export enum TicketStatus {
  BACKLOG = 'Backlog',
  OPEN = 'Open',
  IN_PROGRESS = 'In Progress',
  TESTING = 'Testing',
  COMPLETED = 'Completed'
}

export type Ticket = {
  id: string;
  key: string;
  title: string;
  description: string;
  assigneeId: null | string;
  status: TicketStatus;
  createdAt: string;
  updatedAt: string;
};

@Injectable()
export class TicketsService {
  private storedTickets: Ticket[] = [
    {
      id: 't-1001-abcd',
      key: 'TMS-101',
      title: 'Add user authentication',
      description: 'Implement user authentication using JWT',
      assigneeId: 'usr-001-abc',
      status: TicketStatus.BACKLOG,
      createdAt: new Date('2023-07-01').toISOString(),
      updatedAt: new Date('2023-07-01').toISOString()
    },
    {
      id: 't-1002-efgh',
      key: 'TMS-102',
      title: 'Implement dashboard analytics',
      description: 'Create analytics charts for the dashboard page',
      assigneeId: 'usr-002-xyz',
      status: TicketStatus.OPEN,
      createdAt: new Date('2023-07-02').toISOString(),
      updatedAt: new Date('2023-07-02').toISOString()
    },
    {
      id: 't-1003-ijkl',
      key: 'TMS-103',
      title: 'Fix login page responsive issues',
      description: 'The login page layout breaks on mobile devices',
      assigneeId: 'usr-001-abc',
      status: TicketStatus.IN_PROGRESS,
      createdAt: new Date('2023-07-03').toISOString(),
      updatedAt: new Date('2023-07-03').toISOString()
    },
    {
      id: 't-1004-mnop',
      key: 'TMS-104',
      title: 'Optimize image loading performance',
      description: 'Implement lazy loading for images to improve page load time',
      assigneeId: 'usr-002-xyz',
      status: TicketStatus.TESTING,
      createdAt: new Date('2023-07-04').toISOString(),
      updatedAt: new Date('2023-07-04').toISOString()
    },
    {
      id: 't-1005-qrst',
      key: 'TMS-105',
      title: 'Update API documentation',
      description: 'Add new endpoints to the API documentation',
      assigneeId: 'usr-001-abc',
      status: TicketStatus.COMPLETED,
      createdAt: new Date('2023-07-05').toISOString(),
      updatedAt: new Date('2023-07-05').toISOString()
    },
    {
      id: 't-1006-uvwx',
      key: 'TMS-106',
      title: 'Fix security vulnerability in login',
      description: 'Address the CSRF vulnerability in the login form',
      assigneeId: null,
      status: TicketStatus.BACKLOG,
      createdAt: new Date('2023-07-06').toISOString(),
      updatedAt: new Date('2023-07-06').toISOString()
    }
  ];

  constructor(private usersService: UsersService) {}

  async tickets(filters?: { status?: TicketStatus, search?: string }): Promise<Ticket[]> {
    let result = [...this.storedTickets];
    
    if (filters?.status) {
      result = result.filter(ticket => ticket.status === filters.status);
    }
    
    if (filters?.search) {
      const searchLower = filters.search.toLowerCase();
      result = result.filter(ticket => 
        ticket.title.toLowerCase().includes(searchLower) || 
        ticket.description.toLowerCase().includes(searchLower) ||
        ticket.key.toLowerCase().includes(searchLower)
      );
    }
    
    return result;
  }

  async ticket(id: string): Promise<Ticket | null> {
    return this.storedTickets.find((t) => t.id === id) ?? null;
  }

  async updateStatus(ticketId: string, status: TicketStatus): Promise<boolean> {
    const ticket = await this.ticket(ticketId);
    if (ticket) {
      ticket.status = status;
      ticket.updatedAt = new Date().toISOString();
      return true;
    }
    return false;
  }

  async updateAssignee(ticketId: string, userId: string | null): Promise<boolean> {
    const ticket = await this.ticket(ticketId);
    
    if (ticket) {
      if (userId === null) {
        ticket.assigneeId = null;
        ticket.updatedAt = new Date().toISOString();
        return true;
      }
      
      const user = await this.usersService.user(userId);
      if (user) {
        ticket.assigneeId = userId;
        ticket.updatedAt = new Date().toISOString();
        return true;
      }
    }
    
    return false;
  }
}

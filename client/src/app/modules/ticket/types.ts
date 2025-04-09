/**
 * Ticket interface - represents a ticket entity
 */
export interface Ticket {
  id: number;
  title: string;
  description: string;
  status: TicketStatus;
  priority: TicketPriority;
  createdAt: string;
  updatedAt: string;
  assignedTo?: number;
  createdBy: number;
}

/**
 * Ticket status enum
 */
export enum TicketStatus {
  OPEN = 'open',
  IN_PROGRESS = 'in_progress',
  RESOLVED = 'resolved',
  CLOSED = 'closed'
}

/**
 * Ticket priority enum
 */
export enum TicketPriority {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
  CRITICAL = 'critical'
}

/**
 * Ticket filter options
 */
export interface TicketFilters {
  status?: TicketStatus;
  priority?: TicketPriority;
  searchQuery?: string;
  assignedTo?: number;
}

/**
 * New ticket request body
 */
export interface CreateTicketRequest {
  title: string;
  description: string;
  priority: TicketPriority;
  assignedTo?: number;
}

/**
 * Update ticket request body
 */
export interface UpdateTicketRequest {
  title?: string;
  description?: string;
  status?: TicketStatus;
  priority?: TicketPriority;
  assignedTo?: number;
} 
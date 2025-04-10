/**
 * Ticket interface - represents a ticket entity
 */
export interface Ticket {
  id: string;
  key?: string;
  title: string;
  description: string;
  status: TicketStatus;
  priority: TicketPriority;
  assignee?: string;
  assigneeId?: string;
  assigneeAvatar?: string;
  dueDate?: string;
  createdAt: string;
  updatedAt: string;
}

/**
 * Ticket status enum
 */
export type TicketStatus = 'open' | 'in progress' | 'testing' | 'completed';

/**
 * Ticket priority enum
 */
export type TicketPriority = 'high' | 'medium' | 'low';

/**
 * Ticket filter options
 */
export interface TicketFilters {
  status?: TicketStatus;
  priority?: TicketPriority;
  searchQuery?: string;
  assignedTo?: string;
}

/**
 * New ticket request body
 */
export interface CreateTicketRequest {
  title: string;
  description: string;
  assigneeId: string;
}

/**
 * Update ticket request body
 */
export interface UpdateTicketRequest {
  title?: string;
  description?: string;
  status?: TicketStatus;
  priority?: TicketPriority;
  assignedTo?: string;
}

/**
 * Update ticket status request
 */
export interface UpdateTicketStatusRequest {
  status: TicketStatus;
}

export interface TicketColumn {
  id: TicketStatus;
  title: string;
  tickets: Ticket[];
}

export interface DragEndEvent {
  active: { id: string };
  over?: { id: string | null };
} 
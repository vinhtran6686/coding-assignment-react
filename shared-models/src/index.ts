export type User = {
  id: string;
  name: string;
  email: string;
  avatar: string;
  api_token?: string;
};

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

export interface TicketType {
  id: string;
  title: string;
  description: string;
  status: string;
  createdBy: string;
  assignedUser: string;
  createdAt: string;
  updatedAt: string;
}

export interface UserType {
  id: string;
  username: string;
  role: string;
  createdAt: string;
  updatedAt: string;
}

export interface EventType {
  user: string;
  timestamp: string;
  description: string;
}

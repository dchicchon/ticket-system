export interface TicketType {
  id: string;
  title: string;
  description: string;
  status: string;
  createdBy: string;
  assignedUser: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserType {
  id: string;
  username: string;
  role: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface EventType {
  user: string;
  timestamp: Date;
  description: string;
}

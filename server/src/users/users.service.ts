import { Injectable } from '@nestjs/common';

export type User = {
  id: string;
  name: string;
  email: string;
  avatar: string;
};

@Injectable()
export class UsersService {
  /*
   * In-memory storage so data is lost on server restart.
   */
  private storedUsers: User[] = [
    { 
      id: 'usr-001-abc',
      name: 'John Developer', 
      email: 'john@example.com', 
      avatar: 'https://placehold.co/150/4287f5/ffffff?text=JD' // Màu xanh
    },
    { 
      id: 'usr-002-xyz', 
      name: 'Sarah Manager', 
      email: 'sarah@example.com', 
      avatar: 'https://placehold.co/150/f542a7/ffffff?text=SM' // Màu hồng
    }
  ];

  async users(): Promise<User[]> {
    return this.storedUsers;
  }

  async user(id: string): Promise<User | null> {
    return this.storedUsers.find((user) => user.id === id) ?? null;
  }
}

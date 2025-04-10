import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  private readonly users = [
    {
      id: 'usr-001-abc',
      name: 'John Developer',
      email: 'john@example.com',
      password: '123456',
      avatar: 'https://placehold.co/150/4287f5/ffffff?text=JD',
      api_token: 'token-john-developer-2023'
    },
    {
      id: 'usr-002-xyz',
      name: 'Sarah Manager',
      email: 'sarah@example.com',
      password: '123456',
      avatar: 'https://placehold.co/150/f542a7/ffffff?text=SM',
      api_token: 'token-sarah-manager-2023'
    }
  ];

  async login(email: string, password: string) {
    // Tìm user theo email và password
    const user = this.users.find(
      (u) => u.email === email && u.password === password
    );
    
    if (user) {
      // Trả về thông tin user (không bao gồm password)
      const { password, ...userWithoutPassword } = user;
      return userWithoutPassword;
    }
    
    return null;
  }

  async verifyToken(token: string) {
    // Tìm user theo token
    const user = this.users.find((u) => u.api_token === token);
    
    if (user) {
      // Trả về thông tin user (không bao gồm password)
      const { password, ...userWithoutPassword } = user;
      return userWithoutPassword;
    }
    
    return null;
  }
} 
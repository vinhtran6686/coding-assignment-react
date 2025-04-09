import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  private readonly userData = {
    id: 2,
    first_name: "Alvena",
    last_name: "Ward",
    email: "admin@demo.com",
    email_verified_at: "2023-07-12T13:39:05.000000Z",
    created_at: "2023-07-12T13:39:05.000000Z",
    updated_at: "2023-07-12T13:39:05.000000Z",
    api_token: "$2y$10$qyWRyuvGf4t9hAOndcV.vu.9ro6LFObwA5ovBoUtmB2ja4i9ipKAW"
  };

  async login(email: string, password: string) {
    // Hardcoded check for the demo credentials
    if (email === 'admin@demo.com' && password === 'demo') {
      return this.userData;
    }
    return null;
  }

  async verifyToken(token: string) {
    // Hardcoded token check
    if (token === this.userData.api_token) {
      return this.userData;
    }
    return null;
  }
} 
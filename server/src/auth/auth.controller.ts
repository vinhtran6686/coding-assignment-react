import { Controller, Post, Body, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('/')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Body() body: { email: string; password: string }) {
    const user = await this.authService.login(body.email, body.password);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return user;
  }

  @Post('verify-token')
  async verifyToken(@Body() body: { api_token: string }) {
    const user = await this.authService.verifyToken(body.api_token);
    if (!user) {
      throw new UnauthorizedException('Invalid token');
    }
    return user;
  }
} 
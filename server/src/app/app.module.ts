import { Module } from '@nestjs/common';

import { UsersModule } from '../users/users.module';
import { TicketsModule } from '../tickets/tickets.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [UsersModule, TicketsModule, AuthModule],
})
export class AppModule {}

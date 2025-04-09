import {
  NotFoundException,
  UnprocessableEntityException,
  Controller,
  Get,
  Put,
  Post,
  Param,
  Delete,
  Body,
  HttpCode,
  Query,
} from '@nestjs/common';
import { randomDelay } from '../utils/random-delay';
import { TicketsService, TicketStatus } from './tickets.service';

@Controller('tickets')
export class TicketsController {
  constructor(private ticketsService: TicketsService) {}

  @Get()
  async getTickets(
    @Query('status') status?: TicketStatus,
    @Query('search') search?: string
  ) {
    await randomDelay();
    return this.ticketsService.tickets({ status, search });
  }

  @Get(':id')
  async getTicket(@Param('id') id: string) {
    await randomDelay();
    const ticket = await this.ticketsService.ticket(id);
    if (ticket) return ticket;
    throw new NotFoundException();
  }

  @Post()
  async createTicket(@Body() createDto: { description: string }) {
    await randomDelay();
    return this.ticketsService.newTicket(createDto);
  }

  @Put(':id/status')
  @HttpCode(204)
  async updateStatus(
    @Param('id') id: string,
    @Body() payload: { status: TicketStatus }
  ) {
    await randomDelay();
    const success = await this.ticketsService.updateStatus(
      id,
      payload.status
    );
    if (!success) throw new UnprocessableEntityException();
  }

  @Put(':id/assignee/:userId')
  @HttpCode(204)
  async assignTicket(
    @Param('id') id: string,
    @Param('userId') userId: string
  ) {
    await randomDelay();
    const success = await this.ticketsService.updateAssignee(
      id,
      userId
    );
    if (!success) throw new UnprocessableEntityException();
  }

  @Delete(':id/assignee')
  @HttpCode(204)
  async unassignTicket(@Param('id') id: string) {
    await randomDelay();
    const success = await this.ticketsService.updateAssignee(id, null);
    if (!success) throw new UnprocessableEntityException();
  }

  @Put(':id/complete')
  @HttpCode(204)
  async markAsComplete(@Param('id') ticketId: string) {
    await randomDelay();
    const success = await this.ticketsService.complete(Number(ticketId), true);
    if (!success) throw new UnprocessableEntityException();
  }

  @Delete(':id/complete')
  @HttpCode(204)
  async markAsIncomplete(@Param('id') ticketId: string) {
    await randomDelay();
    const success = await this.ticketsService.complete(Number(ticketId), false);
    if (!success) throw new UnprocessableEntityException();
  }
}

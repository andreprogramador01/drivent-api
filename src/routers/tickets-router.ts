import { Router } from 'express';
import { authenticateToken } from '@/middlewares';
import { getTypeTickets, getTickets, createTicket } from '@/controllers/tickets-controller';

const ticketsRouter = Router();
ticketsRouter.get('/', authenticateToken, getTickets);
ticketsRouter.get('/types', authenticateToken, getTypeTickets);
ticketsRouter.post('/', authenticateToken, createTicket);

export { ticketsRouter };

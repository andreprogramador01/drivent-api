import { Router } from 'express';
import { authenticateToken } from '@/middlewares';
import { getTypeTickets, getTickets } from '@/controllers/tickets-controller';

const ticketsRouter = Router();
ticketsRouter.get('/', authenticateToken, getTickets);
ticketsRouter.get('/type', authenticateToken, getTypeTickets);

export { ticketsRouter };

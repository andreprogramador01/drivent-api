import { Request, Response } from 'express';
import httpStatus from 'http-status';
import ticketsService from '@/services/tickets-service';
import { AuthenticatedRequest } from '@/middlewares';

export async function getTypeTickets(req: Request, res: Response) {
  try {
    const typeTickets = await ticketsService.getTypeTickets();

    res.status(httpStatus.OK).send(typeTickets);
  } catch (error) {
    res.status(httpStatus.UNAUTHORIZED).send({});
  }
}

export async function getTickets(req: AuthenticatedRequest, res: Response) {
  try {
    const userId = req.userId;

    const enrollment = await ticketsService.verifyEnrollment(userId);

    await ticketsService.getTicketByEnrollmentId(enrollment.id);

    const tickets = await ticketsService.getTickets();

    res.status(httpStatus.OK).send(tickets);
  } catch (error) {
    if (error.name === 'NotFoundError') {
      res.status(httpStatus.NOT_FOUND).send(error);
    }
    res.status(httpStatus.UNAUTHORIZED).send({});
  }
}

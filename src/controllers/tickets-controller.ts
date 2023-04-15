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

    res.status(httpStatus.OK).send(tickets[0]);
  } catch (error) {
    if (error.name === 'NotFoundError') {
      res.status(httpStatus.NOT_FOUND).send(error);
    }
    res.status(httpStatus.UNAUTHORIZED).send({});
  }
}

export async function createTicket(req: AuthenticatedRequest, res: Response) {
  const userId = req.userId;
  const { ticketTypeId } = req.body;
  try {
    const enrollment = await ticketsService.verifyEnrollment(userId);

    const enrollmentId = enrollment.id;

    const newTicket = await ticketsService.createNewTicket(ticketTypeId, enrollmentId);

    res.status(httpStatus.CREATED).send(newTicket);
  } catch (error) {
    if (error.name === 'BadRequest') {
      res.status(httpStatus.BAD_REQUEST).send(error);
    } else if (error.name === 'NotFoundError') {
      res.status(httpStatus.NOT_FOUND).send(error);
    }
    res.status(httpStatus.UNAUTHORIZED).send(error);
  }
}

import { Request, Response } from 'express';
import httpStatus from 'http-status';
import paymentService from '@/services/payment-service';
import { AuthenticatedRequest } from '@/middlewares';

export async function getPayment(req: AuthenticatedRequest, res: Response) {
  const userId = req.userId as number;
  const ticketId = +req.query.ticketId;

  try {
    const payment = await paymentService.getPaymentByTicket(userId, ticketId);
    res.status(httpStatus.OK).send(payment);
  } catch (error) {
    if (error.name === 'BadRequest') {
      res.status(httpStatus.BAD_REQUEST).send(error);
    } else if (error.name === 'NotFoundError') {
      res.status(httpStatus.NOT_FOUND).send(error);
    }
    console.log(error);
    res.status(httpStatus.UNAUTHORIZED).send(error);
  }
}

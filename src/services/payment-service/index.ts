import paymentRepository from '@/repositories/payment-repository';
import { unauthorizedError, notFoundError, badRequest } from '@/errors';

async function getPaymentByTicket(ticketId: number, userId: number) {
  const ticket = await paymentRepository.getTicketByUserId(userId);

  if (!ticket) {
    throw unauthorizedError();
  }
  if (ticketId === undefined) {
    throw notFoundError();
  } else if (ticketId === 0) {
    throw badRequest();
  }
  return await paymentRepository.getPaymentByTicket(ticketId);
}
const paymentService = {
  getPaymentByTicket,
};
export default paymentService;

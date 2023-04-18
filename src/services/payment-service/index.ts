import paymentRepository from '@/repositories/payment-repository';
import { unauthorizedError, notFoundError, badRequest } from '@/errors';

async function getPaymentByTicket(ticketId: number, userId: number) {
  const ticket = await paymentRepository.getTicketByUserId(userId);

  const user = await paymentRepository.getUserByTicket(ticketId);
  console.log(user);
  if (!ticket) {
    throw notFoundError();
  }
  if (!user) {
    throw unauthorizedError();
  }

  return await paymentRepository.getPaymentByTicket(ticketId);
}
const paymentService = {
  getPaymentByTicket,
};
export default paymentService;

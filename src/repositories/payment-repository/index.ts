import { prisma } from '@/config';

async function getPaymentByTicket(ticketId: number) {
  return await prisma.payment.findFirst({
    where: {
      ticketId,
    },
  });
}
async function getUserById(userId: number) {
  return await prisma.user.findFirst({
    where: {
      id: userId,
    },
  });
}
async function getUserByTicket(ticketId: number) {
  const ticket = await prisma.ticket.findFirst({
    where: { id: ticketId },
  });
  const enrollment = await prisma.enrollment.findFirst({
    where: {
      id: ticket?.enrollmentId,
    },
  });
  return await prisma.user.findFirst({
    where: {
      id: enrollment.userId,
    },
  });
}
async function getEnrollmentByUserId(userId: number) {
  return await prisma.enrollment.findFirst({
    where: {
      userId,
    },
  });
}
async function getTicketByUserId(userId: number) {
  const enrollment = await getEnrollmentByUserId(userId);
  return prisma.ticket.findFirst({
    where: {
      enrollmentId: enrollment.id,
    },
  });
}
const paymentRepository = {
  getPaymentByTicket,
  getTicketByUserId,
  getUserById,
  getEnrollmentByUserId,
  getUserByTicket,
};
export default paymentRepository;

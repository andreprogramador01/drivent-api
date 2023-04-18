import { prisma } from '@/config';

async function getPaymentByTicket(ticketId: number) {
  return await prisma.payment.findFirst({
    where: {
      ticketId,
    },
  });
}
/*async function getUserById(userId: number) {
  const user = await prisma.user.findFirst({
    where: {
      id: userId,
    },
  });
}*/
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
      enrollmentId: enrollment?.id,
    },
  });
}
const paymentRepository = {
  getPaymentByTicket,
  getTicketByUserId,
  getEnrollmentByUserId,
};
export default paymentRepository;

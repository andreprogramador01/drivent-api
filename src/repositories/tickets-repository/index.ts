import { Enrollment } from '@prisma/client';
import { prisma } from '@/config';

async function getAllTypeTickets() {
  return prisma.ticketType.findMany();
}
async function getAllTickets() {
  return prisma.ticket.findMany({
    select: {
      id: true,
      status: true,
      ticketTypeId: true,
      enrollmentId: true,
      TicketType: {
        select: {
          id: true,
          name: true,
          price: true,
          isRemote: true,
          includesHotel: true,
          createdAt: true,
          updatedAt: true,
        },
      },
      createdAt: true,
      updatedAt: true,
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
async function getTicketByEnrollmentId(enrollmentId: number) {
  return await prisma.ticket.findFirst({
    where: {
      enrollmentId,
    },
  });
}

const ticketsRepository = {
  getAllTypeTickets,
  getAllTickets,
  getEnrollmentByUserId,
  getTicketByEnrollmentId,
};

export default ticketsRepository;

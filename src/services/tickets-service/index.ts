import ticketsRepository from '@/repositories/tickets-repository';
import { notFoundError } from '@/errors';

async function getTypeTickets() {
  return await ticketsRepository.getAllTypeTickets();
}
async function getTickets() {
  return await ticketsRepository.getAllTickets();
}
async function verifyEnrollment(userId: number) {
  const enrollment = await ticketsRepository.getEnrollmentByUserId(userId);

  if (!enrollment) {
    throw notFoundError();
  }
  return enrollment;
}
async function getTicketByEnrollmentId(enrollmentId: number) {
  const ticket = await ticketsRepository.getTicketByEnrollmentId(enrollmentId);

  if (!ticket) {
    throw notFoundError();
  }
  return ticket;
}
const ticketsService = {
  getTypeTickets,
  getTickets,
  verifyEnrollment,
  getTicketByEnrollmentId,
};

export default ticketsService;

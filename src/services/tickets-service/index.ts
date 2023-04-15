import ticketsRepository from '@/repositories/tickets-repository';
import { badRequest, notFoundError } from '@/errors';

async function getTypeTickets() {
  const allTypeTickets = await ticketsRepository.getAllTypeTickets();
  return Object.keys(allTypeTickets).length === 0 ? [] : allTypeTickets;
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
async function createNewTicket(ticketTypeId: number, enrollmentId: number) {
  if (!ticketTypeId) {
    throw badRequest();
  }
  const enrollment = ticketsRepository.getEnrollment(enrollmentId);

  if (!enrollment) {
    throw notFoundError();
  }
  return await ticketsRepository.createNewTicket(ticketTypeId, enrollmentId);
}
const ticketsService = {
  getTypeTickets,
  getTickets,
  verifyEnrollment,
  getTicketByEnrollmentId,
  createNewTicket,
};

export default ticketsService;

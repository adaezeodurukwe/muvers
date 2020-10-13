import models from "../database/models";

const { Ticket, User } = models;

export default class TicketService {
  static async createTicket(userId, time, note, plan) {
    const ticket = await Ticket.create({
      userId, time, note, plan
    });
    return ticket;
  }

  static async getTickets(where) {
    const tickets = await Ticket.findAll({
      where
    });
    return tickets;
  }

  static async getAllTickets() {
    const tickets = await Ticket.findAll({
      include: [{
        model: User, as: "user"
      }]
    });
    return tickets;
  }
}

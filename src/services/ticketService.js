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

  static async updateTicket(updateObject, where) {
    const updated = await Ticket.update(updateObject, { returning: true, where });
    return updated;
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

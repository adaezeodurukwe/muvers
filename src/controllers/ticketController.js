import TicketService from "../services/ticketService";

export default class TicketController {
  static async getUserTickets(req, res) {
    try {
      const { userId } = req;
      const tickets = await TicketService.getTickets({ userId });
      return res.status(200).send({
        success: true,
        data: tickets
      });
    } catch (error) {
      return res.status(500).send({
        success: false,
        error
      });
    }
  }

  static async createTicket(req, res) {
    try {
      const { userId } = req;
      const { time, note, plan } = req.body;
      const ticket = await TicketService.createTicket(userId, time, note, plan);
      return res.status(200).send({
        success: true,
        data: ticket
      });
    } catch (error) {
      return res.status(500).send({
        success: false,
        error
      });
    }
  }

  static async updateTicket(req, res) {
    try {
      const { userId, body } = req;
      const { id } = req.params;
      let whereObject = { userId, id };
      if (req.isAdmin) {
        whereObject = { id };
      }
      const ticket = await TicketService.getAllTickets(whereObject);
      if (!ticket) {
        return res.status(404).send({
          success: false,
          error: "ticket not found"
        });
      }

      const updatedTicket = await TicketService.updateTicket(body, whereObject);
      return res.status(200).send({
        success: true,
        data: updatedTicket[1]
      });
    } catch (error) {
      return res.status(500).send({
        success: false,
        error
      });
    }
  }

  static async getAllTickets(req, res) {
    try {
      const tickets = await TicketService.getAllTickets();
      return res.status(200).send({
        success: true,
        data: tickets
      });
    } catch (error) {
      return res.status(500).send({
        success: false,
        error
      });
    }
  }
}

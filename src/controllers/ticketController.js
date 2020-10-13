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

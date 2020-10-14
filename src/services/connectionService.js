import models from "../database/models";

const { Connection, Chat, User } = models;

export default class ConnectionService {
  static async findOrCreateConnection(adminId, userId) {
    const connection = await Connection.findOrCreate({
      where: {
        adminId,
        userId
      },
      include: [{
        model: Chat, as: "chat"
      }]
    });
    return { connection };
  }

  static async getAllConnections() {
    const connections = Connection.findAll({
      order: [
        [{ model: Chat, as: "chat" }, "createdAt", "ASC"]
      ],
      include: [{
        model: User, as: "user"
      }, {
        model: Chat,
        as: "chat",
      }]
    });
    return connections;
  }
}

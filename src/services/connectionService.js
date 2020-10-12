import models from "../database/models";

const { Connection, Chat } = models;

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
}

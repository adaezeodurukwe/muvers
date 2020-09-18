import models from "../database/models";

const { Chat } = models;

export default class ChatService {
  static getChat(adminId, UserId) {
    return Chat.find({
      where: {
        adminId,
        UserId
      }
    });
  }

  static saveChat(data) {
    return Chat.create(data);
  }
}

import Helpers from "../helpers/helpers";
import UserService from "../services/userService";
import ChatService from "../services/chatService";
import ConnectionService from "../services/connectionService";

const makeConnection = async (socket, io, connection) => {
  try {
    await socket.join(connection.id, () => {
      io.to(socket.id).emit("conversation", { connection });

      socket.on(`${connection.id}-message`, async (chat) => {
        const newChat = await ChatService.saveChat(chat);
        io.to(connection.id).emit("conversation", { newChat: newChat.dataValues });
      });
    });
  } catch (error) {
    io.to(socket.id).emit("error", { error });
  }
};

const adminConnection = async (socket, io) => {
  const connections = await ConnectionService.getAllConnections();
  io.to(socket.id).emit("admin_connections", { connections, message: "connected successfully" });

  connections.forEach((connection) => makeConnection(socket, io, connection.dataValues));
  return connections;
};

const userConnection = async (socket, io, user) => {
  const connection = await ConnectionService.findOrCreateConnection(1, user.dataValues.id);
  io.to(socket.id).emit("success", { connection: connection.connection[0], message: "connected successfully" });
  makeConnection(socket, io, connection.connection[0]);
};

const authenticate = async (token, socket, io) => {
  try {
    if (!token) {
      io.to(socket.id).emit("error", { message: "login to start chatting" });
    }
    const { email } = await Helpers.verifyToken(token);
    const user = await UserService.find({ email });

    if (!user) {
      return io.to(socket.id).emit("error", { message: "user not found" });
    }
    return user.dataValues.accountType === "admin" ? adminConnection(socket, io) : userConnection(socket, io, user);
  } catch (error) {
    io.to(socket.id).emit("error", { message: "login to start chatting" });
  }
};

export default (io) => {
  if (io) {
    io.on("connection", async (socket) => {
      socket.on("authenticate", async (data) => {
        try {
          await authenticate(data.token, socket, io);
        } catch (error) {
          console.log(error);
        }
      });
    });
  }
};

import UserService from "../services/userService";
import TicketService from "../services/ticketService";
import Helpers from "../helpers/helpers";

export default class UserController {
  static async createuser(req, res) {
    try {
      const { body } = req;
      const { password } = body;

      const existingUser = await UserService.find({ email: body.email });
      if (existingUser) {
        return res.status(400).send({
          success: false,
          message: "user already exist"
        });
      }

      const hashedPassword = Helpers.encryptPassword(password);
      body.password = hashedPassword;

      const user = await UserService.create(body);
      const userId = user.dataValues.id;
      const { time, note, plan } = body;
      let ticket = {};
      if (time && plan) {
        ticket = await TicketService.createTicket(userId, time, note, plan);
      }

      delete user.dataValues.password;

      return res.status(201).send({
        success: true,
        data: { user, ticket }
      });
    } catch (error) {
      return res.send({
        success: false,
        error
      });
    }
  }

  static async login(req, res) {
    try {
      const { email, password } = req.body;
      const user = await UserService.find({ email });
      const correctEmailPasswordCombination = await Helpers
        .comparePassword(password, user.dataValues.password);

      if (!correctEmailPasswordCombination) {
        return res.status(400).send({
          success: false,
          message: "unauthorized"

        });
      }

      delete user.dataValues.password;

      const token = await Helpers.generateToken(user.dataValues);

      return res.status(200).send({
        success: true,
        data: {
          user,
          token
        }
      });
    } catch (error) {
      return res.status(500).send({
        success: false,
        error
      });
    }
  }

  static async getUsers(req, res) {
    try {
      const users = await UserService.findAll();
      return res.status(200).send({
        success: true,
        data: users
      });
    } catch (error) {
      return res.status(500).send({
        success: false,
        error
      });
    }
  }

  static async getSingleUser(req, res) {
    try {
      const { id } = req.params;
      const user = UserService.find({ id });
      return res.status(200).send({
        success: true,
        data: user
      });
    } catch (error) {
      return res.status(500).send({
        success: false,
        error
      });
    }
  }

  static async getCurrentUser(req, res) {
    try {
      const { userId } = req;
      const user = await UserService.find({ id: userId });
      delete user.dataValues.password;
      return res.status(200).send({
        success: true,
        data: user
      });
    } catch (error) {
      return res.status(500).send({
        success: false,
        error
      });
    }
  }

  static async updateUser(req, res) {
    try {
      const { user } = req;
      const updatedUser = UserService.update(req.body, { id: user.id });
      return res.status(200).send({
        success: true,
        message: "user updated",
        data: updatedUser
      });
    } catch (error) {
      return res.status(500).send({
        success: false,
        error
      });
    }
  }

  static async deleteuser(req, res) {
    try {
      const { user } = req;
      await UserService.delete({ id: user.id });
      return res.status(200).send({
        success: true,
        message: "user deleted successfully",
        data: user
      });
    } catch (error) {
      return res.status(500).send({
        success: false,
        error
      });
    }
  }
}

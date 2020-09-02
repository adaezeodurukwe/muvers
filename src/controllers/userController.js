import UserService from "../services/userService";
import Helpers from "../helpers/helpers";

export default class UserController {
    static async createuser(req, res) {
        try {
            const { body } = req;
            const { password } = body;
            const hashedPassword = Helpers.encryptPassword(password);

            body[password] = hashedPassword;

            const user = await UserService.create(body);

            delete user.dataValues.password;

            return res.status(201).send({
                success: true,
                data: user
            })
        } catch (error) {
            return res.send({
                success: false,
                error
            })
        }
    }

    static async login(req, res) {
        try {
            const { email, password } = req.body;
            const user = await UserService.find({ email })
            const correctEmailPasswordCombination = Helpers.comparePassword(password, user.password);

            if (!correctEmailPasswordCombination) {
                return res.status(400).send({
                    success: false,
                    message: "unauthorized"

                })
            }

            delete user.dataValues.password;

            return res.status(200).send({
                success: true,
                data: {
                    user
                }
            })

        } catch (error) {
            return res.send({
                success: false,
                error
            })
        }
    }

    static async getUsers(req, res) { }

    static async getSingleUser(req, res) { }

    static async updateUser(req, res) { }

    static async deleteuser(req, res) { }
}
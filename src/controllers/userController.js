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
            return res.status(500).send({
                success: false,
                error
            })
        }
    }

    static async getUsers(req, res) {
        try {
        const users = await UserService.findAll();
        return res.status(200).send({
            success: true,
            data: users
        })
            
        } catch (error) {
            return res.status(500).send({
                success: false,
                error
            })
        }
        

    }

    static async getSingleUser(req, res) {
        try {
            const {id} = req.params;
            const user = UserService.find({id})
            return res.status(200).send({
                success: true,
                data: user
            })
        } catch (error) {
            return res.status(500).send({
                success: false,
                error
            })
        }

     }

    static async updateUser(req, res) {
        try {
            const { user } = req;
            const updatedUser = UserService.update(req.body, {id: user.id})
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
            const {user} = req;
            await UserService.delete({id: user.id});
            return res.status(200).send({
                success: true,
                message: "user deleted successfully",
                data: user
            });
            
        } catch (error) {
            return res.status(500).send({
                success: false,
                error
            })
            
        }
    }
}
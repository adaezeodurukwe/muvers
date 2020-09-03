import UserService from "../services/userService";

export default async (req, res, next) => {
  const { id } = req.params;
  const user = await UserService.find({ id });

  if (!user) {
    return res.status(404).send({
      success: false,
      message: "user not found"
    });
  }

  req[user] = user;

  next();
};

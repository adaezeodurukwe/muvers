import Helpers from "../helpers/helpers";

export default async (req, res, next) => {
  const { authorization } = req.headers;
  try {
    if (!authorization) {
      return res.status(401).send({
        status: "error",
        message: "unauthorized",
      });
    }

    const token = authorization.split(" ")[1];
    const unsigned = await Helpers.verifyToken(token);

    req.userId = unsigned.id;
    req.accountType = unsigned.accountType;

    return next();
  } catch (error) {
    return res.status(401).send({
      status: 401,
      message: error.message,
    });
  }
};

export const isAdmin = (req, res, next) => {
  const { accountType } = req;

  if (accountType !== "admin") {
    return res.status(401).send({
      status: "error",
      message: "unauthorized",
    });
  }
  req.isAdmin = true;
  return next();
};

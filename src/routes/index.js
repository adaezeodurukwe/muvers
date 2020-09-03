import express from "express";
import validateUser from "../middleware/userMiddleware";
import UserController from "../controllers/userController";

const router = express.Router();

router.post("/user", UserController.createuser);
router.post("/login", UserController.login);
router.get("/user", UserController.getUsers);
router.get("/user/:id", UserController.getSingleUser);
router.put("/user/:id", validateUser, UserController.updateUser);
router.delete("user/:id", validateUser, UserController.deleteuser);

export default router;

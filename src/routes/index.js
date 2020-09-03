import express from "express";
import Usercontroller from "../controllers/userController";
import { validateUser } from "../middleware/userMiddleware";
import UserController from "../controllers/userController";

const router = express.Router();

router.post("/user", Usercontroller.createuser);
router.post("/login", UserController.login);
router.get("/user", Usercontroller.getUsers);
router.get("/user/:id", Usercontroller.getSingleUser);
router.put("/user/:id", validateUser, Usercontroller.updateUser);
router.delete("user/:id", validateUser, Usercontroller.deleteuser);

export default router;
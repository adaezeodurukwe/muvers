import express from "express";
import Usercontroller from "../controllers/userController";

const router = express.Router();

router.post("/user", Usercontroller.createuser);
router.get("/user", Usercontroller.getUsers);
router.get("/user/:id", Usercontroller.getSingleUser);
router.put("/user/:id", Usercontroller.updateUser)
router.delete("user/:id", Usercontroller.deleteuser)

export default router;
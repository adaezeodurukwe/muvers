import express from "express";
import validateUser from "../middleware/userMiddleware";
import UserController from "../controllers/userController";
import authorize from "../middleware/authMiddleware";
import TicketController from "../controllers/ticketController";

const router = express.Router();

router.post("/user", UserController.createuser);
router.post("/login", UserController.login);
router.get("/user", UserController.getUsers);
router.get("/user/:id", UserController.getSingleUser);
router.put("/user/:id", validateUser, UserController.updateUser);
router.delete("/user/:id", validateUser, UserController.deleteuser);
router.post("ticket");
router.get("/tickets", authorize, TicketController.getUserTickets);
router.get("/tickets/:id");
router.patch("/tickets/:id/note");

// Admin routes
router.get("admin/tickets", authorize, TicketController.getUserTickets);

export default router;

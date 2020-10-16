import express from "express";
import validateUser from "../middleware/userMiddleware";
import UserController from "../controllers/userController";
import authorize, { isAdmin } from "../middleware/authMiddleware";
import TicketController from "../controllers/ticketController";

const router = express.Router();

router.post("/user", UserController.createuser);
router.post("/login", UserController.login);
router.get("/user", UserController.getUsers);
router.get("/user/:id", UserController.getSingleUser);
router.get("/currentUser", authorize, UserController.getCurrentUser);
router.put("/user/:id", validateUser, UserController.updateUser);
router.delete("/user/:id", validateUser, UserController.deleteuser);
router.post("/ticket", authorize, TicketController.createTicket);
router.put("/ticket/:id", authorize, TicketController.updateTicket);
router.get("/tickets", authorize, TicketController.getUserTickets);

// Admin routes
router.get("/admin/tickets", authorize, isAdmin, TicketController.getAllTickets);
router.get("admin/tickets", authorize, TicketController.getUserTickets);
router.put("admin/ticket/:id", authorize, isAdmin, TicketController.updateTicket);

export default router;

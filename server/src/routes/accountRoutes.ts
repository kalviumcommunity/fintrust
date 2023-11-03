import express from "express";
import { createAccount, deleteAccount, getDetails } from "../controllers/accountController";
import { authMiddleware } from "../middlewares/authMiddleware";
import { adminAuthMiddleware } from "../middlewares/adminAuthMiddleware";
const router = express.Router();

router.post("/create", authMiddleware, createAccount);
router.post("/delete", authMiddleware, deleteAccount);
router.post("/details", authMiddleware, getDetails);
export default router;

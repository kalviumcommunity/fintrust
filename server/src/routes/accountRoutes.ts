import express from 'express';
import { createAccount } from '../controllers/accountController';
import { authMiddleware } from '../middlewares/authMiddleware';
import { adminAuthMiddleware } from '../middlewares/adminAuthMiddleware';
const router = express.Router();

router.post("/create",authMiddleware, createAccount);
export default router;
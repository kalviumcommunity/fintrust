import express from 'express';
import { createAccount } from '../controllers/accountController';
import { authMiddleware } from '../middlewares/authMiddleware';
const router = express.Router();

router.post("/create",authMiddleware, createAccount);
export default router;
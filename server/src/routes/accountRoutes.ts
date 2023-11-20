import express from "express";
<<<<<<< Updated upstream
import { createAccount, deleteAccount, getDetails } from "../controllers/accountController";
=======
<<<<<<< Updated upstream
import { createAccount, deleteAccount } from "../controllers/accountController";
=======
import { createAccount, deleteAccount, getDetails, updateBalance } from "../controllers/accountController";
>>>>>>> Stashed changes
>>>>>>> Stashed changes
import { authMiddleware } from "../middlewares/authMiddleware";
import { adminAuthMiddleware } from "../middlewares/adminAuthMiddleware";
const router = express.Router();

router.post("/create", authMiddleware, createAccount);
router.post("/delete", authMiddleware, deleteAccount);
<<<<<<< Updated upstream
router.post("/details", authMiddleware, getDetails);
=======
<<<<<<< Updated upstream
=======
router.post("/details", authMiddleware, getDetails);
router.post("/update", authMiddleware, updateBalance);

>>>>>>> Stashed changes

>>>>>>> Stashed changes
export default router;

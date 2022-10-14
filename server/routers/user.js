import express from 'express';
import { loginAdmin, changePassword } from '../controllers/user.js';

const router = express.Router();

router.post('/admin', loginAdmin);
router.post('/change-password', changePassword);

export default router;
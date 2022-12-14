import express from 'express';
import { insertPayroll, getAllPayroll, updateMucLuong, resetCongLam, updateCongLam, updatePayrollFromTask } from '../controllers/payroll.js';

const router = express.Router();

router.post('/insert', insertPayroll);
router.get('/get-all', getAllPayroll);
router.post('/update-muc-luong', updateMucLuong);
router.post('/update-cong-lam', updateCongLam);
router.post('/reset-cong-lam', resetCongLam);
router.post('/update-payroll-from-task', updatePayrollFromTask);

export default router;
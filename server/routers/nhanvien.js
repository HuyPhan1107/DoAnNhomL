import express from 'express';
import { getAllNhanViens, addNewNV, deleteNV, updateNhanVien, searchNhanVien, getPosition, getStaffByPosition, getMucLuongNhanVienById } from '../controllers/nhanvien.js';

const router = express.Router();

router.get('/', getAllNhanViens);
router.get('/position', getPosition);
router.post('/add-new-nv', addNewNV);
router.post('/delete-nv', deleteNV);
router.post('/update-nv', updateNhanVien);
router.post('/search', searchNhanVien);
router.post('/get-staff-by-position', getStaffByPosition);
router.post('/get-muc-luong-nhan-vien-by-id', getMucLuongNhanVienById);

export default router;
import express from 'express';
import { getAllNhanViens, addNewNV, deleteNV, updateNhanVien, searchNhanVien } from '../controllers/nhanvien.js';

const router = express.Router();

router.get('/', getAllNhanViens);
router.post('/add-new-nv', addNewNV);
router.post('/delete-nv', deleteNV);
router.post('/update-nv', updateNhanVien);
router.post('/search', searchNhanVien);

export default router;
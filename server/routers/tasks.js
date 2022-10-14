import express from 'express';
import { deleteTask, getTasks, insertTask, updateTask } from '../controllers/tasks.js';

const router = express.Router();

router.get('/', getTasks);
router.post('/insert-task', insertTask);
router.post('/update-task', updateTask);
router.post('/delete-task', deleteTask);

export default router;
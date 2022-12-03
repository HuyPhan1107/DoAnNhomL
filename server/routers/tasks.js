import express from 'express';
import { deleteTask, getTaskById, getTasks, insertTask, setJsonTimekeeping, updateTask } from '../controllers/tasks.js';

const router = express.Router();

router.get('/', getTasks);
router.post('/insert-task', insertTask);
router.post('/update-task', updateTask);
router.post('/delete-task', deleteTask);

router.post('/set-json-timekeeping', setJsonTimekeeping);
router.post('/get-task-by-id', getTaskById);

export default router;
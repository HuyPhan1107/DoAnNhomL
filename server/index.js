import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import nhanvien from './routers/nhanvien.js';
import user from './routers/user.js';
import task from './routers/tasks.js';
import payroll from './routers/payroll.js';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json({ limit: '30mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '30mb' })); 
app.use(cors());

app.use('/nhanvien', nhanvien);
app.use('/user', user);
app.use('/tasks', task);
app.use('/payroll', payroll);

app.listen(PORT, () => {
    console.log(`Server dang chay PORT ${PORT}`);
});
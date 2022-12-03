import RestartAltIcon from '@mui/icons-material/RestartAlt';
import WatchLaterIcon from '@mui/icons-material/WatchLater';
import { Box, Button } from '@mui/material';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { useEffect, useState } from 'react';
import { getAllPayrolls, resetCongLam } from '../../api';
import { useStore } from '../../hooks';
import { setToastMesagae, showModal } from '../../reducers/action';
import ModalBangLuong from '../CommonModal/ModalBangLuong';

function formatThu(thu) {
    if(thu === 1) {
        return 'Thứ hai'
    }else if (thu === 2){
        return 'Thứ ba'
    }else if (thu === 3){
        return 'Thứ tư'
    }else if (thu === 4){
        return 'Thứ năm'
    }else if (thu === 5){
        return 'Thứ sáu'
    }else if (thu === 6){
        return 'Thứ bảy'
    }else {
        return 'Chủ nhật'
    }
}

function formatDate(date) {

    const thu = formatThu(date.getDay());
    const ngay = date.getDate();
    const thang = date.getMonth() + 1;
    const nam = date.getFullYear();
    const gio = date.getHours();
    const phut = date.getMinutes();
    const giay = date.getSeconds();

    return `${gio < 10 ? `0${gio}` : gio}:${phut < 10 ? `0${phut}` : phut}:${giay < 10 ? `0${giay}` : giay} ${thu},  ${ngay < 10 ? `0${ngay}` : ngay}/${thang < 10 ? `0${thang}` : thang}/${nam}`
}

function Payroll() {

    const [listPayroll, setListPayroll] = useState([]);
    const [date, setDate] = useState(new Date());
    const dispatch = useStore()[1];

    const fetchData = async () => {
        const response = await getAllPayrolls();
        const { data } = response;
        if (!data) {
            dispatch(setToastMesagae({
                title: 'Lỗi',
                message: 'Lỗi lấy danh sách bảng lương!',
                type: 'error',
            }));
            return;
        }
        setListPayroll(data)
    }

    useEffect(() => {
       fetchData();
    }, [])

    useEffect(() => {
        const timer = setInterval(() => {
            const date = new Date();
            setDate(date);
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    const handleReset = async id => {
        const response = await resetCongLam({id});
        const { data } = response;
        if (!data.key) {
            dispatch(setToastMesagae({
                title: 'Lỗi',
                message: 'Lỗi làm mới công làm!',
                type: 'error',
            }));
            return;
        }
        dispatch(setToastMesagae({
            title: 'Thành công',
            message: 'Đã làm mới công làm!',
            type: 'success',
        }));
        fetchData();
    }

    const showBangLuong = (payroll) => {
        dispatch(showModal({
            showModal: true,
            title: `Thông tin bảng lương: ${payroll.TenNv}`,
            component: <ModalBangLuong payroll={payroll} />,
        }))
    }

    return <>
    <Box mb={1} display='flex' justifyContent='flex-end'>
        <Button size='large' variant='contained'>
            <WatchLaterIcon />
            <span style={{textTransform: 'capitalize'}}>{formatDate(date)}</span>
        </Button>
    </Box>
        
    <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead style={{ backgroundColor: '#006BCE'}}>
                <TableRow>
                <TableCell><span style={{ color: '#fff' }}>Tên Nhân Viên</span></TableCell>
                    <TableCell align="right">
                        <span style={{ color: '#fff' }}>Số công làm</span>
                    </TableCell>
                    <TableCell align="right">
                        <span style={{ color: '#fff' }}>Tăng ca</span>
                    </TableCell>
                    <TableCell align="right">
                        <span style={{ color: '#fff' }}>Đi trễ</span>
                    </TableCell>
                    <TableCell align="right">
                        <span style={{ color: '#fff' }}>Tổng lương</span>
                    </TableCell>
                    <TableCell align="right">
                        <span style={{ color: '#fff' }}>Tính năng</span>
                    </TableCell>
                </TableRow>
            </TableHead>

            <TableBody>
                {
                    listPayroll.map(payroll => {
                        return (
                            <TableRow
                                key={payroll.Id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    <span style={{ color: 'blue', fontSize: 16 }}>
                                        {payroll.TenNv}
                                    </span>
                                </TableCell>

                                <TableCell align="right">{payroll.CongLam}</TableCell>
                                <TableCell align="right">{payroll.TangCa}</TableCell>
                                <TableCell align="right">{payroll.DiTre}</TableCell>
                                <TableCell align="right">
                                    <Button 
                                        variant='contained'
                                        onClick={() => showBangLuong(payroll)}
                                    >
                                        Xem Bảng lương
                                    </Button>
                                </TableCell>
                                <TableCell align="right">
                                    <Button onClick={() => handleReset(payroll.Id)} variant='contained'>
                                        <RestartAltIcon />
                                        Reset
                                    </Button>
                                </TableCell>
                            </TableRow>
                        )
                    })
                }
            </TableBody>
        </Table>
    </TableContainer>
</>};

export default Payroll;
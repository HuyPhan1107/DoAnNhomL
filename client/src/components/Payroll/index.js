import RestartAltIcon from '@mui/icons-material/RestartAlt';
import WatchLaterIcon from '@mui/icons-material/WatchLater';
import { Button, IconButton, Box } from '@mui/material';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableViewIcon from '@mui/icons-material/TableView';
import { useEffect, useState } from 'react';
import { useStore } from '../../hooks';
import { getAllPayrolls, resetCongLam } from '../../api';
import { setListPayroll, setToastMesagae, showModal } from '../../reducers/action';
import ModalPayroll from '../CommonModal/ModalPayroll'

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

    const [state, dispatch] = useStore();
    const { listPayroll } = state
    const [date, setDate] = useState(new Date())

    useEffect(() => {
        async function fetchData() {
            const response = await getAllPayrolls();
            const { data } = response;
            dispatch(setListPayroll(data));
        }

       fetchData();
    }, [dispatch])

    useEffect(() => {
        const timer = setInterval(() => {
            const date = new Date();
            setDate(date);
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    const handleReset = async id => {
        const response = await resetCongLam({id})
        const { data } = response;
        if(data.key) {
            const response = await getAllPayrolls();
            const { data } = response;
            dispatch(setListPayroll(data));

            dispatch(setToastMesagae({
                title: 'Thành công',
                message: 'Đã làm mới lại số công làm',
                type: 'success',
            }));
        }else {
            dispatch(setToastMesagae({
                title: 'Thất bại',
                message: 'Lỗi server',
                type: 'error',
            }))
        }
    }

    const handlePayroll = (Id, TenNv, congLam) => {
        dispatch(showModal({
            showModal: true,
            title: `Bảng chấm công của nhân viên: ${TenNv}`,
            component: <ModalPayroll Id={Id} congLam={congLam} />,
       }));
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
                        <span style={{ color: '#fff' }}>Mức lương</span>
                    </TableCell>
                    <TableCell align="right">
                        <span style={{ color: '#fff' }}>Chấm công</span>
                    </TableCell>
                    <TableCell align="right">
                        <span style={{ color: '#fff' }}>Số công làm</span>
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
                        const { CongLam } = payroll;
                        const arrayCongLam = CongLam.split(',')
                        const checkSoCongLam = arrayCongLam.reduce((accumulator, congLam) => {
                            if(Number(congLam) === 1) {
                                return accumulator += 1
                            }else return accumulator;
                        }, 0)

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
                                
                                <TableCell align="right">{payroll.MucLuong}</TableCell>
                                <TableCell align="right">
                                    <IconButton onClick={() => handlePayroll(payroll.Id, payroll.TenNv, arrayCongLam)}>
                                        <TableViewIcon />
                                    </IconButton>
                                </TableCell>
                                <TableCell align="right">{checkSoCongLam}</TableCell>
                                <TableCell align="right">{payroll.MucLuong * checkSoCongLam}</TableCell>
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
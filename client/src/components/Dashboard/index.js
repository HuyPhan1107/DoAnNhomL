import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import TableViewIcon from '@mui/icons-material/TableView';
import AddUserIcon from '@mui/icons-material/PersonAdd';
import { Button, IconButton } from '@mui/material';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import * as React from 'react';
import { useEffect } from 'react';
import { createPayroll, deleteNV, getNV } from '../../api';
import { useStore } from '../../hooks';
import { setListNhanVien, setToastMesagae, showModal, setInfoNV } from '../../reducers/action';
import { ModalNhanVien } from '../CommonModal';
import { useStyles } from './style';

function Dashboard() {

     const classes = useStyles();
     const [state, dispatch] = useStore();
     const { listNhanVien, userLogin } = state;

     useEffect(() => {
          async function fetchData() {
               const response = await getNV();
               const { data } = response;
               dispatch(setListNhanVien(data))
          }

          fetchData();
     }, [dispatch]);

     const handleModalAddNV = () => {
          dispatch(showModal({
               showModal: true,
               title: 'Thêm mới nhân viên',
               component: <ModalNhanVien />,
          }))
     }

     const handleDelete = id => {
          async function fetchData() {
               const response = await deleteNV({id});
               const { data } = response;
               
               if(data.key) {
                    const responseGetNV = await getNV();
                    const { data } = responseGetNV;
                    dispatch(setListNhanVien(data))
               }else {
                    dispatch(setToastMesagae({
                         title: 'Thất bại',
                         message: 'Lỗi server',
                         type: 'error',
                    }))
               }
          }

          fetchData();
     }

     const handleUpdate = nhanVien => {
          dispatch(setInfoNV({
               id: nhanVien.Id,
               tenNV: nhanVien.TenNV,
               sdt: nhanVien.SDT,
               gender: nhanVien.GioiTinh,
               diaChi: nhanVien.DiaChi,
               chucVu: nhanVien.ChucVu,
               mucLuong: nhanVien.MucLuong,
          }))

          dispatch(showModal({
               showModal: true,
               title: 'Thay đổi thông tin Nhân Viên',
               component: <ModalNhanVien MucLuong={nhanVien.MucLuong} TenNV={nhanVien.TenNV} />,
          }))
     }

     const handleCreatePayroll = async nhanVien => {
          const { Id, TenNV, MucLuong } = nhanVien;
          const response = await createPayroll({ Id, TenNV, MucLuong })
          const { data } = response;
          if(data.key) {
               if(data.create) {
                    dispatch(setToastMesagae({
                         title: 'Thành công',
                         message: 'Đã khởi tạo bảng chấm công cho nhân viên này thành công',
                         type: 'success',
                    }))
               }else {
                    dispatch(setToastMesagae({
                         title: 'Thông tin',
                         message: 'Bảng chấm công của nhân viên này đã được tạo trước đó',
                         type: 'info',
                    }))
               }
          }else {
               dispatch(setToastMesagae({
                    title: 'Lỗi',
                    message: 'Thất bại lỗi client or server',
                    type: 'error',
               }))
          }
     }

     return (<>
          {
               userLogin ? 
               <Box mb={2}>
                    <Button onClick={handleModalAddNV} variant='contained'>
                         <AddUserIcon />
                    </Button>
               </Box> 
               : null
          }

          <TableContainer component={Paper}>
               <Table sx={{ minWidth: 650 }} aria-label="simple table">
               <TableHead style={{ backgroundColor: '#006BCE'}}>
                    <TableRow>
                    <TableCell><span style={{ color: '#fff' }}>Tên Nhân Viên</span></TableCell>
                         <TableCell align="right">
                              <span style={{ color: '#fff' }}>Giới Tính</span>
                         </TableCell>
                         <TableCell align="right">
                              <span style={{ color: '#fff' }}>Địa Chỉ</span>
                         </TableCell>
                         <TableCell align="right">
                              <span style={{ color: '#fff' }}>SDT</span>
                         </TableCell>
                         <TableCell align="right">
                              <span style={{ color: '#fff' }}>Chức Vụ</span>
                         </TableCell>
                         <TableCell align="right">
                              <span style={{ color: '#fff' }}>Mức Lương</span>
                         </TableCell>
                         {
                              userLogin ? 
                              <TableCell align="right">
                                   <span style={{ color: '#fff' }}>Tính Năng</span>
                              </TableCell>
                              : null
                         }
                    </TableRow>
               </TableHead>

               <TableBody>
                    {/*  */}
                    {
                         listNhanVien.map(nhanVien => (
                              <TableRow
                                   key={nhanVien.Id}
                                   sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                              >
                                   <TableCell component="th" scope="row">
                                        <span style={{ color: 'blue', fontSize: 16 }}>
                                             {nhanVien.TenNV}
                                        </span>
                                   </TableCell>
                                   
                                   <TableCell align="right">{nhanVien.GioiTinh === 1 ? 'Nam' : 'Nữ'}</TableCell>
                                   <TableCell align="right">{nhanVien.DiaChi}</TableCell>
                                   <TableCell align="right">{nhanVien.SDT}</TableCell>
                                   <TableCell align="right">{nhanVien.ChucVu}</TableCell>
                                   <TableCell align="right">{nhanVien.MucLuong}</TableCell>
                                   
                                   {
                                        userLogin ? 
                                        <TableCell align="right">
                                             <div>
                                                  <IconButton onClick={() => handleCreatePayroll(nhanVien)} className={classes.icon}>
                                                       <TableViewIcon />
                                                  </IconButton>

                                                  <IconButton onClick={() => handleUpdate(nhanVien)} className={classes.icon}>
                                                       <EditIcon />
                                                  </IconButton>

                                                  <IconButton onClick={() => handleDelete(nhanVien.Id)} className={classes.icon}>
                                                       <DeleteIcon />
                                                  </IconButton>
                                             </div>
                                        </TableCell>
                                        : null
                                   }
                              </TableRow>
                         ))
                    }
               </TableBody>
               </Table>
          </TableContainer>
          <Button variant='contained'  color='inherit'>click me!</Button>
     </>);
}

export default Dashboard;

import { Box, Button, Radio, TextField } from '@mui/material';
import { addNewNV, getNV, updateMucLuong, updateNV } from '../../api';
import { useStore } from '../../hooks';
import { actionType, setInfoNV, setListNhanVien, setToastMesagae } from '../../reducers/action';
import { HIDE_MODAL } from '../../reducers/constant';

function ModalNhanVien({ MucLuong, TenNV }) {

    const [state, dispatch] = useStore();
    const { nhanVien: { tenNV, sdt, gender, diaChi, chucVu, mucLuong, id } } = state;

    const handleChange = (event) => {

        const name = event.target.name;
        const value = name === 'gender' ? Number(event.target.value) : event.target.value;

        dispatch(setInfoNV({
            ...state.nhanVien,
            [name]: value,
        }))
    };

    const handleSubmit = async () => {
        if(!id) {
            const respone = await addNewNV(state.nhanVien);
    
            if(respone.data.key === true) {
                dispatch(actionType(HIDE_MODAL));
    
                const responseGetNV = await getNV();
                const { data } = responseGetNV;
                dispatch(setListNhanVien(data)); 
                dispatch(setToastMesagae({
                    title: 'Thành công',
                    message: 'Thêm mới nhân viên thành công!',
                    type: 'success',
                }));
            }
        }else {
            if (mucLuong === MucLuong && tenNV === TenNV) {
                const respone = await updateNV(state.nhanVien);
        
                if(respone.data.key === true) {
                    dispatch(actionType(HIDE_MODAL));
        
                    const responseGetNV = await getNV();
                    const { data } = responseGetNV;
                    dispatch(setListNhanVien(data)); 
                    dispatch(setToastMesagae({
                        title: 'Thành công',
                        message: 'Thay đổi thông tin nhân viên thành công!',
                        type: 'success',
                    }));
                }else {
                    dispatch(setToastMesagae({
                        title: 'Thất bại',
                        message: 'Lỗi client or server!',
                        type: 'eror',
                    }));
                }
            }else {
                const respone = await updateMucLuong({
                    mucLuong,
                    id,
                    tenNV,
                });
        
                if(respone.data.key === true) {
                    const respone = await updateNV(state.nhanVien);
        
                    if(respone.data.key === true) {
                        dispatch(actionType(HIDE_MODAL));
            
                        const responseGetNV = await getNV();
                        const { data } = responseGetNV;
                        dispatch(setListNhanVien(data)); 
                        dispatch(setToastMesagae({
                            title: 'Thành công',
                            message: 'Thay đổi thông tin nhân viên thành công!',
                            type: 'success',
                        }));
                    }else {
                        dispatch(setToastMesagae({
                            title: 'Thất bại',
                            message: 'Lỗi client or server!',
                            type: 'eror',
                        }));
                    }
                }else {
                    dispatch(setToastMesagae({
                        title: 'Thất bại',
                        message: 'Lỗi client or server!',
                        type: 'eror',
                    }));
                }
            }
        }
    }

    return (
        <Box style={{padding: '0 8px 8px 12px'}}>
            <TextField 
                fullWidth 
                id="standard-basic" 
                label="Tên NV:" 
                variant="standard" 
                name='tenNV'
                value={tenNV}
                onChange={handleChange}
            />

            <Box display='flex'>
                <TextField 
                    style={{marginRight: 24}} 
                    fullWidth id="standard-basic" 
                    label="SĐT:" 
                    variant="standard" 
                    name='sdt'
                    value={sdt}
                    onChange={handleChange}
                />

                <Box display='flex'>
                    <Box display='flex' mt={2} alignItems='center'>
                        <span style={{color: 'blue'}}>Nam</span>
                        <Radio
                            checked={gender === 1}
                            onChange={handleChange}
                            value={1}
                            name="gender"
                            inputProps={{ 'aria-label': 'A' }}
                        />
                    </Box>

                    <Box display='flex' mt={2} alignItems='center'>
                        <span style={{color: 'red'}}>Nữ</span>
                        <Radio
                            checked={gender === 0}
                            onChange={handleChange}
                            value={0}
                            style={{color: '#F50057'}}
                            name="gender"
                            inputProps={{ 'aria-label': 'B' }}
                        />
                    </Box>
                </Box>
            </Box>

            <TextField 
                fullWidth 
                id="standard-basic" 
                label="Địa chỉ:" 
                variant="standard" 
                name='diaChi'
                value={diaChi}
                onChange={handleChange}
            />

            <Box display='flex'>
                <TextField 
                    style={{marginRight: 4}} 
                    fullWidth id="standard-basic" 
                    label="Chức vụ:" 
                    variant="standard" 
                    name='chucVu'
                    value={chucVu}
                    onChange={handleChange}
                />

                <TextField 
                    style={{marginLeft: 4}} 
                    fullWidth id="standard-basic" 
                    label="Mức lương:" 
                    variant="standard" 
                    name='mucLuong'
                    value={mucLuong}
                    onChange={handleChange}
                />
            </Box>


            <Button 
                size="small" 
                variant='contained' 
                fullWidth 
                style={{margin: '12px 0'}}
                onClick={handleSubmit}
            >
                {
                    id ? 'Thay đổi' : 'Thêm'
                }
            </Button>
        </Box>
    )
}

export default ModalNhanVien;
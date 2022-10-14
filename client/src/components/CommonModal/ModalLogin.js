import { Box, TextField, Button } from '@mui/material'
import { useStyles } from './style';
import { changePassword, login } from '../../api';
import { useState } from 'react';
import { useStore } from '../../hooks';
import { actionType, setToastMesagae, setUserLogin } from '../../reducers/action';
import { HIDE_MODAL } from '../../reducers/constant';

function ModalLogin() {

    const classes = useStyles();
    const dispatch = useStore()[1];
    const [changePass, setChangePass] = useState(false)

    const [user, setUser] = useState({
        user: '',
        pass: '',
        oldPass: '',
    })

    const handleLogin = async () => {
        if(!changePass) {
            const response = await login(user);
            const { data } = response;
            if(data.key){
    
                dispatch(setUserLogin(true))
    
                dispatch(actionType(HIDE_MODAL))
    
                dispatch(setToastMesagae({
                    title: 'Đã đăng nhập',
                    message: 'Đăng nhập thành công!',
                    type: 'success',
                }));
            }else {
                dispatch(setToastMesagae({
                    title: 'Thất bại',
                    message: 'Sai thông tin tài khoản!',
                    type: 'error',
                }));
            }
        }else {
            if(user.user === user.pass) {
                const response = await changePassword(user);
                const { data } = response;
                if(data.key) {
                    setChangePass(false)
                    dispatch(setToastMesagae({
                        title: 'Thành công',
                        message: 'Đã thay đổi mật khẩu mới!',
                        type: 'success',
                    }));
                    setUser({
                        user: '',
                        pass: '',
                        oldPass: '',
                    })
                }else {
                    dispatch(setToastMesagae({
                        title: 'Thất bại',
                        message: 'Thông tin mật khẩu không chín xác',
                        type: 'error',
                    }));
                }
            }else {
                dispatch(setToastMesagae({
                    title: 'Thông tin',
                    message: 'Nhậm lại mật khẩu không chín xác',
                    type: 'info',
                }));
            }
        }
    }

    const handleChange = e => {
        const name = e.target.name;
        const value = e.target.value;
        setUser(prev => ({
            ...prev,
            [name]: value,
        }))
    }

    const handleChangePass = () => {
        setChangePass(prev => !prev)
    }

    return <Box padding='0 12px 8px 8px'>
        {
            changePass ? 
            <TextField 
                fullWidth 
                id="standard-basic" 
                label='Old password'
                type="password"
                variant="standard" 
                name='oldPass'
                value={user.oldPass}
                onChange={handleChange}
            />
            : null
        }

        <TextField 
            fullWidth 
            id="standard-basic" 
            label={changePass ? "New passwword:" : "Tên user admin:"}
            type={changePass ? "password" : "text"}
            variant="standard" 
            name='user'
            value={user.user}
            onChange={handleChange}
        />

        <TextField 
            fullWidth 
            type="password"
            id="standard-basic" 
            label={changePass ? "Confirm new passwword:" : "Password:"}
            variant="standard" 
            name='pass'
            value={user.pass}
            onChange={handleChange}
        />

        <Box display="flex" justifyContent='flex-end'>
            <Box onClick={handleChangePass} className={classes.boxChangePass} margin='8px 4px'>
                {
                    changePass ? "Login" : "Change Password"
                }
            </Box>
        </Box>

        <Button 
            size="small" 
            variant='contained' 
            fullWidth 
            style={{margin: '8px 0 12px 0'}}
            onClick={handleLogin}
        >{changePass ? 'Thay đổi' : 'Đăng nhập'}</Button>
    </Box>
}

export default ModalLogin;
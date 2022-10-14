import * as React from 'react';
import { AppBar, InputBase } from '@mui/material';
import { styled, alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import { useStore } from '../../hooks';
import { setListNhanVien, setListPayroll, setOpenMenu, setTasks, setUserLogin, showModal } from '../../reducers/action';
import { ModalLogin } from '../CommonModal';
import { useLocation } from 'react-router';
import { searchData } from '../../api';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

export default function Header() {

  const location = useLocation();
  const [state, dispatch] = useStore();
  const { openMenu, userLogin } = state;

  const handleOpenMenu = () => {
    dispatch(setOpenMenu(!openMenu))
  }

  const handleLogin = () => {
    if(!userLogin) {
      dispatch(showModal({
        showModal: true,
        title: 'Đăng nhập admin',
        component: <ModalLogin />,
      }))
    }else {
      dispatch(setUserLogin(false))
    }
  }

  const handleChangeSearch = async e => {
    const {pathname} = location;
    const value = e.target.value;

    if(pathname === '/') {
      const response = await searchData({
        valueSearch: value,
        table: 'nhan_vien'
      });
      const { data } = response;
      dispatch(setListNhanVien(data))
    }else if (pathname === '/manage-task') {
      const response = await searchData({
        valueSearch: value,
        table: 'manage_task'
      });
      const { data } = response;
      dispatch(setTasks(data))
    }else {
      const response = await searchData({
        valueSearch: value,
        table: 'payroll'
      });
      const { data } = response;
      dispatch(setListPayroll(data));
    }
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Box display='flex' alignItems='center'>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
              onClick={handleOpenMenu}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Quản lý nhân viên
            </Typography>
          </Box>

          <Box display='flex' justifyContent='space-between' width='80%'>
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Tìm kiếm..."
                inputProps={{ 'aria-label': 'search' }}
                onChange={handleChangeSearch}
              />
            </Search>

            <Button onClick={handleLogin} variant='contained' color="inherit">
              <span style={{color: '#333', textTransform: 'capitalize'}}>{userLogin ? 'Logout' : 'Login'}</span>
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

import ManageIcon from '@mui/icons-material/ManageAccounts';
import UserIcon from '@mui/icons-material/People';
import TaskIcon from '@mui/icons-material/Task';
import TableViewIcon from '@mui/icons-material/TableView';
import { Box, IconButton } from '@mui/material';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import * as React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { useStore } from '../../hooks';
import { setOpenMenu, showModal } from '../../reducers/action';
import { ModalLogin } from '../CommonModal';

const MyLink = ({ children, to }) => {
    const location = useLocation()
    const match = location.pathname === to
  
    return (
      <Box style={match ? {backgroundColor: 'rgb(182,182,182,0.9)', } : {}}>
        <Link style={{textDecoration: 'none', color: '#000'}} to={to}>
          {children}
        </Link>
      </Box>
    )
  }

export default function Drawable() {
    const [state, dispatch] = useStore();
    const { openMenu, userLogin } = state;

    const handleShowLogin = () => {
        dispatch(showModal({
            showModal: true,
            title: 'Đăng nhập admin',
            component: <ModalLogin />,
          }))
    }

    return (
   <Drawer
        anchor='left'
        open={openMenu}
        onClose={() => dispatch(setOpenMenu(false))}
    >
        <Box
            sx={{ width: 250 }}
            role="presentation"
            // onClick={toggleDrawer(anchor, false)}
            // onKeyDown={toggleDrawer(anchor, false)}
        >
            <List>
                <Box style={{cursor: 'pointer'}} display='flex' alignItems='center'>
                    <IconButton size='medium' >
                        <ManageIcon style={{fontSize: 40}} />
                    </IconButton>

                    <span style={{fontSize: 18, fontWeight: 'bold', color: '#757575'}}>Quản Lý Nhân Viên</span>
                </Box>
                <Divider />

                <MyLink to='/'>
                    <>
                        <ListItem button>
                            <ListItemIcon>
                                <UserIcon />
                            </ListItemIcon>

                            <ListItemText primary={'Nhân viên'} />
                        </ListItem>
                    </>
                </MyLink>
                <Divider />
                {
                    userLogin ? 
                    <>
                        <MyLink to='/manage-task'>
                            <>
                                <ListItem button>
                                    <ListItemIcon>
                                        <TaskIcon />
                                    </ListItemIcon>

                                    <ListItemText primary={'Công việc'} />
                                </ListItem>
                            </>
                        </MyLink>

                        <MyLink to='/payroll'>
                            <>
                                <ListItem button>
                                    <ListItemIcon>
                                        <TableViewIcon />
                                    </ListItemIcon>

                                    <ListItemText primary={'Bảng chấm công'} />
                                </ListItem>
                            </>
                        </MyLink>
                    </>
                    : 
                    <>
                        <ListItem onClick={handleShowLogin} button>
                            <ListItemIcon>
                                <TaskIcon />
                            </ListItemIcon>

                            <ListItemText primary={'Công việc'} />
                        </ListItem>

                        <ListItem onClick={handleShowLogin} button>
                            <ListItemIcon>
                                <TableViewIcon />
                            </ListItemIcon>

                            <ListItemText primary={'Bảng chấm công'} />
                        </ListItem>
                    </>
                }
            </List>
        </Box>
    </Drawer>
  );
}

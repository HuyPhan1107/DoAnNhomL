import SearchIcon from '@mui/icons-material/Search';
import { Box, Button, InputBase } from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { styled } from '@mui/material/styles';
import * as React from 'react';
import { getTaskById, setJsonTimekeeping } from '../../api';
import { useStore } from '../../hooks';
import { actionType, setToastMesagae } from '../../reducers/action';
import { HIDE_MODAL } from '../../reducers/constant';

const Search = styled('div')(({ theme }) => ({
    display: 'flex',
    margin: 12,
    alignItems: 'center',
    boxShadow: 'inset 0 1px 1px rgb(0 0 0 / 8%)',
    borderRadius: 4,
    border: '1px solid #e3e6ea',
    padding: '0 4px',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: 5,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '20ch',
        },
    },
    margin: '0 8px'
}));
  

export default function ModalEmployeeTimekeeping({listStaff, Id}) {
    const dispatch = useStore()[1];
    const listId = React.useRef([]);
    const listIdCancelWork = React.useRef([]);
    const [infoTask, setInfoTask] = React.useState(undefined);
    const [staffs, setSttaffs] = React.useState(listStaff.map(val => ({
        Id: val.Id,
        checked: false,
        TenNV: val.TenNV
    })));

    React.useEffect(() => {
        const fetchData = async () => {
            const {data} = await getTaskById({Id});
            if (!data.key) {
                dispatch(setToastMesagae({
                    title: 'Thất bại',
                    message: 'Lỗi lấy dữ liệu công việc!',
                    type: 'error',
                }));
                return;
            }
            setInfoTask(data.result[0]);
            if (data.result[0].json_timekeeping === '') return;
            const timekeeping = JSON.parse(data.result[0].json_timekeeping);
            if (timekeeping.Ready) {
                const list_Id = timekeeping.Ready;
                const newstaffs = staffs.map(s => {
                    if (list_Id.includes(s.Id)) {
                        listId.current.push(s.Id);
                        s.checked = true
                    }
                    return s;
                });
                setSttaffs(newstaffs);
            }
            if (timekeeping.InProgress) {
                listIdCancelWork.current = timekeeping.InProgress
            }
        }

        fetchData();
    }, []);
/**Chức năng tìm kiếm */
    const handleChangeSearch = async e => {
        const value = e.target.value;
        const newStaffs = listStaff.reduce((acc, staff) => {
            if (staff.TenNV.toLocaleLowerCase().includes(value.toLocaleLowerCase())) {
                const checked = listId.current.some(val => val === staff.Id);
                return [...acc, {
                    Id: staff.Id,
                    checked,
                    TenNV: staff.TenNV
                }]
            }
            return acc
        }, [])
        setSttaffs(newStaffs);
    }

    const handleToggle = (id) => {
        if (infoTask && infoTask.status === 4) return;
        if (infoTask && (infoTask.status === 1 || infoTask.status === 3)) {
            const newStaffs = staffs.map(val => {
                if (id === val.Id) {
                    val.checked = !val.checked;
                    if (val.checked) {
                        listId.current.push(id);
                    } else {
                        listId.current = listId.current.filter(v => v !== id)
                    }
                }
                return val
            });
            setSttaffs(newStaffs);
        } else {
            if (listId.current.includes(id)) {
                if (!window.confirm(`Bạn có chắc muốn huỷ bỏ công làm của số mã nhân viên "${id}"`)) {
                    return;
                }
                /**Chức năng đi trễ */
                const newStaffs = staffs.map(val => {
                    if (id === val.Id) {
                        val.checked = false;
                    }
                    return val;
                });
                listId.current = listId.current.filter(v => v !== id);
                listIdCancelWork.current = listIdCancelWork.current.filter(v => v !== id);
                setSttaffs(newStaffs);
                
            } else {
                if (!window.confirm(`Công làm của mã nhân viên "${id}" sẽ bị đánh dấu đi trễ, đi trễ phạt 10% lương`)) {
                    return
                }
                const newStaffs = staffs.map(val => {
                    if (id === val.Id) {
                        val.checked = true;
                    }
                    return val;
                });
                listId.current.push(id);
                listIdCancelWork.current.push(id);
                setSttaffs(newStaffs);
            }
        }
    }

    const handleSubmitReady = async () => {
        let list_id = JSON.stringify({
            "Ready": listId.current
        })
        const { data } = await setJsonTimekeeping({listId: list_id, Id});
        if(!data.key) {
            dispatch(setToastMesagae({
                title: 'Thất bại',
                message: 'Lỗi xác nhận những nhân viên sẵn sàng nhận công việc!',
                type: 'error',
            }));
            return;
        }
        dispatch(actionType(HIDE_MODAL))
        dispatch(setToastMesagae({
            title: 'Thành công',
            message: 'Đã thiếc lập những nhân viên sẵn sàng nhận công việc!',
            type: 'success',
        }));
    }

    const handleCheckedAll = () => {
        if (infoTask && infoTask.status !== 1) return;
        if (listId.current.length === listStaff.length) {
            listId.current = [];
            const newStaffs = staffs.map(val => {
                val.checked = false;
                return val
            });
            setSttaffs(newStaffs);
            return;
        }
        listId.current = listStaff.map(val => val.Id);
        const newStaffs = staffs.map(val => {
            val.checked = true;
            return val
        });
        setSttaffs(newStaffs);
    }

    const handleSubmitInProgress = async () => {
        let list_id = JSON.stringify({
            "Ready": listId.current,
            "InProgress": listIdCancelWork.current
        })
        const { data } = await setJsonTimekeeping({listId: list_id, Id});
        if(!data.key) {
            dispatch(setToastMesagae({
                title: 'Thất bại',
                message: 'Lỗi xác nhận những nhân viên làm công việc!',
                type: 'error',
            }));
            return;
        }
        dispatch(actionType(HIDE_MODAL))
        dispatch(setToastMesagae({
            title: 'Thành công',
            message: 'Đã xác nhận những nhân viên làm công việc!',
            type: 'success',
        }));
    }

    const handleSubmitCompleted = async () => {
        let list_id = JSON.stringify({
            "Ready": listId.current,
            "Completed": listId.current
        })
        const { data } = await setJsonTimekeeping({listId: list_id, Id});
        if(!data.key) {
            dispatch(setToastMesagae({
                title: 'Thất bại',
                message: 'Lỗi xác nhận những nhân viên có thể tăng ca!',
                type: 'error',
            }));
            return;
        }
        dispatch(actionType(HIDE_MODAL))
        dispatch(setToastMesagae({
            title: 'Thành công',
            message: 'Đã xác nhận những nhân viên có thể tăng ca!',
            type: 'success',
        }));
    }
    
    return (
        <>
        <Search>
            <SearchIcon />
            <StyledInputBase
                placeholder="Tìm kiếm..."
                inputProps={{ 'aria-label': 'search' }}
                onChange={handleChangeSearch}
            />
        </Search>

        <List sx={{ 
            width: '100%', 
            bgcolor: 'background.paper',
            height: 300,
            overflowY: 'scroll'
        }}>
            <ListItem
                secondaryAction={
                    <ListItemIcon>
                        <span>Mã NV</span>
                    </ListItemIcon>
                }
                disablePadding
                sx={{borderBottom: '1px solid #ccc'}}
            >
                <ListItemButton 
                    role={undefined} 
                    dense 
                    sx={{":hover": {cursor: 'default', backgroundColor: 'white'}}}
                    onClick={handleCheckedAll}
                >
                    <ListItemIcon>
                        {
                            infoTask && infoTask.status === 1 &&
                            <Checkbox
                                style={{pointerEvents: 'none'}}
                                edge="start"
                                tabIndex={-1}
                                disableRipple
                                checked={listId.current.length === listStaff.length}
                            />
                        }
                    </ListItemIcon>
                    <ListItemText primary={`Tên NV`} />
                </ListItemButton>
            </ListItem>
            
            {staffs.map((value) => {
                const labelId = `checkbox-list-label-${value.Id}`;
                return (
                    <ListItem
                        key={value.Id}
                        secondaryAction={
                            <ListItemIcon>
                                <span>{value.Id}</span>
                            </ListItemIcon>
                        }
                        disablePadding
                    >
                        <ListItemButton 
                            role={undefined} 
                            onClick={() => handleToggle(value.Id)}
                            dense
                        >
                            <ListItemIcon>
                                <Checkbox
                                    style={{pointerEvents: 'none'}}
                                    edge="start"
                                    checked={value.checked}
                                    tabIndex={-1}
                                    disableRipple
                                    inputProps={{ 'aria-labelledby': labelId }}
                                />
                            </ListItemIcon>
                            <ListItemText id={labelId} primary={value.TenNV} />
                        </ListItemButton>
                    </ListItem>
                );
            })}
        </List>
        <Box display={'flex'} justifyContent={'flex-end'} margin={'8px 4px'}>
            {
                infoTask && infoTask.status === 1 && (<Button 
                size="small" 
                variant='contained'
                onClick={handleSubmitReady} 
                >Xác nhận</Button>)
            }

            {
                infoTask && infoTask.status === 2 && (<Button 
                size="small" 
                variant='contained'
                onClick={handleSubmitInProgress} 
                >Xác nhận</Button>)
            }

            {
                infoTask && infoTask.status === 3 && (<Button 
                size="small" 
                variant='contained'
                onClick={handleSubmitCompleted} 
                >Xác nhận</Button>)
            }
        </Box>
    </>);
}
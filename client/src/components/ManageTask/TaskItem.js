import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import TableViewIcon from '@mui/icons-material/TableView';
import { Box, Card, IconButton, Typography } from '@mui/material';
import { deleteTask, getStaffByPosition, getTasks } from '../../api';
import { useStore } from '../../hooks';
import { setTasks, setToastMesagae, showModal } from '../../reducers/action';
import ModalEmployeeTimekeeping from '../CommonModal/ModalEmployeeTimekeeping';
import ModalTask from '../CommonModal/ModalTask';

function TaskItem({task}) {
    const dispatch = useStore()[1];

    const handleUpdate = () => {
        dispatch(showModal({
            showModal: true,
            title: 'Thay đổi thông tin công việc',
            component: <ModalTask task={task} />,
        }))
    }

    const handleDelete = async () => {
        const response = await deleteTask(task);

        if(response.data.key) {
            const responseGetTasks = await getTasks();
            const { data } = responseGetTasks;
            dispatch(setTasks(data.result)); 

            dispatch(setToastMesagae({
                title: 'Thành công',
                message: 'Đã xóa đi 1 công việc',
                type: 'success',
            }));
        }else {
            dispatch(setToastMesagae({
                title: 'Thất bại',
                message: 'Xoa thất bại lỗi client or server',
                type: 'error',
            }));
        }
    }

    const handleTimekeeping = async () => {
        const { data } = await getStaffByPosition({staff: task.correspondingPosition});
        if(!data.success) {
            dispatch(setToastMesagae({
                title: 'Thất bại',
                message: 'Lỗi lấy danh sách nhân viên',
                type: 'error',
            }));
            return;
        }
        const listStaff = data.data;
        dispatch(showModal({
            showModal: true,
            title: `Chấm công - Danh sách nhân viên: ${task.correspondingPosition}`,
            component: <ModalEmployeeTimekeeping listStaff={listStaff} Id={task.Id}/>,
        }))
    }

    return (<Box mt={1}>
        <Card>
            <Box padding='8px 0 8px 12px'>
                <Typography variant="h6">{task.title}</Typography>
            </Box>

            <Box paddingLeft='8px'>
                <Typography variant="h7">{task.decription}</Typography>
            </Box>

            <Box display='flex' justifyContent='flex-end' marginRight='8px'>
                <IconButton onClick={handleTimekeeping}>
                    <TableViewIcon />
                </IconButton>

                <IconButton onClick={handleUpdate}>
                    <EditIcon />
                </IconButton>

                <IconButton onClick={handleDelete}>
                    <DeleteIcon />
                </IconButton>
            </Box>
        </Card>
    </Box>)
}

export default TaskItem;